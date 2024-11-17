require("dotenv").config();
const path = require('path');

// const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 2000;
connectDB();
app.use(cors(corsOptions));
// app.use(cookieParser());

app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("home 1 page");
});

// הוספת הנתיב של ההודעות
app.use('/api/messages', require('./routes/messageRoute'));  // הוספת נתיב להודעות

// מסלול להפעלת הכנסת הנתונים למסד
app.use('/api/populate-images', require('./routes/imageRoute'));
app.use('/api/get-all-images', require('./routes/imageRoute'));

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back index.html so React Router can handle the routing.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

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
