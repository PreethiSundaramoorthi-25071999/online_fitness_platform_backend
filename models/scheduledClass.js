const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 
const scheduledClassSchema = new Schema({
    type: { type: String, required: true },
    duration: { type: String, required: true },
    classType: [{ type: String, required: true }],
    schedules:  [{ type: String, required: true }],
    capacity:{ type: Number, required: true },
    availableSpots:{ type: Number, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('ScheduledClass', scheduledClassSchema);

// //2
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

 
// const scheduledClassSchema = new Schema({
//     duration: { type: String, required: true },
//     classType: { type: String, required: true },
//     date: { type: String, required: true },
//     schedules:  [{ type: String, required: true }],
//     capacity:{ type: Number, required: true },
//     availableSpots:{ type: Number, required: true },
//     creator: { type: mongoose.Types.ObjectId, required: true, ref: 'Trainer'}
// });

// module.exports = mongoose.model('ScheduledClass', scheduledClassSchema);