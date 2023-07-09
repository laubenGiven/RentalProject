const express = require('express');
const LeaseRequestController = require('../controllers/leaserequest.controller');
const leaserequestController = new LeaseRequestController();
const router = express.Router();
const PropertyController = require('../controllers/property.controller')
const propertyController = new PropertyController();
const session = require('express-session');





// Create a new lease request
router.post('/postleaserequest', leaserequestController.add);

// Get all lease requests
router.get('/', leaserequestController.getAll);

// Get a single lease request by ID
router.get('/:id',leaserequestController.getById);

// Update a lease request
router.put('/:id', leaserequestController.update);

// Delete a lease request
router.delete('/:id', leaserequestController.deleteById);

module.exports = router;
