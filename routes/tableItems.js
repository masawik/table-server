const express = require('express');
const getAll = require('../controllers/tableItems');

const router = express.Router();

router.get('/api/table-items', getAll);

module.exports = router;