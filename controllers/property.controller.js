const BaseController = require('./base.controller');
const PropertyRepository = require('../repository/property.repository');

class PropertyController extends BaseController {
  constructor() {
    const propertyrepo = new PropertyRepository();
    super(propertyrepo);
  }

 

  // Example of overriding the base `getAll` method
  
}

module.exports = PropertyController;
