const Payment = require('../models/payment.models');

class PaymentController {
  async getAllPayments(req, res) {
    try {
      const payments = await Payment.find();
      res.json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve payments' });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve payment' });
    }
  }

  async createPayment(req, res) {
    try {
      const { propertyId, tenantId, amount, paymentDate } = req.body;
      const newPayment = new Payment({
        property_id,
        tenant_id,
        amount,
        paymentDate,
      });
      const createdPayment = await newPayment.save();
      res.status(201).json(createdPayment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  }

  async updatePayment(req, res) {
    try {
      const { amount, paymentDate } = req.body;
      const payment = await Payment.findByIdAndUpdate(req.params.id, { amount, paymentDate }, { new: true });
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update payment' });
    }
  }

  async deletePayment(req, res) {
    try {
      const payment = await Payment.findByIdAndDelete(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete payment' });
    }
  }
}

module.exports = PaymentController;
