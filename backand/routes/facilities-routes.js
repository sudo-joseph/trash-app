const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET in facility-routes');
    res.json({message: 'GET in facility-route'})
});

module.exports = router;