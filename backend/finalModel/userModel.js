const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      default: "*******",
    },

    city: {
      type: String,
      default: "*******",
    },
    tenth: {
      type: String,
      default: "*******",
    },
    twelth: {
      type: String,
      default: "*******",
    },
    bachelor: {
      type: String,
      default: "*******",
    },
    specialization: {
      type: String,
      default: "*******",
    },
    internship: {
      type: String,
      default: "*******",
    },
    social: {
      type: String,
    },
    extra: {
      type: String,
      default: "*******",
    },
    other: {
      type: String,
      default: "*******",
    },
    fund: {
      type: String,
      default: "*******",
    },
    careergoal: {
      type: String,
      default: "*******",
    },
    familybg: {
      type: String,
      default: "*******",
    },
    anythingelse: {
      type: String,
      default: "*******",
    },
    consultancy: {
      type: String,
    },
    coupon: {
      type: String,
      default: "*******",
    },
    hear: {
      type: String,
      default: "*******",
    },
    course: {
      type: String,
    },
    selectedValues: {
      type: String,
      default: "53548",
    },
    college: {
      type: String,
      default: "*******",
    },
    country: {
      type: String,
      default: "*******",
    },
    isIntern: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    file: {
      type: String,
    },
    resume: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    IsAmountpaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    price: {
      type: String,
      default: "0",
    },
    count: {
      type: String,
      default: "0",
    },
    internName: {
      type: String,
      default: "***",
    },
    internEmail: {
      type: String,
      default: "***",
    },
    taskMonth: {
      type: String,
      default: "***",
    },
    monthRevenue: {
      type: String,
      default: "0",
    },
    resumePath: {
      type: String,
      default: "",
    },
    filePath: {
      type: String,
      default: "",
    },
    myClientsArray: [
      {
        email: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
