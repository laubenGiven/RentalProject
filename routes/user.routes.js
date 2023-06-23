const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const UserController = require('../controllers/user.controller');
const app = express();
const bodyParser = require('body-parser');
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

// Import the controllers for lease requests and comments
const LeaseRequestController = require('../controllers/leaserequest.controller');
const CommentController = require('../controllers/comment.controller');

// Create instances of the controllers
const leaseRequestController = new LeaseRequestController();
const commentController = new CommentController();



// Lease Requests Routes
router.get('/leaserequests', leaseRequestController.getAll);
router.get('/leaserequests/:id', leaseRequestController.getById);
router.post('/leaserequests', leaseRequestController.add);
router.put('/leaserequests/:id', leaseRequestController.update);
router.delete('/leaserequests/:id', leaseRequestController.deleteById);

// Comments Routes
router.get('/comments', commentController.getAll);
router.get('/comments/:id', commentController.getById);
router.post('/comments', commentController.add);
router.put('/comments/:id', commentController.update);
router.delete('/comments/:id', commentController.deleteById);



const userController = new UserController();

// GET route for login page
router.get('/login', (req, res) => {
  res.render('login');
});

// GET route for user registration page
router.get('/register', (req, res, next) => {
  res.render('userRegister');
});
router.get('/logout',(req,res,next)=>{
  res.render('login');
});

router.get('/Resetpassword',(req,res,next)=>{
  res.render('Resetpassword');
});

router.get('/tenant',(req,res,next)=>{
  res.render('tenant');
});

router.get('/ladlord',(req,res,next)=>{
  res.render('landlord');
});

router.get('/admin',(req,res,next)=>{
  res.render('index');
});
router.get('/user',(req,res,next)=>{
  res.render('tenant');
});

router.get('/getAll', userController.getAll);
router.get('/:id', userController.getById);
router.post('/register', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteById);
router.get('/:id', userController.getUserById);
router.post('/resetpassword', userController.resetPassword);


// Login route
router.post('/auth', async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.send('Please enter Username and Password!');
    }

    const user = await User.findOne({ username });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        request.session.loggedin = true;
        request.session.username = username;
        
        // Render different views based on the user's role
        if (user.role === 'tenant') {
          response.render('tenant', { username, message: 'Welcome to the Tenant Dashboard.' });
        } else if (user.role === 'landlord') {
          response.render('landlord', { username, message: 'Welcome to the Landlord Dashboard.' });
        } else if (user.role === 'user') {
          response.render('tenant', { username, message: 'Welcome to the User Dashboard.' });
        } else if (user.role === 'admin') {
          response.render('index', { username, message: 'Welcome to the Admin Dashboard.' });
        } else {
          response.send('Invalid role!');
        }
      } else {
        response.send('Incorrect Username and/or Password!');
      }
    } else {
      response.send('Incorrect Username and/or Password!');
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Server Error');
  }
});


module.exports = router;
