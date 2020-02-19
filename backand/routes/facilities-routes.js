const express = require('express');

const HttpError = require('../models/error-http');

const router = express.Router();


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


router.get('/', (req, res, next) => {
    console.log('GET in facility-routes');

    // If there is no facility found, NOT FOUND 404 will send back
    // But, this is odd???
    if(DUMMY_FACILITIES.length === 0){
        throw new HttpError('Could not find the facility.', 404);
    }
    res.json({results: DUMMY_FACILITIES})
});

router.get('/:facId', (req, res, next) => {
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

});

module.exports = router;