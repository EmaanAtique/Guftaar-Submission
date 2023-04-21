const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  salt: { type: String },
  password: { type: String, required: true },
  dateOfJoining: { type: Date, default: Date.now() },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  logRecord: [
    {
      id: { type: Schema.Types.ObjectId },
      noStuttering: { type: Number, default: 0 },
      mild: { type: Number, default: 0 },
      extreme: { type: Number, default: 0 },
    },
  ],
  currentActiveCourse: {
    type: String,
    ref: "Course",
    default: "",
  },
  streakLastUpdated: { type: Date, default: Date.now() },
  streakCount: { type: Number, default: 0 },
  syllableTotal: { type: Number, default: 0 },
  syllableCorrect: { type: Number, default: 0 },
  quickPracticeRate: { type: Number, default: 0 },

  // for the streak
  lastLogin: { type: Date },
  activityStatus: {
    linkLater: { type: Boolean, default: false },
    syllableCounting: { type: Boolean, default: false },
    breathingExercise: { type: Boolean, default: false },
  },
});

const coachSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  qualification: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  password: { type: String, required: true },
  salt: { type: String }, // ? Do we need this?
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  rating: {type: Number, required: true, default:0}
});

const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  salt: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
});

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 },
});

clientSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

coachSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

adminSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

const Client = mongoose.model("Client", clientSchema);
const Coach = mongoose.model("Coach", coachSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Token = mongoose.model("Token", tokenSchema);

module.exports = { Client, Coach, Admin, Token };
