const express = require('express');
const userRoutes = require('./user.routes');
const propertyRoutes = require('./property.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/property', propertyRoutes);

module.exports = router;
