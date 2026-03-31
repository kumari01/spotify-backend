const mongoose = require('mongoose');

const musicSchema = new Mongoose.Schema({
    uri :{
        type: String,
        required: true,
        unique: true
    },
    title :{
        type : String,
        required : true
    },
    artist :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }

})

const Music = mongoose.model('music', musicSchema);

module.exports = Music;