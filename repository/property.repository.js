const BaseRepository = require('./base.repository');
const PropertyModel = require('../models/property.models');

class PropertyRepository extends BaseRepository {
  constructor() {
    super(PropertyModel);
  }

  // Add any additional property-specific methods here
}

module.exports = PropertyRepository;
