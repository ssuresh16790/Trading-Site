const router = require('express').Router();
const authController = require('../Controllers/authController');

router.get('/', (req, res) => {
    return res.send('Node Server');
})

router.post('/adduser', authController.addUser);

router.get('/adminLogin', authController.adminLogin);

router.post('/userlogin', authController.userLogin)


module.exports = router;