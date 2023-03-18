// const express=require('express');
// const {registerUser,authUser,allUsers}=require("../controllers/userController")
// const {protect}=require('../middleware/authMiddleware');
// const router=express.Router();

// router.route('/').post(registerUser).get(protect,allUsers);
// router.post('/login',authUser);

// module.exports=router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
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
} = require("../Controllers/UserController");
// const pdf = require("./pdfModel");
const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/files/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.route("/").post(registerUser);
router.post("/login", authUser);

router.post(
  "/listener",
  upload.fields([{ name: "file" }, { name: "resume" }]),

  registerListener
);
router.get("/download/resume/:email", downloadResume);
router.get("/download/file/:email", downloadFile);
router.post("/listener/login", authListener);
router.route("/").get(protect, allUsers);
router.route("/onlyuser").get(OnlyClients);
router.route("/allclient/:email").get(AllClients);
router.route("/singleIntern/:email").get(particularIntern);
router.put("/status/update/:email", UpdateStatus);
router.get("/totalintern", TotalIntern);
router.get("/totalClientsnumber", TotalClient);
router.put("/updateAmountPaid/:email", updateAmountPaid);
router.put("/price/:email", price);
router.put("/myClientList/:email", updateInternClientList);
router.get("/totalrevenue", revenue);
router.route("/:monthRevenue").get(MonthBasedRevenue);
router.route("/amount/totalamountpaidclients").get(totalamountPaidClients);
router.delete(
  "/DeleteClientarraySingleEmail/:email",
  DeleteClientArrayinIntern
);

module.exports = router;
