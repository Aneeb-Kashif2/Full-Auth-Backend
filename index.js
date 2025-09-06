
require('dotenv').config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.URL;




const app = express();



connectToMongoDB(MONGO_URL)
    .then(() => console.log("MongoDB connected "))
    .catch(err => {
        console.error("MongoDB connection error ", err);
        process.exit(1);
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});