const mongoose = require("mongoose");

const albums = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    musics :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'music'
    }],
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

const AlbumsModel = mongoose.model('albums', albums);

module.exports = AlbumsModel;