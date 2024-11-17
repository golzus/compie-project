const mongoose = require('mongoose');

// מודל להודעה
const messageSchema = new mongoose.Schema({
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },  // מקשר בין ההודעה לתמונה
    message: { type: String },  // התוכן של ההודעה
    sender: { type: String, required: true },  // שם השולח
    createdAt: { type: Date, default: Date.now }  // זמן יצירת ההודעה
});

// יצירת המודל של ההודעה
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
