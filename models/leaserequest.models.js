const mongoose = require('mongoose');

const leaseRequestSchema = new mongoose.Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  property_location: {
    type: String,
    required: true,
  },
  propertyPrice: {
    type: Number,
    required:true,
  },
  startDate: {
    type: Date,
    default: null, // Set default value to null
  },
  endDate: {
    type: Date,
    default:null,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LeaseRequest = mongoose.model('LeaseRequest', leaseRequestSchema);

module.exports = LeaseRequest;
