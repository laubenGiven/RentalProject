const BaseRepository = require('./base.repository');
const UserModel = require('../models/user.models');

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  // Add any additional user-specific methods here
}

module.exports = UserRepository;
