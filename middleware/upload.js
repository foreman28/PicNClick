const multer = require('multer');
const moment = require('moment');
const slugify = require('slugify');
const sharp = require('sharp'); // Add sharp for image processing

const storage = multer.memoryStorage(); // Store images in memory for processing

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const processImage = (buffer, filename, cb) => {
  const data = moment().format('DDMMYYYY-HHmmss_SSS');
  const originalNameWithoutExtension = filename.split('.').slice(0, -1).join('.');
  const readableName = slugify(originalNameWithoutExtension, { lower: true });
  const newFilename = `${data}-${readableName}.jpg`; // Change the extension to jpg

  sharp(buffer)
  .resize({ width: 932, height: 420, fit: 'cover' }) // Adjust dimensions as needed
  .toFormat('jpeg') // Convert to JPEG format
  .jpeg({ quality: 80 }) // Adjust the quality as needed
  .toFile(`uploads/${newFilename}`, (err, info) => {
    if (err) {
      return cb(err);
    }
    cb(null, newFilename);
  });
};

module.exports = {upload,processImage};

// Example usage in your route/controller
// app.post('/upload', (req, res) => {
//   processImage(req.file.buffer, req.file.originalname, (err, filename) => {
//     if (err) {
//       return res.status(500).send('Error processing image');
//     }
//     res.send(`Image uploaded and processed: ${filename}`);
//   });
// });
