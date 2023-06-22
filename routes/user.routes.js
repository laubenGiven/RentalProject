const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const UserController = require('../controllers/user.controller');
const app = express();
const bodyParser = require('body-parser');
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
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

router.get('/getAll', userController.getAll);
router.get('/:id', userController.getById);
router.post('/register', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteById);
router.get('/:id', userController.getUserById);
router.post('/resetpassword', userController.resetPassword);



//Login route
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
        response.render('index', { username, message: ' Welcome to the DashBoard.' });
      } else {
        response.send('Incorrect Username and / or Password!');
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
