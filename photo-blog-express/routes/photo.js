const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const router = Router();
console.log(__dirname, '..', path.sep, '..', path.sep, 'uploads');
const filePath = path.join(
  __dirname,
  '..',
  path.sep,
  '..',
  path.sep,
  '..',
  path.sep,
  'uploads'
);

try {
  fs.readdirSync(filePath);
} catch (error) {
  console.error('폴더 생성');
  fs.mkdirSync(filePath);
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, filePath + path.sep);
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload', upload.single('image'), (req, res) => {
  res.send('ok');
});

module.exports = router;
