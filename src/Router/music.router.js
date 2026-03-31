const express = require('express');
const musicController = require('../Controllers/music.controller');
const router = express()

router.post('addMusic', musicController.addMusic);


module.exports = router;