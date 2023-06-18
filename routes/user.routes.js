const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();
const userController = new UserController();

// GET route for login page
router.get('/login', (req, res) => {
    res.render('login');
  });
  

// Define user routes
router.get('/getAll', userController.getAll);
router.get('/:id', userController.getById);
router.post('/add', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteById);
router.get('/:id', userController.getUserById);
module.exports = router;
