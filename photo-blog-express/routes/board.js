const {Router} = require('express');
const {sequelize} = require('../models');
const Board = require('../models/board');
const HashTag = require('../models/hashtag');
const Photo = require('../models/photo');

import path from 'path';
import multer from 'multer';
import fs from 'fs';
import {
    boardList,
    createBoard,
    createTestBoard,
    mangeBoard,
} from '../controllers/board';

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
            done(
                null,
                path.basename(encodeURIComponent(file.originalname), ext) +
                Date.now() +
                ext
            );
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});
//사진 리스트
router.get('/', boardList);

//관리자 게시글 리스트
router.get('/manage', mangeBoard);

//게시글 테스트
router.get('/test', createTestBoard);

//게시글 작성
router.post('/upload', upload.array('image', 3), createBoard);

module.exports = router;
