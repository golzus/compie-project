const Message = require('../models/Message');

// שליפת כל ההודעות עבור תמונה מסוימת
const getMessages = async (req, res) => {
    try {
      const messages = await Message.find({ imageId: req.params.imageId })
    
        .populate("imageId") // מקשר את ה-ObjectId של התמונה לאובייקט התמונה המלא
        .lean();  // החזרת אובייקט פשוט ללא פונקציות Mongoose
        console.log(messages);
        res.json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  

// שליחת הודעה חדשה
const sendMessage = async (req, res) => {
    console.log("hi");
  try {
    const { imageId, message, sender } = req.body;
console.log(imageId,message,sender);
    const newMessage = new Message({
      imageId,
      message,
      sender,
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getMessages, sendMessage };
