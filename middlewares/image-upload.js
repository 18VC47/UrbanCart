// const multer = require("multer");
// const cloudinary = require('cloudinary');
// const uuid = require('uuid').v4;
// const os = require('os');
// const path = require('path');
// const mkdirp = require('mkdirp');

// Get the temporary directory provided by Vercel
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

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY,
// });

const upload = require('../middlewares/multer');

const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;

// router.post('/upload', upload.single('image'), function (req, res) {
// cloudinary.uploader.upload(req.file.path, function (err, result){
//   if(err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: "Error"
//     })
//   }

//   res.status(200).json({
//     success: true,
//     message:"Uploaded!",
//     data: result
//   })
// })
// });

// module.exports = router;
