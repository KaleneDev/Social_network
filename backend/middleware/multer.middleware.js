const { log } = require("console");
const multer = require("multer");
const path = require("path");
const filename = path.resolve();
const dirname = path.dirname(filename);

const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        const url = req.originalUrl;
        const urlParts = url.split('/')
        const firstWord = urlParts[1].toLowerCase();
        console.log(firstWord);
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, path.join(dirname, "frontend/public/upload/articles"));
        } else {
            return cb(
                new Error("Seuls les formats PNG, JPG et JPEG sont acceptés.")
            );
        }
    },
    filename: (req, file, cb) => {
        //format name of file
        const originalName = file.originalname;
        const extension = originalName.split(".").pop();
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}.${extension}`;
        cb(null, fileName);
    },
    // limit poids fichier
});

const storageUser = multer.diskStorage({
    // taille du fichier
    destination: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, path.join(dirname, "frontend/public/upload/users"));
        } else {
            return cb(
                new Error("Seuls les formats PNG, JPG et JPEG sont acceptés.")
            );
        }
    },
    filename: (req, file, cb) => {
        //format name of file
        const originalName = file.originalname;
        const extension = originalName.split(".").pop();
        const fileName = `${req.body.username}.${extension}`;
        cb(null, fileName);
    },
});

const uploadUser = multer({ storage: storageUser }).single("file");
const uploadFile = multer({ storage: storageFile }).array("file", 4);

module.exports = { uploadFile, uploadUser };
