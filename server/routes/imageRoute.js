const express = require('express');
const router = express.Router();
const { populateImages, getImages } = require('../controllers/imageController');

// רואט לעדכון התמונות במסד
// i did it in order to put in a few images
// router.post('/', populateImages);

// רואט לקבלת תמונות
router.get('/', getImages);

module.exports = router;
