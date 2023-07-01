const mongoose = require('mongoose');

const phoneBookSchema = new mongoose.Schema({
    id:{
        type:String,

    },

    name:{
        type:String,
        required:true

    },

    phone:{
        type:String,
        required:true

    },

});

const phoneBook = mongoose.model('phoneBook', phoneBookSchema);

module.exports = phoneBook;