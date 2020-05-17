const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortSchema = new Schema({


    short_url: {
        type: String,
    }

});

const shortModel = mongoose.model('shorturl', shortSchema);
module.exports = shortModel;