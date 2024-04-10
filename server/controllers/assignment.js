const Submission = require('../models/submission');
const Course = require('../models/course');
const { nanoid } = require('nanoid');
const { readFileSync } = require('fs')
const User = require('../models/user');
const Section = require('../models/section');
const CourseRoom = require('../models/courseRoom');

const AWS = require('aws-sdk');
const Assignment = require('../models/assignment');

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKet: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig)

exports.addAssignment = async (req, res) => {

  try {
    const { sectionId, assignments, selectedCourseRooms } = req.body;

    const newAssignment = new Assignment({
      courseRoom: selectedCourseRooms,
      ...assignments
    });

    // Save the assignment to the database
    const savedAssignment = await newAssignment.save();

    // Find the section by sectionId
    const foundSection = await Section.findById(sectionId);

    if (!foundSection) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Add the assignment ID to the assignment array of the found section
    foundSection.assignment.push(savedAssignment._id);

    // Save the updated section
    const updatedSection = await foundSection.save();

    console.log('Assignment added successfully:', savedAssignment);

    return res.status(200).json({
      message: 'Lesson added successfully',
      assignment: savedAssignment,
      section: updatedSection,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error add assignment." });
  }
};

exports.uploadAssignmentFile = async (req, res) => {
  try {
    const { assignmentFile } = req.files;
    // console.log(assignmentFile);
    // return;
    if (!assignmentFile) return res.status(400).send('No Assignment File ')

    const params = {
      Bucket: "ezclass-lms",
      Key: `${nanoid()}.${assignmentFile.type.split('/')[1]}`, //
      Body: readFileSync(assignmentFile.path),
      ACL: "public-read",
      ContentType: assignmentFile.type,
    }

    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        res.sendStatus(400);
      }
      console.log(data)
      res.send(data)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error uploading Assignment File." });
  }
};


exports.getAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: 'assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.completeSubmission = async (req, res) => {
  const { courseId } = req.params;
  try {
    const assignmentCompleted = await Submission.find({})
      .populate('roomId')
    // Filter submissions based on the courseId
   
    const submissionsForCourse = assignmentCompleted.filter(submission => {
      return submission.roomId.courseId.toString() === courseId;
    });

    res.json(assignmentCompleted);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.removeAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    // Find the lesson to be deleted
    const removeAssign = await Lesson.findByIdAndDelete(assignmentId).exec();


    // Update the corresponding sections to remove the lesson ID
    const updatedSections = await Section.updateMany(
      { assignment: assignmentId },
      { $pull: { assignment: assignmentId } }
    ).exec();
    res.json({ ok: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error: Failed to remove assignment.' });
  }
};

exports.readAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findOne({ _id: assignmentId })
      .exec();
    res.json(assignment);
    console.log(assignment)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { assignmentName, assignmentDetail, assignmentDue, weight, scoreLimit, assignmentFile } = req.body;

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        assignmentName,
        assignmentDetail,
        assignmentDue,
        weight,
        scoreLimit,
        assignmentFile,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Assignment updated successfully",
      updatedAssignment,
    });
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ error: "Failed to update assignment" });
  }
};


exports.submitAssignment = async (req, res) => {
  try {
    const { id, courseRoomId } = req.params;
    const studentId = req.user._id;

    const submission = new Submission({
      studentId,
      assignmentId: id,
      roomId: courseRoomId,
      ...req.body
    });
    await submission.save();

    res.status(200).json({ message: 'Assignment submitted successfully!' });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.cancelSubmission = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.body;

    // Find and remove the submission
    await Submission.findOneAndDelete({
      assignmentId,
      studentId: req.user._id,
    });

    res.status(200).json({ message: 'Submission canceled successfully' });
  } catch (error) {
    console.error('Error canceling submission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getAssignmentSubmit = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').exec();
    // Find the assignment by its _id using findById
    const submit = await Submission.findOne({ studentId: user._id }); // Use id directly

    if (!submit) {
      return res.status(404).json({ error: 'Assignment submit not found' });
    }

    res.json(submit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching assignment submit.' });
  }
};

exports.removeSubmit = async (req, res) => {
  try {
    const { assignmentSubmit } = req.body;

    const params = {
      Bucket: assignmentSubmit.bucket,
      Key: assignmentSubmit.key,
    };

    await S3.deleteObject(params).promise();
    res.send({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to remove the submitted assignment." });
  }
};


exports.CheckSubmit = async (req, res) => {
  const { id } = req.params;
  const studentId = req.user._id;

  try {
    // Find the assignment by its _id using findById
    const stdSubmits = await Submission.findOne({ studentId: studentId, assignmentId: id });

    console.log(stdSubmits);

    // Check if any submissions were found
    if (!stdSubmits || !stdSubmits.fileSubmit) {
      // If no submission or no fileSubmit, student hasn't submitted
      return res.status(404).json({ error: 'Assignment submit not found' });
    }

    res.json(stdSubmits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching assignment submit.' });
  }
};



exports.getStdSubmit = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the assignment by its _id using findById
    const stdSubmits = await Submission.find({ assignmentId: id });

    // Check if any submissions were found
    if (!stdSubmits || stdSubmits.length === 0) {
      return res.status(404).json({ error: 'Assignment submit not found' });
    }

    // Use Promise.all to perform parallel queries to fetch student details
    const studentDetailsPromises = stdSubmits.map(async (submission) => {
      const student = await User.findById(submission.studentId);
      return {
        ...submission.toObject(), // Convert Mongoose document to plain JavaScript object
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
        image: student ? `${student.image}` : 'Unknown',
      };
    });

    // Wait for all promises to resolve
    const stdSubmitsWithStudentDetails = await Promise.all(studentDetailsPromises);

    res.json(stdSubmitsWithStudentDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching assignment submit.' });
  }

}

exports.updateScore = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;
    const { newScore, status } = req.body;

    // Find the submission based on assignmentId and studentId
    const submission = await Submission.findOne({ assignmentId, studentId });

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Update the score
    submission.score = newScore;
    submission.status = status;

    // Save the updated submission
    await submission.save();

    res.status(200).json({ message: 'Score updated successfully', submission });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getStdSubmitAll = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the assignment by its _id using findById
    const stdSubmits = await Submission.find({});

    // Check if any submissions were found
    if (!stdSubmits || stdSubmits.length === 0) {
      return res.status(404).json({ error: 'Assignment submit not found' });
    }


    res.json(stdSubmits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching assignment submit.' });
  }
};
