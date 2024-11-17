const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messageController');

// שליפת כל ההודעות
router.get('/get-messages/:imageId', getMessages);

// שליחת הודעה חדשה
router.post('/send-message', sendMessage);

module.exports = router;
