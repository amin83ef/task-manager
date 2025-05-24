const mongoose = require("mongoose"); // برای اتصال به MongoDB
const bcrypt = require("bcryptjs");   // برای رمزنگاری رمز عبور

// تعریف ساختار مدل کاربر (User)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // باید مقدار داشته باشه
  },
  email: {
    type: String,
    required: true, // باید مقدار داشته باشه
    unique: true,   // نباید تکراری باشه
  },
  password: {
    type: String,
    required: true, // باید مقدار داشته باشه
  },
}, { timestamps: true }); // تاریخ ایجاد و آخرین تغییر را هم ذخیره کن

// قبل از ذخیره کاربر، رمز را هش (رمزنگاری) کن
userSchema.pre("save", async function (next) {
  // اگه رمز تغییر نکرده بود، چیزی نکن
  if (!this.isModified("password")) {
    return next();
  }

  // رمز را هش کن
  const salt = await bcrypt.genSalt(10); // ساخت کد نمک
  this.password = await bcrypt.hash(this.password, salt); // هش کردن رمز با نمک
  next(); // برو مرحله بعد
});

// متد برای مقایسه رمز وارد شده با رمز هش‌شده در دیتابیس
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ساخت مدل با نام "User" براساس userSchema
const User = mongoose.model("User", userSchema);

// خروجی گرفتن تا در فایل‌های دیگه استفاده بشه
module.exports = User;
