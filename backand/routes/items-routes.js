const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET in items-routes');
    res.json({message: 'GET in items-route'})
});

module.exports = router;