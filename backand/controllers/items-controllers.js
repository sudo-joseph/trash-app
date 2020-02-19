const uuid = require('uuid/v4'); // Create a unique id
const { validationResult } = require('express-validator');

const HttpError = require('../models/error-http');

let DUMMY_ITEMS = [
    {
        outcome: null,
        user_id: 100231,
        post_id: 29948116,
        footer: null,
        url: "https://trashnothing.com/public-post/29948116/true-detective-season-1-dvd-eastlake-oakland",
        title: "True Detective Season 1 DVD (Eastlake, Oakland)",
        longitude: -122.2711137,
        content: "True Detective Season 1 boxed DVD. Includes director's and writer's narration extras.",
        photos: null,
        source: "trashnothing",
        date: "2020-02-18T17:46:01",
        latitude: 37.8043637,
        group_id: null,
        type: "offer"
    },
    {
        outcome: null,
        user_id: 100231,
        post_id: 29948108,
        footer: null,
        url: "https://trashnothing.com/public-post/29948108/moving-box-for-dishes-eastlake-oakland",
        title: "Moving Box for Dishes (Eastlake, Oakland)",
        longitude: -122.2711137,
        content: "U-Haul moving box is 24\" long by 12\" wide by 11\" tall. Has dividers inside, and I can provide bubble wrap and padding.",
        photos: null,
        source: "trashnothing",
        date: "2020-02-18T17:44:11",
        latitude: 37.8043637,
        group_id: null,
        type: "offer"
    },
    {
        outcome: null,
        user_id: 100231,
        post_id: 29925592,
        footer: null,
        url: "https://trashnothing.com/public-post/29925592/plastic-bags-oakland-eastlake-oakland",
        title: "Plastic Bags (Oakland) (Eastlake, Oakland)",
        longitude: -122.2711137,
        content: "I have mostly produce bags and a couple of shopping bags that I can't use. Maybe you can? I am 3 blocks east of Park Blvd, below 580",
        photos: null,
        source: "trashnothing",
        date: "2020-02-14T19:13:43",
        latitude: 37.8043637,
        group_id: null,
        type: "offer"
    },
];


const getAllItems = (req, res, next) => {
    console.log('GET in items-controller');

    if(DUMMY_ITEMS.length === 0){
        throw new HttpError('Could not find items.', 404);
    }
    res.json({results: DUMMY_ITEMS})
};

const getItemById = (req, res, next) => {
    console.log('GET :itemId in items-controller');
    const id = req.params.itemId;
    const item = DUMMY_ITEMS.find(i => {
        return i.post_id === id || i.post_id === +id ;
    });
    if(!item){
        throw new HttpError('Could not find the item.', 404);
    }
    res.json({results: item})
};

const createItem = (req, res, next) => {
    console.log('POST item in item-controller')
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new HttpError('Invalid inputs. Please check input data.', 422);
    }

    const { title, 
        content, 
        image, 
        coordinates, 
        address, 
        postal_code, 
        user_id } = req.body;
    const source = "trashapp"
    let newItem = {
        outcome: null,
        user_id: 000000,
        post_id: uuid(),
        footer: null,
        url: "https://trashnothing.com/public-post/29948116/true-detective-season-1-dvd-eastlake-oakland",
        title: title,
        longitude: -122.2711137,
        content: content,
        photos: image,
        source: source,
        date: "2020-02-18T17:46:01",
        latitude: 37.8043637,
        group_id: null,
        type: "offer"
    }

    DUMMY_ITEMS.push(newItem);
    res.status(201).json({ item: newItem })
}

const updateItem = (req, res, next) => {
    console.log('UPDATE item in item-controller')
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new HttpError('Invalid inputs. Please check input data.', 422);
    }

    const itemId = req.params.itemId;

    const indexItem = DUMMY_ITEMS.findIndex(i => i.post_id === itemId || i.post_id === +itemId );
    if(indexItem < 0) {
        throw new HttpError('Item not found.', 404);
    }

    const updateItem = { ...DUMMY_ITEMS[indexItem] };

    const { title, 
        content, 
        image, 
        coordinates, 
        address, 
        postal_code, 
        user_id } = req.body;

    updateItem.title = title || updateItem.title;
    updateItem.content = content || updateItem.content ;
    updateItem.photos = image || updateItem.photos;
    updateItem.postal_code = postal_code || updateItem.postal_code;
    updateItem.address = address || updateItem.address;
    updateItem.coordinates = coordinates || updateItem.coordinates;

    DUMMY_ITEMS[indexItem] = updateItem;
    res.status(200).json({item: updateItem})
}

const deleteItem = (req, res, next) => {
    console.log('DELETE item in item-controller')
    const itemId = req.params.itemId;

    const indexItem = DUMMY_ITEMS.findIndex(i => i.post_id === itemId || i.post_id === +itemId );
    if(indexItem < 0) {
        throw new HttpError('Item not found.', 404);
    }

    DUMMY_ITEMS = DUMMY_ITEMS.filter(i => i.post_id !== +itemId);
    res.json({message: `deteted ${itemId}`});
}

exports.getAllItems = getAllItems;
exports.getItemById = getItemById;
exports.createItem = createItem;
exports.updateItem = updateItem ;
exports.deleteItem = deleteItem ;