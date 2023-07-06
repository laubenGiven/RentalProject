const express = require('express');
const PropertyController = require('../controllers/property.controller');
const router = express.Router();
const propertyController = new PropertyController();
const session = require('express-session');
const flash = require('express-flash');

const User = require('../models/user.models');
const UserController = require('../controllers/user.controller');

const userController = new UserController();

// Add express-flash middleware to handle flash messages
router.use(session({
  secret: 'lee123.com',
  resave: false,
  saveUninitialized: true
}));
router.use(flash());

// GET route for property registration page
router.get('/register', (req, res) => {
  res.render('newproperty');
});

router.get('/admin', async (req, res) => {
  try {
    const { username } = req.session;
    const users = await User.findOne({ username });
    const Userlist = await userController.getAllUsers();
    const successMessage = req.flash('successMessage')[0]; // Get the success message from the flash messages

    req.session.loggedin = true;
    req.session.username = username;
    const properties = await propertyController.getAllProperties();
    res.render('index', {
      Userlist,
      username,
      Property: properties,
      username,     
      message: 'Welcome to the Admin Dashboard.',
      successMessage, // Pass the success message to the template;
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to display admin page data' });
  }
});

router.get('/propertylist', propertyController.getAllProperty.bind(propertyController));

// Define property routes
router.get('/getAll', propertyController.getAll.bind(propertyController));
router.get('/:id', propertyController.getById.bind(propertyController));
router.post('/register', propertyController.add.bind(propertyController));
router.put('/:id', propertyController.update.bind(propertyController));
router.delete('/:id', propertyController.deleteById.bind(propertyController));

// POST /approve/:id - Approve property
router.post('/approve/:id', async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    await propertyController.approveProperty(propertyId);
    req.flash('successMessage', 'Property approved successfully!');
    res.redirect('/api/property/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to approve property.');
  }
});

// POST /disapprove/:id - Disapprove property
router.post('/disapprove/:id', async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    await propertyController.disapproveProperty(propertyId);
    req.flash('successMessage', 'Property disapproved successfully!');
    res.redirect('/api/property/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to disapprove property.');
  }

  
});

module.exports = router;
