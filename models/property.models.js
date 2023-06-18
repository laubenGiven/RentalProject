const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  maps: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: String,
      required: true,
    },
  ],
},{versionKey:false
});

const PropertyModel = mongoose.model('Property', propertySchema);

module.exports = PropertyModel;
