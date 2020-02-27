const express = require('express');

const { 
    getAllFacilities, 
    getFacilityById,
    getMaterialsByProximityFromE911,
    getFacilitiesFromE911,
    getAllMaterialsFromE911,
    getFacilityDetailsFromE911,
    getCoordsByPostalFromE911,
    createDBFacilities } = require('../controllers/facilities-controllers');

const router = express.Router();

router.get('/', getAllFacilities); 
router.get('/earth911/coords', getCoordsByPostalFromE911);
router.get('/earth911/materials', getAllMaterialsFromE911);
router.get('/earth911/materialsbyprox', getMaterialsByProximityFromE911);
router.get('/earth911/facilities', getFacilitiesFromE911);
router.get('/earth911/facilities/createDB', createDBFacilities);
router.get('/earth911/facilities/search', getFacilitiesFromE911);
router.get('/earth911/facilities/:facId', getFacilityDetailsFromE911);
router.get('/:facId', getFacilityById);

module.exports = router;