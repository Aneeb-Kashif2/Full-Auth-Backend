
require('dotenv').config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const userAuth = require("./routes/handleUserLoginAndSignupRoutes");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.URL;




const app = express();

app.use(express.json());
app.use("/" , userAuth);


connectToMongoDB(MONGO_URL)
    .then(() => console.log("MongoDB connected "))
    .catch(err => {
        console.error("MongoDB connection error ", err);
        process.exit(1);
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});