const multer = require("multer");
const path = require("path");
const filename = path.resolve();
const dirname = path.dirname(filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(dirname, "frontend/public/assets"));
    },
    filename: (req, file, cb) => {
        //format name of file
        const originalName = file.originalname;
        const extension = originalName.split(".").pop();
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}.${extension}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload.array("file", 4);
