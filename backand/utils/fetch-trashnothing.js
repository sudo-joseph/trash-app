const axios = require('axios');
const dotenv = require('dotenv');

const HttpError = require('../models/error-http'); 

dotenv.config();
const API_KEY = process.env.API_KEY_TRASHNOTHING;


const getDonationItems = async (coordinates, radius) => {
    // coordinates and radius are required for querying Items(Posts) 
    const queryRadius =  radius || 140;
    const queryCordinates = coordinates || { lat: 37.804829, lng: -122.272476 };

    let url = `https://trashnothing.com/api/v1.1/posts?radius=${queryRadius}&latitude=${queryCordinates.lat}&longitude=${queryCordinates.lng}&sources=trashnothing&types=offer&api_key=${API_KEY}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data || data.posts.length === 0) {
        throw new HttpError('Could not find any post items from trashnothing.', 422);
    }
    const items = data.posts;
    return items; 
};

module.exports = getDonationItems;
