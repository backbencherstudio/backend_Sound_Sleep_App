const express = require('express');
const router = express.Router();


const {getSoundsController, addSoundsController, getAllSound} = require('./audio.controllers')

router.post('/dashboard/addSounds', addSoundsController);
router.get('/filterSounds', getSoundsController);
router.get('/getSounds', getAllSound);

module.exports = router; 


