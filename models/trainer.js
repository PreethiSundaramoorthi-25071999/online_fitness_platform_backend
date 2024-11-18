const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./user');
  const ratingSchema=require('./rating')

 

const trainerSchema = new Schema({
    qualifications: [{ type: String }],
    expertise:  [{ type: String}],
    rating:ratingSchema,
    createdAt: { type: Date, default: Date.now } ,
    schedules: [{ type: mongoose.Types.ObjectId, ref: 'ScheduledClass'}],
    reviews:[{ type: String}],
});

module.exports = User.discriminator('Trainer', trainerSchema);


 

 


