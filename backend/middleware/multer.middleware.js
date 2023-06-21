const multer = require("multer");
const path = require("path");
const filename = path.resolve();
const dirname = path.dirname(filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(dirname, "frontend/public/assets"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload.single("file");