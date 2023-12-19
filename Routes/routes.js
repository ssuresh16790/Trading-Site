const router = require("express").Router();
const authController = require("../Controllers/authController");
const adminController = require('../Controllers/adminController');

router.get("/", (req, res) => {
  return res.send("Node Server");
});


//Admin Dashboard
router.post("/addUser", adminController.addUser);

router.get("/viewUser", adminController.viewUser);

router.post("/updateUser", adminController.updateUser);

router.post("/deleteUser", adminController.deleteUser);

router.get('viewAllUsers', adminController.viewAllUsers );


//Add Admin
router.post("/addadmin", authController.addAdmin);


//Login

router.post("/adminLogin", authController.adminLogin);

router.post("/userlogin", authController.userLogin);

router.post("/otpForUserLogin", authController.userLoginOtpVerification);

router.post("/otpForAdminLogin", authController.adminLoginOtpVerification);

router.post("/engine", authController.engine);

router.post("/settings", authController.settings);

router.post('/fyersApi', authController.fyersApi);

router.post('/forgotPassword')

module.exports = router;
