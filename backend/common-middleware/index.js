const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const mime = require('mime-types');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const mimeType = file.mimetype;
        console.log(mimeType);
        // image / jpeg

        const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/tiff', 'image/svg+xml'];

        if (imageMimeTypes.includes(mimeType)) {
            cb(null, path.join(path.dirname(__dirname), 'uploads/images/'));
        } else {
            cb(null, path.join(path.dirname(__dirname), 'uploads/words'));
        }
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});


exports.isImage = (file) => {
    const mimeType = mime.lookup(file);
    return mimeType && mimeType.startsWith('image/');
};

exports.upload = multer({ storage: storage });

exports.requireSigin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user

        // console.log( req.user ,"common-middleware-41");
    }
    else {

        res.status(400).json({ message: "Authorization required" })
    }
    next()
}

exports.userMiddleware = (req, res, next) => {

    if (req.user.role != "user") {
        return res.status(400).json({ message: "User access denied" });
    }
    next()
}

exports.adminMiddleware = (req, res, next) => {

    if (req.user.role != "quản trị viên") {
        return res.status(400).json({ message: "Admin access denied" });
    }
    next()
}

exports.deleteFile = (fileImage, fileDoc) => {
    // Xác định đường dẫn đầy đủ đến thư mục cần xóa
    const publicFolderImgPath = path.join(path.dirname(__dirname), 'uploads/images/')
    const publicFolderDocPath = path.join(path.dirname(__dirname), 'uploads/words/')

    // Xác định đường dẫn đến tệp cần xóa
    const fileImgPath = path.join(publicFolderImgPath, fileImage);
    const fileDocPath = path.join(publicFolderDocPath, fileDoc);


    // Kiểm tra xem tệp tồn tại không trước khi xóa
    if (fs.existsSync(fileImgPath)) {
        // Xóa tệp
        fs.unlink(fileImgPath, (err) => {
            if (err) {
                console.error('Đã xảy ra lỗi khi xóa tệp:', err);
            } else {
                console.log('Tệp đã được xóa thành công');
            }
        });
    } else {
        console.log('Tệp không tồn tại');
    }

    // Kiểm tra xem tệp tồn tại không trước khi xóa
    if (fs.existsSync(fileDocPath)) {
        // Xóa tệp
        fs.unlink(fileDocPath, (err) => {
            if (err) {
                console.error('Đã xảy ra lỗi khi xóa tệp:', err);
            } else {
                console.log('Tệp đã được xóa thành công');
            }
        });
    } else {
        console.log('Tệp không tồn tại');
    }
}

