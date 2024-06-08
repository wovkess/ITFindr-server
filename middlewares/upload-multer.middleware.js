const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${uuid.v4()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
