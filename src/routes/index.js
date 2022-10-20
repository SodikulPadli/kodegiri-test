const express = require('express');
const router = express.Router();

// Controller
const { addUser, getUser, login } = require('../controllers/User');

// Route
router.post('/adduser', addUser);
router.get('/user/:id', getUser);
router.post('/login', login);

module.exports = router;
