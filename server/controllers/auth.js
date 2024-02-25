const User = require("../models/user");
const { hashPassword, comparePassword } =  require('../utils/auth')
const jwt =  require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        //Check teacher
        const { firstName, lastName, username, password } = req.body
    
        var user 
      
        // hash password
    
        const hashedPassword = await hashPassword(password);
    
        user = new User({
          firstName,
          lastName,
          username,
          password: hashedPassword,
          role: "teacher",
          status: "false"
        })
        await user.save();
        console.log("save teacher", user)
        return res.json({ ok: true });
      } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
      }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

    
        // check if our db has user with that email
        const user = await User.findOne({ username }).exec();
        if (!user) return res.status(400).send("ไม่พบบัญชีผู้ใช้");
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).send('รหัสผ่านไม่ถูกต้อง');
    
        // const status = await User.findOne({ status:"false" }).exec();
        // if (!status) return res.status(400).send('อีเมลล์ยังไม่ได้รับการอนุมัติ');
        // create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          })
        // return user and token to client, exclude hashed password
        user.password = undefined;
        // send token in cookie
        res.cookie('token', token, {
          httpOnly: true,
          // secure: true, //only works on https
        });
        // send user as json response 
        res.json(user);
      } catch (err) {
        console.log(err)
        return res.status(400).send('Error. Try again.')
      }
}