const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");
// const { fileURLToPath } = require("url");
const bodyparser = require("body-parser");
const { body, validationResult } = require("express-validator");

// CONFIGURATION
const filename = path.resolve();
const dirname = path.dirname(filename);
require("dotenv").config();

// SERVER
const app = express();
const port = process.env.PORT || 5000;

const DB_HOST = process.env.DB_HOST || "localhost";
const sequelize = require("./config/database.js");
// Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
// app.use('/assets',express.static(path.join(dirname, "frontend/public/assets")));

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
const usersRoute = require("./routes/users");
const articlesRoute = require("./routes/articles");
const commentsRoute = require("./routes/comments");
app.use("/articles", articlesRoute);
app.use("/users", usersRoute);
app.use("/comments", commentsRoute);

// Start Server

sequelize.sync({ alter: false }).then(() => {
    console.log("Drop and re-sync db.");
    app.listen(port, () => {
        console.log(`Example app listening at http://${DB_HOST}:${port}`);
    });
});
