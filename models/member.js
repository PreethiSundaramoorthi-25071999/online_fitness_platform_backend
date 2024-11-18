const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const User = require('./user');

const memberSchema = new Schema({
    bookings: [{ type: mongoose.Types.ObjectId, ref: 'Booking'}],
    fitnessGoals:  [{ type: String }],
});


module.exports = User.discriminator('Member', memberSchema);
