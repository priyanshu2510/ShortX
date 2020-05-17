const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({

    url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,

    }

});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;