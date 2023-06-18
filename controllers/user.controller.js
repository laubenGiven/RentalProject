const BaseController = require('./base.controller');
const UserRepository = require('../repository/user.repository');
const UserModel = require('../models/user.models');

class UserController extends BaseController {
  constructor() {
    const userRepo = new UserRepository();
    super(userRepo);
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
      if (!user) {
        return this.sendErrorResponse(res, 'User not found', 404);
      }
      this.sendSuccessResponse(res, 'User found', user);
    } catch (error) {
      console.error(error);
      this.sendErrorResponse(res, 'Failed to retrieve user', 500);
    }
  }
}

module.exports = UserController;
