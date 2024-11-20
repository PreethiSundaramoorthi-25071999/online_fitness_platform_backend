const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
// const options = { discriminatorKey: 'role' };

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, required: true },
    profilePic: { type: String, required: true },
    isTrainer: { type: String, required: false },
    role: { type: String, required: true },
});
//options
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);


