const fs = require('fs');
const path = require('path');
const Sound = require('./audio.models');
const upload = require('../../config/multer.config');
const { baseUrl } = require('../../utils/image_path');


const getSoundsController = async (req, res) => {
    try {
      const { category, search } = req.query;
      let filter = {};
  
      // Ensure case-insensitive category filtering
      if (category) {
        filter.category = { $regex: `^${category}$`, $options: "i" };
      }
  
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { subtitle: { $regex: search, $options: "i" } },
        ];
      }
  
      const sounds = await Sound.find(filter);
  
      // Ensure baseUrl is appended if it's missing
      const updatedSounds = sounds.map((sound) => ({
        ...sound._doc,
        imagePath: sound.imagePath.match(/^https?:\/\//) ? sound.imagePath : `${baseUrl}${sound.imagePath}`,
        audioPath: sound.audioPath.match(/^https?:\/\//) ? sound.audioPath : `${baseUrl}${sound.audioPath}`,
      }));
  
      res.status(200).json(updatedSounds);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sounds", error: error.message });
    }
  };
  


const addSoundsController = async (req, res) => {
    try {
        upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'audio', maxCount: 1 }
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            }

            const { category, title, subtitle } = req.body;
            if (!category || !title || !subtitle || !req.files?.image || !req.files?.audio) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const newSound = new Sound({
                category,
                title,
                subtitle,
                imagePath: `/uploads/${req.files.image[0].filename}`,
                audioPath: `/uploads/${req.files.audio[0].filename}`
            });

            await newSound.save();

            res.status(201).json({
                success: true,
                message: "Sound added successfully",
                sound: {
                    id: newSound._id,
                    category,
                    title,
                    subtitle,
                    imagePath: `${baseUrl}/uploads/${req.files.image[0].filename}`,
                    audioPath: `${baseUrl}/uploads/${req.files.audio[0].filename}`
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding sound', error: error.message });
    }
};


module.exports = {
    getSoundsController,
    addSoundsController
};
