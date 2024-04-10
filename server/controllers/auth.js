const User = require("../models/user");
const Admin = require("../models/admin");
const { hashPassword, comparePassword } = require('../utils/auth')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid');
const slugify = require('slugify');
const CourseLogs = require("../models/courseLogs");
const useragent = require('useragent');

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKet: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig)

const SES = new AWS.SES(awsConfig)

exports.register = async (req, res) => {
  try {
    //Check teacher
    const { firstName, lastName, email, password } = req.body

    var user

    // hash password

    const hashedPassword = await hashPassword(password);

    user = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })
    await user.save();
    console.log("save admin", user)
    return res.json({ ok: true });
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!')
  }
}


exports.courseLogs = async (req, res) => {
  try {
    const { courseId, username, firstName, lastName, userType, format } = req.body;

    // Get the user agent string from the request headers
    const userAgentString = req.headers['user-agent'];
    const agent = useragent.parse(userAgentString);

    // Get the client's IP address
    let ipAddress = req.ip;
    if (req.headers['x-forwarded-for']) {
      ipAddress = req.headers['x-forwarded-for'].split(',')[0];
    }

    // Create a new CourseLogs instance
    const newCourseLog = new CourseLogs({
      courseId,
      username,
      firstName,
      lastName,
      userType,
      format,
      ipAddress,
      note: `OS: ${agent.os.toString()}  Browser: ${agent.toAgent()}`,
    });

    // Save the new course log
    await newCourseLog.save();

    console.log("Course log saved successfully");

    // Send a success response
    res.status(200).json({ message: "Course log saved successfully" });
  } catch (err) {
    console.log(err);
    // Send an error response
    res.status(500).json({ message: "Failed to save course log" });
  }
};

exports.getCourseLogs = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseLogs = await CourseLogs.find({ courseId: courseId })
      .exec();
    res.json(courseLogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




exports.login = async (req, res) => {
  try {
    //code
    // 1. Check User
    const { username, password } = req.body
    var user = await User.findOneAndUpdate({ username }, { new: true })
    console.log(user)

    if (user) {
      const isMatch = await comparePassword(password, user.password)

      if (!isMatch) {
        return res.status(400).send('รหัสผ่านไม่ถูกต้อง')
      }
      // 2. Payload
      var payload = {
        user: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image?.Location || "",
          role: user.role,
        }
      }
      // 3. Generate
      jwt.sign(payload, 'jwtsecret',
        {
          expiresIn: "1d",
        }, (err, token) => {
          if (err) throw err;
          res.json({ token, payload })
        })
    } else {
      return res.status(400).send('ไม่พบข้อมูลผู้ใช้!!!')
    }

  } catch (err) {
    //code
    console.log(err)
    res.status(500).send('Server Error')
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.json({ message: "ออกจากระบบสำเร็จ" });
  } catch (err) {
    console.log(err)
  }
}




exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
      .select('-password')
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err)
  }
}

exports.profileImage = async (req, res) => {

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
      Bucket: "ezclass-lms",
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

exports.UpdateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body; // Assuming the request body contains the updated user data

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ ok: false, message: 'User not found' });
    }

    // Return the updated user data
    res.status(200).json({ ok: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};
exports.UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // Check if the old password is correct
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid old password' });
    }

    // Hash and update the new password using the hashPassword function
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.currentTeacher = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    if (!user.role.includes('teacher')) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err)
  }
}

exports.currentStudent = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    if (!user.role.includes('student')) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err)
  }
}

exports.currentAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    if (!user.role.includes('admin')) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err)
  }
}
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const hashedPassword = await hashPassword(newPassword);

    const admin = Admin.findOneAndUpdate({
      
      email,
      passwordResetCode: code,

    },{
      password:hashedPassword,
      passwordResetCode:"",
    }
    ).exec();
    res.json({ok:true})
    
  } catch (err) {
    console.log(err)
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const shortCode = nanoid(6).toUpperCase();
    const admin = await Admin.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode }
    );
    if (!admin) return res.status(400).send("User not found");

    // prepare for email
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data:
              `<html>
                <h1>Reset Password link</h1>
                <p>User is code to reset your password</p>
                <h2 style="color:red">${shortCode}</h2>
                <i>EZCLASS.com</>
               </html>
              `
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Password reset link",
        }
      }
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        console.log(data);
        res.json({ ok: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });

  } catch (err) {
    console.log(err)
  }
}


exports.sendTestEmail = async (req, res) => {
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: ['yeennanthawut55@gmail.com'],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data:
            `<html>
                          <h1>Reset Password link</h1>
                          <p>Please use the following link to reset your password</p>
                      </html>`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Password reset link",
      }
    }
  };

  const emailSent = SES.sendEmail(params).promise();
  emailSent
    .then((data) => {
      console.log(data);
      res.json({ ok: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
}

