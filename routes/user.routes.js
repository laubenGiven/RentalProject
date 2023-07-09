const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const UserController = require('../controllers/user.controller');
const PropertyController = require('../controllers/property.controller');
const session = require('express-session');
const flash = require('express-flash');

const router = express.Router();
const bodyParser = require('body-parser');

const propertyController = new PropertyController();

const userController = new UserController();

router.use(bodyParser.urlencoded({ extended: false }));


// Add express-flash middleware to handle flash messages
router.use(session({
  secret: 'lee123.com',
  resave: false,
  saveUninitialized: true
}));



router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/register', (req, res, next) => {
  res.render('userRegister');
});

router.get('/logout', (req, res, next) => {
  res.render('login');
});

router.get('/Resetpassword', (req, res, next) => {
  res.render('Resetpassword');
});

router.get('/tenant', (req, res, next) => {
  res.render('tenant');
});

router.get('/landlord', async (req, res) => {
  try {
    const { username } = req.session;
    const users = await User.findOne({ username });    
    const successMessage = 'Property saved successfully!';

    req.session.loggedin = true;
    req.session.username = username;
    
    // Retrieve approved properties using the propertyController
    const properties = await propertyController.getapprovedProperties();  
    res.render('landlord', {      
      username,
      Property: properties,          
      message: 'Welcome to the landlord Dashboard.',
      successMessage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false,message: 'Failed to display land lords page data' });
  }
});



router.get('/user', (req, res, next) => {
  res.render('tenant');
});

router.get('/getAll', userController.getAll);
router.get('/:id', userController.getById);
router.post('/register', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteById);
router.get('/:id', userController.getUserById);
router.post('/resetpassword', userController.resetPassword);

router.post('/auth', async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.send('Please enter Username and Password!');
    }

    const user = await User.findOne({ username });

    if (!user) {
      return response.send('Incorrect Username and/or Password!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.send('Incorrect Username and/or Password!');
    }

    request.session.loggedin = true;
    request.session.username = username;

    if (user.role === 'tenant') {
      const Properties = await propertyController.getAllProperties();
     
      response.render('tenant', { username,Properties,message: 'Welcome to the Tenant Dashboard.' });
    } else if (user.role === 'landlord') {
      const successMessage = "  Login Successful!";
      response.render('landlord', { username,successMessage, message: 'Welcome to the Landlord Dashboard.' });
    } else if (user.role === 'user') {
      const properties = await propertyController.getAllProperties();
      response.render('tenant', { username, property_id:properties._id, image: user.photo, message: 'Welcome to the User Dashboard.' });
    } else if (user.role === 'admin') {
      // Define the successMessage variable
const successMessage = "  Login Successful!";

      const properties = await propertyController.getUnapprovedProperties();
      const Userlist = await userController.getAllUsers();
      response.render('index', {
        Property: properties,
        Userlist: Userlist,
        username,       
        successMessage,
        image: user.photo,
        message: 'Welcome to the Admin Dashboard.',
      });
    } else {
      response.send('Invalid role!');
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Server Error');
  }
});

module.exports = router;
