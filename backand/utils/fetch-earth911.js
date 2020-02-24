const axios = require('axios');

const HttpError = require('../models/error-http'); 

const API_KEY = process.env.API_KEY_EARTH911;

const url_api_base = 'http://api.earth911.com/earth911';

const getMaterialsByProximity = async (coordinates) => {
    const queryCoordinates = coordinates || { lat: 37.804829, lng: -122.272476 };

    let url = `${url_api_base}.searchMaterialsByProximity?latitude=${queryCoordinates.lat}&longitude=${queryCoordinates.lng}&api_key=${API_KEY}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not find any materials from earth911.', 422);
    }
    return data;
};

const getAllMaterials = async () => {
    let url = `${url_api_base}.getMaterials?api_key=${API_KEY}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not get list of materials from earth911.', 422);
    }
    return data;
};

const getFacilities = async (coordinates, listMaterials) => {
    const queryCoordinates = coordinates || { lat: 37.804829, lng: -122.272476 };
    let queryMaterialIds;
    if(listMaterials) {
        queryMaterialIds = listMaterials.split(',').map(i => Number(i));
    }
    let queryString = "";
    if (queryMaterialIds && queryMaterialIds.length > 0) {
        queryMaterialIds.forEach(element => {
            queryString += `&material_id[]=${element}`
        });
    } 

    let url = `${url_api_base}.searchLocations?latitude=${queryCoordinates.lat}&longitude=${queryCoordinates.lng}&api_key=${API_KEY}${queryString}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not find any facility locations from earth911.', 422);
    }
    return data;
};

const getFacilityDetails = async (facilityId) => {
    let url = `${url_api_base}.getLocationDetails?location_id=${facilityId}&api_key=${API_KEY}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not find a facility details from earth911.', 422);
    }
    return data;
};

const getCoordsByPostal = async (postalcode) => {
    let url = `${url_api_base}.getPostalData?country=US&postal_code=${postalcode}&api_key=${API_KEY}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not find a facility details from earth911.', 422);
    }
    return data;
};

exports.getMaterialsByProximity = getMaterialsByProximity;
exports.getAllMaterials = getAllMaterials; 
exports.getFacilities = getFacilities;
exports.getFacilityDetails = getFacilityDetails;
exports.getCoordsByPostal = getCoordsByPostal;