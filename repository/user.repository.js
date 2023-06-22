const BaseRepository = require('./base.repository');
const User = require('../models/user.models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  // Add any additional user-specific methods here
}

module.exports = UserRepository;
