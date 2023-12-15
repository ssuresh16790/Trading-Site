const router = require('express').Router();
const authController = require('../Controllers/authController');

router.get('/', (req, res) => {
    return res.send('Node Server');
})

router.post('/adduser', authController.addUser);

router.post('/adminLogin', authController.adminLogin);

router.post('/userlogin', authController.userLogin)

router.post('/otpUserLogin', authController.otpUserlogin)

router.post('/addadmin', authController.addAdmin);

router.post('/otpAdminLogin', authController.otpAdminlogin)




module.exports = router;