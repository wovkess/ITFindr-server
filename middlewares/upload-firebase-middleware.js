const admin = require('firebase-admin');
const serviceAccount = require('../keys/firebaseServiceKey.json');
const fs = require('fs');
const path = require('path'); // Импорт модуля path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'forestemedia-90a84.appspot.com'
});

const bucket = admin.storage().bucket();

const uploadFileToFirebaseStorage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const file = req.file;
    const filePathInStorage = `profile-photo/${file.filename}`;

    const fileUpload = bucket.file(filePathInStorage);

    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    blobStream.on('error', (err) => {
        console.log(err);
        res.status(500).send('Error uploading file');
    });

    blobStream.on('finish', () => {
        req.firebasePublicName = `/${file.filename}`;
        next();
    });

    fs.readFile(file.path, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading file');
        } else {
            blobStream.end(data);
        }
    });
};

module.exports = uploadFileToFirebaseStorage;
