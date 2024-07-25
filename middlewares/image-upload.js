const upload = require('../middlewares/multer');
const configuredMulterMiddleware = upload.single("image");
module.exports = configuredMulterMiddleware;