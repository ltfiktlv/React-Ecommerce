import express from "express";
import path from "path";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploadImages/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const checkFilteType = (file, cb) => {
  const fileTypes = /jpeg|png|jpg/;
  const extentionName = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);
  if (extentionName && mimeType) return cb(null, true);
  cb("Invalid file type.");
};
const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFilteType(file, cb);
  },
});

router.post("/", uploadImage.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});
export default router;
