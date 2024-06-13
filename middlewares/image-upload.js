// const multer = require('multer');
// const uuid = require('uuid').v4;
// const os = require('os');
// const path = require('path');
// const mkdirp = require('mkdirp');

// // Get the temporary directory provided by Vercel
// const tempDir = os.tmpdir();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       // Use the temporary directory for storing files
//       const uploadPath = path.join(tempDir, 'product-data/images');
//       // Ensure the directory exists
//       mkdirp.sync(uploadPath);
//       cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//       cb(null, uuid() + '-' + file.originalname);
//     }
//   })
// });

// const configuredMulterMiddleware = upload.single('image');

// module.exports = configuredMulterMiddleware;

const multer = require('multer');
const uuid = require('uuid').v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: 'product-data/images',
    filename: function(req, file, cb) {
      cb(null, uuid() + '-' + file.originalname);
    }
  })
});

const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;