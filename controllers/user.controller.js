const bcrypt = require('bcrypt');
const BaseController = require('./base.controller');
const UserRepository = require('../repository/user.repository');
const User = require('../models/user.models');
const flash = require('connect-flash');
const session = require('express-session');

class UserController extends BaseController {
  constructor() {
    const userRepo = new UserRepository();
    super(userRepo);
  }

  async add(req, res) {
    try {
      const { role, username, email, password, passwordConfirm } = req.body;

      if (!role || !username || !email || !password || !passwordConfirm) {
        return res.status(400).send('All fields are required.');
      }

      if (password !== passwordConfirm) {
        return res.status(400).send('Passwords do not match.');
      }

      // Check if username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        // Redirect back to the registration page with a pop-up message
        return res.send(
          `<script>alert("Username or email already exists."); window.location.href = "/api/users/register";</script>`
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        role,
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      //res.status(201).send('User registered successfully!');
      // Redirect to the login page with a success message
      res.send( `<script>alert("Account created successfully!!"); window.location.href = "/api/users/login";</script>`)
  

    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to create user.');
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return this.sendErrorResponse(res, 'User not found', 404);
      }
      this.sendSuccessResponse(res, 'User found', user);
    } catch (error) {
      console.error(error);
      this.sendErrorResponse(res, 'Failed to retrieve user', 500);
    }
  }

  async resetPassword(req, res) {
    const { email, newPassword, confirmPassword } = req.body;

    try {
      // Check if the user with the provided email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      // Encrypt the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Display a successful message as a pop-up window
      const message = 'Password reset successfully!';
      const script = `
        <script>
          const popUpWindow = window.open('', 'Pop-up Window', 'width=400,height=200');
          popUpWindow.document.write('<h1>${message}</h1>');
          setTimeout(() => {
            popUpWindow.close();
            window.location.href = '/api/users/login'; // Redirect user to the login page
          }, 3000);
        </script>
      `;

     //res.send(script);
     res.send( `<script>alert("Password resetted  successfully!"); window.location.href = "/api/users/login";</script>`)

    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).send({ error: 'Failed to reset password! Try again!!' });
    }
  }
}

module.exports = UserController;
