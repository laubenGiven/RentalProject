const BaseController = require('./base.controller');
const LeaseRequest = require('../models/leaserequest.models');

class LeaseRequestController extends BaseController {
  constructor() {
    const Lrequest  = new LeaseRequest();
    super(Lrequest);
  }

  // Add any additional methods specific to the LeaseRequest model if needed
}

module.exports = LeaseRequestController;
