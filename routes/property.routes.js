const express = require('express');
const PropertyController = require('../controllers/property.controller');

const router = express.Router();
const propertyController = new PropertyController();

// GET route for property registration page
router.get('/register', (req, res) => {
    res.render('register');
  });

// Define property routes
router.get('/getAll', propertyController.getAll);
router.get('/:id', propertyController.getById);
router.post('/add', propertyController.add);
router.put('/:id', propertyController.update);
router.delete('/:id', propertyController.deleteById);

module.exports = router;
