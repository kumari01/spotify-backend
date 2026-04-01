const MusicModel = require('../Models/music.model');
const {uploadFile} = require("../services/storage.services");
const jwt = require('jsonwebtoken');


async function createMusic(req,res){

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist"){
            return res.status(403).json({ message: 'Only artist has access to create music ' });
        }
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const title = req.body.title;
    const file = req.file;
    if (!title) {
        return res.status(400).json({ message: 'title is required' });
    }
    if (!file) {
        return res.status(400).json({ message: 'music file is required' });
    }

    const result = await uploadFile(file.buffer.toString('base64'));
    const music = await MusicModel.create({
        title,
        uri: result.url,
        artist : decoded.id
    });
    await music.save();
    res.status(201).json({message:"Music created successfully", music});

}
module.exports = {createMusic};