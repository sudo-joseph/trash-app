const express = require('express');

const facilitiesController = require('../controllers/facilities-controllers')
const router = express.Router();


router.get('/', facilitiesController.getAllFacilities); 
router.get('/:facId', facilitiesController.getFacilityById);

module.exports = router;