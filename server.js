const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const fs = require('fs');

app.listen(port, () => {
    console.log('Server dang chay cong: ' + port);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    let file = req.file;
    if (!file) {
        var error = new Error('Can chon file!');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

