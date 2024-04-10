const Course = require('../models/course');
const AWS = require('aws-sdk');
const { nanoid } = require('nanoid');
const slugify = require('slugify');


const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKet: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig)

exports.uploadImage = async (req, res) => {
    //console.log(req.body);
    try {
        const { image } = req.body
        if (!image) return res.status(400).send('No image');

        // prepare the image
        const base64Data = new Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );
        const type = image.split(';')[0].split('/')[1];
        // image params
        const params = {
            Bucket: "ezclass-bucket",
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${type}`,
        }
        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400);
            }
            console.log(data);
            res.send(data);
        })
    } catch (err) {
        console.log(err)
    }
};

exports.removeImage = async (req, res) => {
    try {
        const { image } = req.body;

        // image params
        const params = {
            Bucket: image.Bucket,
            Key: image.Key,
        };



        // send remove request to s3
        S3.deleteObject(params, (err, data) => {
            if (err) {
                console.error("Error in deleting object:", err);
                return res.status(400).send({ error: err.message });
            }
            res.send({ ok: true });
        });

    } catch (err) {
        console.log(err);
    }
};

exports.courseList = async (req, res) => {
    try {
        const courses = await Course.find({})
            .populate('teacher') // Populate the 'teacher' field with the corresponding teacher data
            .exec();
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.create = async (req, res) => {
    try {
        const alreadyExist = await Course.findOne({
            courseName: slugify(req.body.courseName.toLowerCase()),
        });

        if (alreadyExist) return res.status(400).send("ชื่อรายวิชานี้ถูกใช้แล้ว");
        const course = await new Course({
            teacher: req.user._id,
            ...req.body,
        }).save();
        res.json(course);
    } catch (err) {
        console.log(err)
        return res.status(400).send('ไม่สามารถสร้างรายวิชาได้ ลองอีกครั้ง!');
    }
}

exports.update = async (req, res) => {
    try {
            const { id } = req.params;

            const updated = await Course.findOneAndUpdate(
                    { _id: id }, 
                    req.body,
                    { new: true }
            ).exec();

            if (!updated) {
                    return res.status(404).json({ error: 'Course not found' });
            }
            res.json(updated);
           console.log("Update Course",updated);

    } catch (err) {
            console.log(err)
            return res.status(400).send(err.message)
    }
}

exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        // Delete the course by ID
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        // Check if the course exists
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found.' });
        }

        // Return success response
        res.status(200).json({ message: 'Course deleted successfully.' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Failed to delete course.' });
    }
};


exports.read = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findOne({ _id: courseId })
            .populate("teacher", "_id email")
            .exec();
        res.json(course);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.archivedCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        // Update the course status to false by ID
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { status: false }, { new: true });

        // Check if the course exists
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found.' });
        }

        // Return the updated course data
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Error marking course as completed:', error);
        res.status(500).json({ error: 'Failed to mark course as completed.' });
    }
};

exports.cancelArchivedCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        // Update the course status to true by ID
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { status: true }, { new: true });

        // Check if the course exists
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found.' });
        }

        // Return the updated course data
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Error canceling course completion:', error);
        res.status(500).json({ error: 'Failed to cancel course completion.' });
    }
};