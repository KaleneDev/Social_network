const multer = require("multer");
const path = require("path");
const filename = path.resolve();
const dirname = path.dirname(filename);

const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(dirname, "frontend/public/assets/articles"));
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

const uploadFile = multer({ storage: storageFile }).array("file", 4);

const storageUser = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(dirname, "frontend/public/assets/users"));
    },
    filename: (req, file, cb) => {
        //format name of file
        console.log(req.body.username);
        const originalName = file.originalname;
        const extension = originalName.split(".").pop();
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName = `${req.body.username}-${uniqueSuffix}.${extension}`;
        cb(null, fileName);
    },
});

const uploadUser = multer({ storage: storageUser }).single("file");

module.exports = { uploadFile, uploadUser };
// module.exports = uploadUser;
// module.exports = uploadUser.array("image", 4);
