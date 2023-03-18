const User = require("../finalModel/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword);
  // .find({ _id:{$ne:req.user._id} });

  res.send(users);
  // {console.log("blah"+req.user._id)}
});

const OnlyClients = asyncHandler(async (req, res) => {
  const MyData = await User.find({ status: "false" });
  // const users = await User.find({ status: "false" });

  res.status(200).json(MyData);
});

const AllClients = asyncHandler(async (req, res) => {
  const email = req.params.email;
  console.log(req.params.email);
  User.findOne({ email }, (error, item) => {
    if (error) {
      res.status(500).send(error);
    } else if (!item) {
      res
        .status(404)
        .send({ message: "Email does not exist or write the email properly" });
    } else {
      res.status(200).send(item);
    }
  });
});

const particularIntern = asyncHandler(async (req, res) => {
  const email = req.params.email;
  console.log(req.params.email);
  User.findOne({ email }, (error, item) => {
    if (error) {
      res.status(500).send(error);
    } else if (!item) {
      res
        .status(404)
        .send({ message: "Email does not exist or write the email properly" });
    } else {
      res.status(200).send(item);
    }
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, isIntern, status } = req.body;

  // if(!name||!email||!password||!phone)
  if (!name || !email || !password || !isIntern) {
    res.status(400);
    // throw new Error("Please enter all the fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    isIntern,
    status,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      isIntern: user.isIntern,
      status: user.status,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Fail to create new user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      isIntern: user.isIntern,
      status: user.status,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerListener = asyncHandler(async (req, res) => {
  console.log("checking files");
  console.log(req.files);
  const resume =
    req.files && req.files.resume.length > 0
      ? req.files.resume[0].originalname
      : null;
  const file =
    req.files && req.files.file.length > 0
      ? req.files.file[0].originalname
      : null;

  const resumePath = req.files.resume[0].path;
  const filePath = req.files.file[0].path;
  console.log({ resume, file, files: req.files });

  const {
    name,
    email,
    password,
    college,
    course,
    age,
    work,
    city,
    tenth,
    twelth,
    bachelor,
    specialization,
    internship,
    social,
    extra,
    other,
    fund,
    careergoal,
    familybg,
    anythingelse,
    consultancy,
    coupon,
    country,
    phone,
    hear,
    selectedValues,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !course ||
    !college ||
    !age ||
    !tenth ||
    !city ||
    !twelth ||
    !bachelor ||
    !specialization ||
    !college ||
    !course ||
    !country ||
    !work ||
    !internship ||
    !social ||
    !extra ||
    !fund ||
    !careergoal ||
    !familybg ||
    !other ||
    !anythingelse ||
    !consultancy ||
    !coupon ||
    !hear ||
    !resume ||
    !file ||
    !selectedValues
  ) {
    res.status(400);
    // .json({
    //   name: !name,
    //   email: !email,
    //   password: !password,
    //   phone: !phone,
    //   course: !course,
    //   college: !college,
    //   age: !age,
    //   tenth: !tenth,
    //   city: !city,
    //   twelth: !twelth,
    //   bachelor: !bachelor,
    //   specialization: !specialization,
    //   college: !college,
    //   course: !course,
    //   country: !country,
    //   work: !work,
    //   internship: !internship,
    //   social: !social,
    //   extra: !extra,
    //   fund: !fund,
    //   careergoal: !careergoal,
    //   familybg: !familybg,
    //   other: !other,
    //   anythingelse: !anythingelse,
    //   consultancy: !consultancy,
    //   coupon: !coupon,
    //   hear: !hear,
    //   resume: !resume,
    //   file: !file,
    //   selectedValues: !selectedValues,
    // });
    // throw new Error("Please enter all the fields");
  }

  const listenerExist = await User.findOne({ email });
  if (listenerExist) {
    if (listenerExist) {
      res.status(400);
      throw new Error("User already exists");
    }
  }
  console.log({
    resume1:
      req.files && req.files.length > 0 ? req.files[1].originalname : null,
    file1: req.files && req.files.length > 0 ? req.files[0].originalname : null,

    resume,
    file,
  });
  const listener = await User.create({
    resume,
    resumePath,
    filePath,
    file,
    name,
    email,
    password,
    phone,
    course,
    college,
    age,
    tenth,
    city,
    twelth,
    bachelor,
    specialization,
    country,
    work,
    internship,
    social,
    extra,
    fund,
    careergoal,
    familybg,
    other,
    anythingelse,
    consultancy,
    coupon,
    hear,
    // resume,
    // file,
    selectedValues,
  });
  if (listener) {
    res.status(201).json({
      _id: listener._id,
      email: listener.email,
      password: listener.password,
      phone: listener.phone,
      course: listener.course,
      college: listener.college,
      age: listener.age,
      tenth: listener.tenth,
      city: listener.city,
      twelth: listener.twelth,
      bachelor: listener.bachelor,
      specialization: listener.specialization,
      college: listener.college,
      course: listener.course,
      country: listener.country,
      work: listener.work,
      internship: listener.internship,
      social: listener.social,
      extra: listener.extra,
      fund: listener.fund,
      careergoal: listener.careergoal,
      familybg: listener.familybg,
      other: listener.other,
      anythingelse: listener.anythingelse,
      consultancy: listener.consultancy,
      coupon: listener.coupon,
      hear: listener.hear,
      resume: listener.resume,
      file: listener.file,
      selectedValues: listener.selectedValues,
      token: generateToken(listener._id),
    });
  } else {
    res.status(400);
    throw new Error("Fail to create new user");
  }
});

const authListener = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const listener = await User.findOne({ email });
  if (listener && (await listener.matchPassword(password))) {
    res.json({
      _id: listener._id,
      name: listener.name,
      email: listener.email,
      password: listener.password,
      phone: listener.phone,
      course: listener.course,
      college: listener.college,

      token: generateToken(listener._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const UpdateStatus = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const status = req.body.status;
    const internName = req.body.internName;
    const internEmail = req.body.internEmail;

    var date = new Date();

    const result = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          status: status,
          internName: internName,
          internEmail: internEmail,
          taskMonth: monthNames[date.getMonth()],
        },
      },

      { new: true }
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const downloadResume = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const listener = await User.findOne({ email });
    res.download(listener.resumePath);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const downloadFile = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const listener = await User.findOne({ email });
    res.download(listener.filePath);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const updateAmountPaid = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const IsAmountpaid = req.body.IsAmountpaid;
    var date = new Date();
    const result = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          IsAmountpaid: IsAmountpaid,
          monthRevenue: monthNames[date.getMonth()],
        },
      },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const DeleteClientArrayinIntern = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const Clientemail = req.body.email;
    // const myClientsArray = req.body.myClientsArray;
    console.log("cleit", Clientemail);
    const result = await User.findOneAndUpdate(
      { email },

      { $pull: { myClientsArray: { email: Clientemail } } },

      { new: true }
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const updateInternClientList = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const newEmail = req.body.myClientsArray;
    const result = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          myClientsArray: newEmail,
        },
      },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const price = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const price = req.body.price;
    const result = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          price: price,
        },
      },
      { new: false }
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const TotalIntern = asyncHandler(async (req, res) => {
  const count = await User.countDocuments({ isIntern: true });
  // res.send(`The number of interns  is: ${count}`);
  res.json(count).status(200);
});
const TotalClient = asyncHandler(async (req, res) => {
  const count = await User.countDocuments({ isIntern: false, isAdmin: false });
  // res.send(`The number of Clients  is: ${count}`);
  res.json(count).status(200);
});

function convertToNumber(price) {
  return Number(price.replace(/[^0-9.-]+/g, ""));
}
const revenue = asyncHandler(async (req, res) => {
  const money = await User.find({ isIntern: false });
  let total = 0;
  money.forEach((product) => {
    total += convertToNumber(product.price);
  });
  // res.send(`The total price is: ${total}`);
  res.json(total);
});

const MonthBasedRevenue = asyncHandler(async (req, res) => {
  const month = req.params.monthRevenue;
  console.log(month);

  const money = await User.find({ monthRevenue: month });
  let total = 0;
  money.forEach((product) => {
    total += convertToNumber(product.price);
  });
  res.json(total);
});

const totalamountPaidClients = asyncHandler(async (req, res) => {
  const ispaid = await User.countDocuments({ IsAmountpaid: true });
  res.json(ispaid);
});

module.exports = {
  registerUser,
  authUser,
  registerListener,
  authListener,
  allUsers,
  UpdateStatus,
  OnlyClients,
  AllClients,
  TotalIntern,
  TotalClient,
  updateAmountPaid,
  price,
  revenue,
  MonthBasedRevenue,
  totalamountPaidClients,
  updateInternClientList,
  particularIntern,
  DeleteClientArrayinIntern,
  downloadResume,
  downloadFile,
};
