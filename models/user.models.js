const mongoose = require('mongoose');
const validator = require('validator');

const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    id: {type:objectId, 
        auto:true
    },
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
},{versionKey:false
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
