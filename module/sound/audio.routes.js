const express = require('express');
const router = express.Router();


const {getSoundsController, addSoundsController, getAllSound, searchSoundsByCategoryController} = require('./audio.controllers')

router.post('/dashboard/addSounds', addSoundsController);
router.get('/filterSounds', getSoundsController);
router.get('/getSounds', getAllSound);
router.get('/searchByCategory', searchSoundsByCategoryController);

module.exports = router; 


 