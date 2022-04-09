import {sequelize} from "../models";
import Board from "../models/board";
import HashTag from "../models/hashtag";
import Photo from "../models/photo";

export const createBoard = async (req, res) => {
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
}