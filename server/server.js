require("dotenv").config();
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOption");

const app = express();

const PORT = process.env.PORT || 2000;

// התחברות למסד הנתונים
connectDB();

// הגדרת CORS פתוח לכולם
app.use(cors(corsOptions));

// שימוש ב-JSON
app.use(express.json());

// הגדרת קבצים סטטיים
app.use(express.static("public"));

// מסלולים
app.get("/", (req, res) => {
  res.send("home page");
});

app.use('/api/messages', require('./routes/messageRoute'));  
app.use('/api/populate-images', require('./routes/imageRoute'));
app.use('/api/get-all-images', require('./routes/imageRoute'));

// שרת React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// האזנה לשרת
mongoose.connection.once("open", () => {
  console.log("connect to db success");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("****************DB ERROR*****************");
  console.log(err);
});
