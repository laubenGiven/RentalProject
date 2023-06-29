const BaseRepository = require('./base.repository');
const Property = require('../models/property.models');

class PropertyRepository extends BaseRepository {
  constructor() {
    super(Property);
  }

  // Add any additional property-specific methods here
}

module.exports = PropertyRepository;
