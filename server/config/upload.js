const multer = require('multer');
const path = require('path');

// Storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/profile');  // upload folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // unique filename
    }
});

// File type validation
function fileFilter(req, file, cb) {
    const allowed = /jpeg|jpg|png/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);

    if (ext && mime) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG and PNG images allowed"), false);
    }
}

// Upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },   // ✅ 10MB LIMIT (WORKS)
    fileFilter: fileFilter
});

module.exports = upload;
