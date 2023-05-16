const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
// const router = express.Router();
const { body, validationResult } = require("express-validator");
// const phpMyAdmin = require('node-phpmyadmin');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const DB_HOST = process.env.DB_HOST || "localhost";
const sequelize = require("./config/database.js");
// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.get("/", (req, res) => {
    res.send("Salut, c'est moi le serveur !");
});
// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
const usersRoute = require("./routes/Users");
app.use("/users", usersRoute);

// Start Server

sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
    app.listen(port, () => {
        console.log(`Example app listening at http://${DB_HOST}:${port}`);
    });
});
