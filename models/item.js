const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
    // TrashNothing Data Example
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
*/

const itemSchema = new Schema({
    user_id: { type: String, required: true },
    post_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true, minlength: 6 },
    photos:  { type: String, required: false }, // [String] for multiple images
    longitude: { type: Number, required: true },
    latitude:  { type: Number, required: true },
    /// Eventually use Date type
    date: { type: String, required: false },  // Creating time only
    //date: { type: Date, required: true }, 
    updated: { type: Date, default: Date.now() },
    type: { type: String, default: "offer" },  
    source: { type: String, default: "trashapp" },
    outcome: { type: String, required: false },  // From TrashNothing
    footer:  { type: String, required: false },  // From TrashNothing
    url: { type: String, required: false },      // From Trashnothing
});

module.exports = mongoose.model('Item', itemSchema);