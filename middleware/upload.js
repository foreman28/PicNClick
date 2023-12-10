const multer = require('multer');
const moment = require('moment');
const slugify = require('slugify');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  filename(req, file, cb) {
    const data = moment().format("DDMMYYYY-HHmmss_SSS")
    const originalNameWithoutExtension = file.originalname.split('.').slice(0, -1).join('.');
    const readableName = slugify(originalNameWithoutExtension, { lower: true });
    cb(null, `${data}-${readableName}.${file.originalname.split('.').pop()}`);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, file)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

module.exports = multer({
  storage,
  fileFilter,
})