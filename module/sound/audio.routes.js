const express = require('express');
const router = express.Router();


const {getSoundsController, addSoundsController} = require('./audio.controllers')

router.post('/dashboard/addSounds', addSoundsController);
router.get('/filterSounds', getSoundsController);


module.exports = router; 


