const express = require('express');

const { getAllFacilities, 
        getFacilityById,
        getMaterialsFromE911,
        getFacilitiesFromE911 } = require('../controllers/facilities-controllers');

const router = express.Router();

router.get('/', getAllFacilities); 
router.get('/earth911/materials', getMaterialsFromE911);
router.get('/earth911/facilities', getFacilitiesFromE911);
router.get('/:facId', getFacilityById);

module.exports = router;