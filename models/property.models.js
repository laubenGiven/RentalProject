const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  property_name: { type: String, required: true },
  property_type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },  
  cost: { type: Number, required: true },
  photos:  {  type:[String],
    allowNull: true},
   
  maps: {  type:[String],
    allowNull: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  approved: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
