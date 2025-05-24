const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Controller = require("./controller");

class AuthController extends Controller {

  generateToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }

  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "کاربری با این ایمیل وجود دارد" });
      }

      const user = await User.create({ name, email, password });

      res.status(201).json({
        message: "ثبت‌نام با موفقیت انجام شد",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: this.generateToken(user), 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "خطا در ثبت‌نام" });
    }
  }

  
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "کاربری با این ایمیل یافت نشد" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "رمز عبور اشتباه است" });
      }

      res.status(200).json({
        message: "ورود با موفقیت انجام شد",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: this.generateToken(user),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "خطا در ورود" });
    }
  }
}

module.exports = new AuthController();
