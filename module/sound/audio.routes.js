const express = require('express');
const router = express.Router();


// controller
const {getSoundsController, addSoundsController} = require('./audio.controllers')

// Upload sounds to the database
router.post('/dashboard/addSounds', addSoundsController);

// send sound to the client depend on the serach or filter using ocean, nature, rain, fire, waves. Bt default it will show all sounds, and they can also able to search 
router.get('/filterSounds', getSoundsController);


module.exports = router; 


