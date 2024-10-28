const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, getFiles} = require('../controllers/fileController');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, './uploads');
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('profileImage'), uploadFile);

router.get('/files', getFiles);
router.get('/', (req, res) => {
    res.render('homepage'); // Render the homepage.ejs file
});

module.exports = router;