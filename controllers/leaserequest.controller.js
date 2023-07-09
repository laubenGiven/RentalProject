const BaseController = require('./base.controller');
const LeaseRequest = require('../models/leaserequest.models');

class LeaseRequestController extends BaseController {
  constructor() {
    super(LeaseRequest);
  }

  async add(req, res) {
    try {
      const { property_id, userId, propertyName, property_location,propertyPrice} = req.body;

      // Create a new lease request instance
      const leaseRequest = new LeaseRequest({
        property_id,
        userId,
        propertyName,
        property_location,
        propertyPrice
      
      });

      // Save the lease request to the database
      await leaseRequest.save();

      res.status(201).json({ success: true, message: 'Lease request created successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Failed to create lease request' });
    }
  }

  // Add any additional methods specific to the LeaseRequest model if needed
}

module.exports = LeaseRequestController;
