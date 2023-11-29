const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  filename(req, file, cb) {
    const data = moment().format("DDMMYYYY-HHmmss_SSS")
    cb(null, `${data}-${file.originalname}`)
  }
})

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