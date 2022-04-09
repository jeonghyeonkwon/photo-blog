const {Router} = require('express');
const {sequelize} = require('../models');
const Board = require('../models/board');
const HashTag = require('../models/hashtag');
const Photo = require('../models/photo');

import path from 'path';
import multer from 'multer';
import fs from 'fs';
import {createBoard} from '../controllers/board';

const router = Router();

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
    limits: {fileSize: 5 * 1024 * 1024},
});

//게시글 작성
router.post('/upload', upload.array('image', 3), createBoard);

module.exports = router;
