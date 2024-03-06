const User = require("../models/user");
const { hashPassword } = require("../utils/auth");

exports.addTeacher = async (req, res) => {
    try {
      //Check teacher
      const {firstName, lastName, username, password } = req.body
  
      var teacher = await User.findOne({ username }).exec();
      if (teacher) {
        return res.status(400).send('มีบัญชีผู้ใช้แล้ว');
      }
 
      // hash password

      const hashedPassword = await hashPassword(password);
  
      teacher = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        role:"teacher"
      })
      await teacher.save();
      console.log("save teacher", teacher)
      return res.json({ ok: true });
    } catch (err) {
      console.log(err)
      res.status(500).send('Server Error!')
    }
  }
  