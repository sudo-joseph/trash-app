const HttpError = require('../models/error-http');

const { 
    getAllMaterials,
    getMaterialsByProximity,
    getFacilities,
    getFacilityDetails } = require('../utils/fetch-earth911');

let DUMMY_FACILITIES = [
    {
        Q1RQNVVeUldCUA: {
            national: false,
            updated: "2016-06-29T12:42:22",
            postal_code: "94612",
            location_type_id: 1,
            municipal: true,
            city: "Oakland",
            event_only: false,
            latitude: 37.80604715391224,
            province: "CA",
            fax: "",
            description: "Elihu Harris State Building",
            curbside: false,
            hours: "Monday to Friday 8am to 5pm",
            phone: "(510) 287-1651",
            address: "1515 Clay Street",
            notes_public: "Please look for the East Bay Municipal Utility District (EBMUD) bin. EBMUD provides free pharmaceutical disposal bins at nine East Bay locations to keep them out of the Bay.\r\n\r\nPlease take pills out of their bottles and put in a plastic zipper bag. For liquids, please block out your personal information on the container and put in a leak-proof plastic bag. Drop the bagged medicines into the disposal bin.",
            created: "2012-05-10T16:38:49",
            url: "https://www.ebmud.com/wastewater/bay-friendly-waste-disposal/medicine-disposal/",
            country: "US",
            region: "Alameda",
            longitude: -122.27331877704263,
            geocoded: false,
            materials: [
                {
                    dropoff: true,
                    description: "Medications",
                    business: false,
                    url: "",
                    residential: true,
                    notes: "This site accepts prescription drugs, over-the-counter medications, pet medicines and prescription strength liquids and creams.",
                    residential_method: "dropoff",
                    business_method: "none",
                    material_id: 193,
                    pickup: false,
                    pending: "F"
                }
            ],
            notes: "Please look for the East Bay Municipal Utility District (EBMUD) bin. EBMUD provides free pharmaceutical disposal bins at nine East Bay locations to keep them out of the Bay.\r\n\r\nPlease take pills out of their bottles and put in a plastic zipper bag. For liquids, please block out your personal information on the container and put in a leak-proof plastic bag. Drop the bagged medicines into the disposal bin."
    }},
];


const getAllFacilities = (req, res, next) => {
    console.log('GET in facility-routes');

    // If there is no facility found, NOT FOUND 404 will send back
    // But, this is odd???
    if(DUMMY_FACILITIES.length === 0){
        throw new HttpError('Could not find the facility.', 404);
    }
    res.json({results: DUMMY_FACILITIES})
};

const getFacilityById = (req, res, next) => {
    console.log('/:facId in facility-routes');
    const facilityId = req.params.facId;
    const facility = DUMMY_FACILITIES.find( fac => {
        return Object.keys(fac)[0] === facilityId;
    });
    // If there is no facility found, NOT FOUND 404 will send back
    if(!facility){
        throw new HttpError('Could not find the facility.', 404);
    }
    res.json({ results: facility })
};

const getAllMaterialsFromE911 = async (req, res, next) => {
    console.log('GET getAllMaterials in facilities-controller')
    let data;
    try {
        data = await getAllMaterials();
    } catch (err) {
        return next(err);
    }
    res.json({results: data});
};

const getMaterialsByProximityFromE911 = async (req, res, next) => {
    console.log('GET getMaterialsFromE911 in facilities-controller')
    let data;
    try {
        data = await getMaterialsByProximity();
    } catch (err) {
        return next(err);
    }
    res.json({results: data});
};

const getFacilitiesFromE911 = async (req, res, next) => {
    console.log('GET getFacilitiesFromE911 in facilities-controller')
    const listOfMaterialIds = req.query.materials;
    const coordinates = { 
        lat: req.query.lat || 37.804829, 
        lng: req.query.lng || -122.272476
    }

    let data;
    try {
        data = await getFacilities(coordinates, listOfMaterialIds);
    } catch (err) {
        return next(err);
    }
    res.json({results: data});

};

const getFacilityDetailsFromE911 = async (req, res, next) => {
    console.log('GET getFacilityDetailsFromE911 in facilities-controller')
    const facilityId = req.params.facId;

    let data;
    try {
        data = await getFacilityDetails(facilityId);
    } catch (err) {
        return next(err);
    }
    res.json({results: data});

};

exports.getAllFacilities = getAllFacilities;
exports.getFacilityById = getFacilityById;
exports.getFacilitiesFromE911 = getFacilitiesFromE911;
exports.getMaterialsByProximityFromE911 = getMaterialsByProximityFromE911;
exports.getAllMaterialsFromE911 = getAllMaterialsFromE911;
exports.getFacilityDetailsFromE911  = getFacilityDetailsFromE911;