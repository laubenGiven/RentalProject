const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property_id',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
