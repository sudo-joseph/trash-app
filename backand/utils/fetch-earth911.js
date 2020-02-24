const axios = require('axios');

const HttpError = require('../models/error-http'); 

const API_KEY = process.env.API_KEY_EARTH911;

const url_api_base = 'http://api.earth911.com/earth911';

const getMaterialsByProximity = async (coordinates) => {
    const queryCordinates = coordinates || { lat: 37.804829, lng: -122.272476 };

    let url = `${url_api_base}.searchMaterialsByProximity?latitude=${queryCordinates.lat}&longitude=${queryCordinates.lng}&api_key=${API_KEY}`

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

const getFacilities = async (coordinates) => {
    const queryCordinates = coordinates || { lat: 37.804829, lng: -122.272476 };

    let url = `${url_api_base}.searchLocations?latitude=${queryCordinates.lat}&longitude=${queryCordinates.lng}&api_key=${API_KEY}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not find any facility locations from earth911.', 422);
    }
    return data;
};

exports.getMaterialsByProximity = getMaterialsByProximity;
exports.getAllMaterials = getAllMaterials; 
exports.getFacilities = getFacilities;