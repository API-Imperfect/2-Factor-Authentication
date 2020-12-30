require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDB = require("./database/db");
const ErrorsMiddleware = require("./middleware/mongooseErrorHandler");
const authRoutes = require("./routes/authRoutes");

// Uncaught Exception
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception....💣 🔥 stopping the server...");
    console.log(error.name, error.message);
    process.exit(1);
});

// Initialize application
const app = express();

// Connect to DB
connectToDB();

//Parse JSON
app.use(express.json());

app.use(cookieParser());

// Declare PORT
const PORT = process.env.PORT || 5000;

// Mount Routes/create routes
app.get("/", (req, res) => {
    res.json({
        hi: "Welcome to the NodeJS 2FA App",
    });
});
app.use("/api/v1/", authRoutes);

// Error Middleware
app.use(ErrorsMiddleware);

// Setup server
const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode 
on port ${PORT}`)
);

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection....💣 🔥 stopping the server...");
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});
