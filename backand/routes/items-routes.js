const express = require('express');

const router = express.Router();

DUMMY_ITEMS = [
    {
        "outcome": null,
        "user_id": 100231,
        "post_id": 29948116,
        "footer": null,
        "url": "https://trashnothing.com/public-post/29948116/true-detective-season-1-dvd-eastlake-oakland",
        "title": "True Detective Season 1 DVD (Eastlake, Oakland)",
        "longitude": -122.2711137,
        "content": "True Detective Season 1 boxed DVD. Includes director's and writer's narration extras.",
        "photos": null,
        "source": "trashnothing",
        "date": "2020-02-18T17:46:01",
        "latitude": 37.8043637,
        "group_id": null,
        "type": "offer"
    },
    {
        "outcome": null,
        "user_id": 100231,
        "post_id": 29948108,
        "footer": null,
        "url": "https://trashnothing.com/public-post/29948108/moving-box-for-dishes-eastlake-oakland",
        "title": "Moving Box for Dishes (Eastlake, Oakland)",
        "longitude": -122.2711137,
        "content": "U-Haul moving box is 24\" long by 12\" wide by 11\" tall. Has dividers inside, and I can provide bubble wrap and padding.",
        "photos": null,
        "source": "trashnothing",
        "date": "2020-02-18T17:44:11",
        "latitude": 37.8043637,
        "group_id": null,
        "type": "offer"
    },
    {
        "outcome": null,
        "user_id": 100231,
        "post_id": 29925592,
        "footer": null,
        "url": "https://trashnothing.com/public-post/29925592/plastic-bags-oakland-eastlake-oakland",
        "title": "Plastic Bags (Oakland) (Eastlake, Oakland)",
        "longitude": -122.2711137,
        "content": "I have mostly produce bags and a couple of shopping bags that I can't use. Maybe you can? I am 3 blocks east of Park Blvd, below 580",
        "photos": null,
        "source": "trashnothing",
        "date": "2020-02-14T19:13:43",
        "latitude": 37.8043637,
        "group_id": null,
        "type": "offer"
    },
];


router.get('/', (req, res, next) => {
    console.log('GET in items-routes');
    res.json({results: DUMMY_ITEMS})
});

router.get('/:itemId', (req, res, next) => {
    console.log('GET :itemId in items-routes');
    const id = req.params.itemId;
    const item = DUMMY_ITEMS.find(i => {
        return i.post_id = id;
    });
    res.json({results: item})
});

module.exports = router;