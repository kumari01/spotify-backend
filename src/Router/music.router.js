const express = require('express');
const musicController = require('../Controllers/music.controller');

const multer = require('multer');
const router = express()
const upload = multer({
    storage : multer.memoryStorage(),
})

router.post('/createMusic', upload.single("music"),musicController.createMusic);

router.post('/uploadalbum', musicController.createAlbums)


module.exports = router;