const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
}).any();

module.exports = upload;
