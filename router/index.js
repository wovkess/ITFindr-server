const Router = require("express").Router;
const userController = require('../controllers/user-controller');
const profileController = require('../controllers/profile-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const upload = require('../middlewares/upload-multer.middleware');
const uploadFileToFirebaseStorage = require('../middlewares/upload-firebase-middleware');


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout',  userController.logout);
router.get('/activate/:link',  userController.activate);
router.get('/refresh', userController.refresh);
router.get('/getAllUsers', userController.getAllUsers);
router.post('/updateProfile',upload.single('photo'),uploadFileToFirebaseStorage,[
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('username').notEmpty(),
    body('about').notEmpty(),
    body('experience').notEmpty(),
    body('country').notEmpty(),
    body('salary').notEmpty(),
    body('phoneNumber').notEmpty(),
    body('specialization').notEmpty(),
    body('technologies').isArray()
], profileController.updateProfile);
router.post('/getProfile', profileController.getProfile);
router.get('/getAllProfiles', profileController.getAllProfiles);
router.get('/getTechnologiesList', profileController.getTechnologiesList)
router.post('/send-mail', profileController.sendMail)

module.exports = router;