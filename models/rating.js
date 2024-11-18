const mongoose = require('mongoose');

const ratingSchema = {
    totalRating: { type: Number, default: 0 },
    numberOfRatings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
};


module.exports=ratingSchema;