const {Router} = require('express');
const {sequelize} = require('../models');
const Board = require('../models/board');
const HashTag = require('../models/hashtag');
const Photo = require('../models/photo');

const path = require('path');
const multer = require('multer');
const fs = require('fs');

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

router.post('/upload', upload.array('image', 3), async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        console.log(req.files);

        const {tags, title, content} = req.body;
        console.log('tag', tags);
        console.log('title', title);
        console.log('content', content);

        //게시판 작성
        const board = await Board.create(
            {
                title,
                content,
            },
            {transaction}
        );
        for (const tag of tags) {
            const isExistTag = await HashTag.findOne(
                {where: {title: tag}},
                {transaction}
            );
            if (isExistTag) {
                board.addHashTag(isExistTag);
            } else {
                const hashTag = await HashTag.create({title: tag}, {transaction});
                await board.addHashTag(hashTag);
            }
        }
        throw new Error('오류');
        for (const img of req.files) {
            const photo = await Photo.create(
                {
                    originalFileName: img.originalname,
                    filePath: img.path,
                },
                {transaction}
            );
            await board.addPhoto(photo);
        }

        await transaction.commit();
        res.send('ok');
    } catch (err) {
        await transaction.rollback();
        console.error(err);
    }
});

module.exports = router;
