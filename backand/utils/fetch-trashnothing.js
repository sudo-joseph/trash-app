const axios = require('axios');
const dotenv = require('dotenv');

const HttpError = require('../models/error-http'); 

dotenv.config();
const API_KEY_TN = process.env.API_KEY_TRASHNOTHING;


const getDonationItems = async () => {
    let url = `https://trashnothing.com/api/v1.1/posts?radius=140&latitude=37.804829&longitude=-122.272476&sources=trashnothing&types=offer&api_key=${API_KEY_TN}`

    const res = await axios.get(url);
    const data = res.data;

    if (!data) {
        throw new HttpError('Could not find any post items from trashnothing.', 422);
    }
    const items = data.posts;
    return items; 
};

module.exports = getDonationItems;
