const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user',userSchema);

module.exports = User;