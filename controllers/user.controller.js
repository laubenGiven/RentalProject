const bcrypt = require('bcrypt');
const BaseController = require('./base.controller');
const UserRepository = require('../repository/user.repository');
const User = require('../models/user.models');
const session = require('express-session');
const multer = require('multer');

// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

// Create a multer upload instance
const upload = multer({
  storage: storage,
}).single('photo');

class UserController extends BaseController {
  constructor() {
    const userRepo = new UserRepository();
    super(userRepo);
  }

  async add(req, res) {
    //photo upload code
    try {
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading
          return res.status(500).send('Failed to upload photo.');
        } else if (err) {
          // An unknown error occurred when uploading
          return res.status(500).send('Failed to upload photo.');
        }

        const { role, username, email, password, passwordConfirm } = req.body;

        if (!role || !username || !email || !password || !passwordConfirm) {
          return res.status(400).send('All fields are required.');
        }

        if (password !== passwordConfirm) {
          return res.status(400).send('Passwords do not match.');
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          return res.send(
            `<script>alert("Username or email already exists."); window.location.href = "/register";</script>`
          );
        }

        const newUser = new User({
          role,
          username,
          email,
          password: await bcrypt.hash(password, 10),
        });

        if (req.file) {
          // Save the uploaded file name as the photo property
          console.log(req.file);
          newUser.photo = req.file.filename;
        }

        await newUser.save();

        res.send(`<script>alert("Account created successfully!!"); window.location.href = "/";</script>`);
      });
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
      const photoUrl = basePhotoUrl.basePhotoUrl + '/' + user.photo;
      this.sendSuccessResponse(res, 'User found', user,{photoUrl});
    } catch (error) {
      console.error(error);
      this.sendErrorResponse(res, 'Failed to retrieve user', 500);
    }
  }

  async resetPassword(req, res) {
    const { email, newPassword, confirmPassword } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      res.send(`<script>alert("Password resetted successfully!"); window.location.href = "/login";</script>`);

    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).send({ error: 'Failed to reset password! Try again!!' });
    }
  }

  async getAll(req, res) {
    try {
      const user = await User.find({}, 'username email role photo');

      //res.send("<h1>hello world!</h1>");
      const photoUrl = basePhotoUrl.basePhotoUrl + '/' + user.photo;
      res.render('userview', { Users:user,photoUrl});
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to retrieve users.');
    }
  }
}

module.exports = UserController;
