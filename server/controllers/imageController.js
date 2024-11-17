const Image = require('../models/Image')

// פונקציה לעדכון המסד עם נתונים התחלתיים
// i did this function in order to put in a few images!!
// const populateImages = async (req, res) => {
//     try {
//         const images = [
//             { path: '1', title: 'Sunset', artist: 'John Doe', description: 'Beautiful sunset view' },
//             { path: '2', title: 'Mountain', artist: 'Jane Smith', description: 'Amazing mountain scene' },
//             { path: '3', title: 'River', artist: 'Emily White', description: 'Calm river landscape' },
//             { path: '4', title: 'Forest', artist: 'Michael Brown', description: 'Green forest trees' },
//             { path: '5', title: 'Beach', artist: 'Sarah Blue', description: 'Sunny beach day' },
//             { path: '6', title: 'Desert', artist: 'Chris Green', description: 'Sandy desert view' },
//         ];

//         const insertedImages = await Image.insertMany(images);
//         res.json({ error: false, message: 'Images added successfully', data: insertedImages });
//     } catch (err) {
//         console.error("Error during insertMany:", err);  // הצגת השגיאה המלאה
//         res.status(500).json({ error: true, message: 'Failed to populate images', data: err });
//     }
// };




// פונקציה לקבלת כל התמונות
const getImages = async (req, res) => {
    try {
        const images = await Image.find().lean();
        if (!images.length) {
            return res.status(400).json({ error: true, message: 'No images', data: null });
        }
        res.json({ error: false, message: '', data: images });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Failed to fetch images', data: null });
    }
};

module.exports = {  getImages };
