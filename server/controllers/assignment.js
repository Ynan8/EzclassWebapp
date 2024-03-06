const  Course = require('../models/course');
const { nanoid } = require('nanoid');
const { readFileSync } = require ('fs')
const User =  require ('../models/user');
const Section =  require ('../models/section');
const CourseRoom = require ('../models/courseRoom');

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
      courseRoom:selectedCourseRooms,
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