const express = require('express');
const userRoutes = require('./user.routes');
const propertyRoutes = require('./property.routes');
const commentRoutes = require('./comment.routes')

const router = express.Router();

router.use('/', userRoutes);
router.use('/property', propertyRoutes);
router.use('/comment',commentRoutes);

module.exports = router;
