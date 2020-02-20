const express = require('express');

const facilitiesController = require('../controllers/facilities-controllers')

const router = express.Router();

router.get('/', facilitiesController.getAllFacilities); 
router.get('/earth911/materials', facilitiesController.getMaterialsFromE911);
router.get('/earth911/facilities', facilitiesController.getFacilitiesFromE911);
router.get('/:facId', facilitiesController.getFacilityById);

module.exports = router;