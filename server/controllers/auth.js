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
                username: user.username,
                firstName: user.firstName,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image.Location,
                role: user.role,
            }
        }
        // 3. Generate
        jwt.sign(payload, 'jwtsecret', { expiresIn: "1d" }, (err, token) => {
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
    const user = await User.findOne({username:req.user.username})
    .select('-password')
    .exec();
     res.send(user);
  } catch (err) {
    console.log(err)
  }
}


// exports.currentTeacher = async (req, res) => {
//   try {
//     let user = await User.findById(req.user._id).select("-password").exec();
//     if (!user.role.includes('teacher')) {
//       return res.sendStatus(403);
//     } else {
//       res.json({ ok: true });
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }