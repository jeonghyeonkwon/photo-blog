import {sequelize} from '../models';
import Board from '../models/board';
import HashTag from '../models/hashtag';
import Photo from '../models/photo';

export const createBoard = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        console.log(req.files);

        const {tags, title, subTitle, content} = req.body;

        //게시판 작성
        const board = await Board.create(
            {
                title,
                subTitle,
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
        res.status(201).send('ok');
    } catch (err) {
        await transaction.rollback();
        console.error(err);
        next('게시글 작성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
};
