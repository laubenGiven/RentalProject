const express = require('express');
const PropertyController = require('../controllers/property.controller');
const router = express.Router();
const propertyController = new PropertyController();

// GET route for property registration page
router.get('/register', (req, res) => {
  res.render('newproperty');
});



router.get('/propertylist', propertyController.getAllProperties.bind(propertyController));

// Define property routes
router.get('/getAll', propertyController.getAll.bind(propertyController));
router.get('/:id', propertyController.getById.bind(propertyController));
router.post('/register', propertyController.add.bind(propertyController));
router.put('/:id', propertyController.update.bind(propertyController));
router.delete('/:id', propertyController.deleteById.bind(propertyController));

module.exports = router;
