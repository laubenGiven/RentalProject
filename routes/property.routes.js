const express = require('express');
const PropertyController = require('../controllers/property.controller');
const router = express.Router();
const propertyController = new PropertyController();

const User = require('../models/user.models');
const UserController = require('../controllers/user.controller');

const userController = new UserController();

// GET route for property registration page
router.get('/register', (req, res) => {
  res.render('newproperty');
});

router.get('/admin', async (req, res) => {
  try {
    const { username } = req.session;
    const user = await User.findOne({ username });
    req.session.loggedin = true;
    req.session.username = username;
    const properties = await propertyController.getAllProperties.bind(propertyController);
    res.render('index', {
      Property: properties,
      username,
      image: user.photo,
      message: 'Welcome to the Admin Dashboard.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve data' });
  }
});

router.get('/propertylist', propertyController.getAllProperties.bind(propertyController));

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
    res.render('index', { Property: updatedProperty, username,successMessage: 'Property approved successfully.' });
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
    res.status(200).send(`<script>alert("property disapproved  successfully!"); window.location.href = "/api/property/admin";</script>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to disapprove property.');
  }
});

module.exports = router;
