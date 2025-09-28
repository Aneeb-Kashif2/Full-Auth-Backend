require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");
const authRoutes = require("./routes/handleUserLoginAndSignupRoutes");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.URL;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies/auth headers if needed
  })
);

app.use(express.json());

app.use("/", authRoutes); // all signup/login/otp routes will start with /auth

connectToMongoDB(MONGO_URL)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  });


app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
