const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { requireAuth, auth } = require("./middleware/auth.middleware");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

require("dotenv").config();

// SERVER
const app = express();
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
const port = process.env.PORT || 5000;

const DB_HOST = process.env.DB_HOST || "localhost";
const sequelize = require("./config/database.js");

// Middleware
app.use(cors({ corsOptions }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
// app.use('/assets',express.static(path.join(dirname, "frontend/public/assets")));

// Rate Limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.get("/", (req, res) => {
    res.send("Salut, c'est moi le serveur !");
});
// app.get("*", auth);

app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user.userId);
});
// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
const usersRoute = require("./routes/users.routes");
const articlesRoute = require("./routes/articles.routes");
const commentsRoute = require("./routes/comments.routes");
const relationsRoute = require("./routes/follow.routes");
const { log } = require("console");
app.use("/articles", articlesRoute);
app.use("/users", usersRoute);
app.use("/comments", commentsRoute);
app.use("/relations", relationsRoute);

// Start Server

sequelize.sync({ alter: true }).then(() => {
    console.log("Drop and re-sync db.");
    app.listen(port, () => {
        console.log(`Example app listening at http://${DB_HOST}:${port}`);
    });
});
