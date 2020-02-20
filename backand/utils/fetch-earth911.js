const axios = require('axios');
const dotenv = require('dotenv');

const HttpError = require('../models/error-http'); 

dotenv.config();
const API_KEY = process.env.API_KEY_EARTH911;


const getMaterialsByProximity = async (coordinates) => {
    const queryCordinates = coordinates || { lat: 37.804829, lng: -122.272476 };

    let url = `http://api.earth911.com/earth911.searchMaterialsByProximity?latitude=37.804829&longitude=-122.272476&api_key=${API_KEY}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not find any post items from trashnothing.', 422);
    }
    const materials = data;
    return materials; 
};

exports.getMaterialsByProximity = getMaterialsByProximity;
