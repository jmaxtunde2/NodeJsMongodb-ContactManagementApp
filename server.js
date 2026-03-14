const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const port = process.env.PORT || 5000;

const app = express();
connectDB(); // Connect to the database


app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/contacts", require("./routes/contactRoutes")); // Middleware to handle routes for contacts
app.use("/api/users", require("./routes/userRoutes")); // Middleware to handle routes for users
app.use(errorHandler); // Middleware to handle errors

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})