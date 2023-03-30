const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const StudentsController = require('../controllers/StudentsController');

router.get('/', AppController.index);
router.get('/students', StudentsController.index);
router.get('/students/:major', StudentsController.filterByMajor);

module.exports = router;
