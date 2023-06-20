const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: storage });

exports.upload = async (req, res) => {
    // POST an image
    console.log(req.file);

    res.status(201).json({
        message: "File uploaded successfully!!",
    });
};
