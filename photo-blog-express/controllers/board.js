import {sequelize} from '../models';
import Board from '../models/board';
import HashTag from '../models/hashtag';
import Photo from '../models/photo';
import {PagenationObject} from '../common/pagenationObject';
import {QueryTypes} from 'sequelize';

export const createTestBoard = async (req, res, next) => {
    for (let i = 1; i <= 38; i++) {
        const transaction = await sequelize.transaction();
        try {
            const testObj = {
                title: '테스트 게시글',
                tags: ['태그1-', '태그2-'],
                content: '내용',
                subTitle: '서브 타이틀',
                file: 'KakaoTalk_Photo_2022-02-06-20-39-261649778592871.png',
                filePath:
                    '/Users/kwonjeonghyeon/WebstormProjects/uploads/KakaoTalk_Photo_2022-02-06-20-39-261649778592871.png',
            };

            const {tags, title, subTitle, content, file, filePath} = testObj;

            const testTages = [tags[0] + i, tags[1] + i];
            const testTitle = title + i;
            const testSubTitle = subTitle + i;
            const testContent = content + i;

            //게시판 작성
            const board = await Board.create(
                {
                    title: testTitle,
                    subTitle: testSubTitle,
                    content: testContent,
                },
                {transaction}
            );

            for (const tag of testTages) {
                const isExistTag = await HashTag.findOne(
                    {where: {title: tag + i}},
                    {transaction}
                );

                if (isExistTag) {
                    board.addHashTag(isExistTag);
                } else {
                    const hashTag = await HashTag.create(
                        {title: tag + i},
                        {transaction}
                    );

                    await board.addHashTag(hashTag, {transaction});
                }
            }

            const photo = await Photo.create(
                {
                    originalFileName: file,
                    filePath: filePath,
                },
                {transaction}
            );
            await board.addPhoto(photo, {transaction});

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            console.error(err);
            next('게시글 작성 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }
    res.status(201).send({meg: '게시글 작성을 완료했습니다.'});
};
export const createBoard = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        console.log(req.body);

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

                await board.addHashTag(hashTag, {transaction});
            }
        }

        for (const img of req.files) {
            const photo = await Photo.create(
                {
                    originalFileName: img.filename,
                    filePath: img.path,
                },
                {transaction}
            );
            await board.addPhoto(photo, {transaction});
        }

        await transaction.commit();
        res.status(201).send({meg: '게시글 작성을 완료했습니다.'});
    } catch (err) {
        await transaction.rollback();
        console.error(err);
        next('게시글 작성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
};

export const mangeBoard = async (req, res, next) => {
    try {
        let page = req.query.page || 1;
        let limit = 10;
        let offset = 0 + (page - 1) * limit;

        const boardList = await Board.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            distinct: true,
            attributes: ['id', 'title', 'subTitle', 'createdAt'],
        });

        console.log(boardList);
        let boardObj = new PagenationObject(
            page,
            boardList.count,
            limit,
            boardList.rows,
            'board'
        );
        return res.status(200).send(boardObj);
    } catch (err) {
        console.error(err);
        next('게시글 리스트 호출 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
};
export const boardList = async (req, res, next) => {
    try {
        let page = req.query.page || 1;
        let limit = 10;
        let offset = 0 + (page - 1) * limit;
        const boardList = await Board.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            distinct: true,
            attributes: ['id', 'title', 'subTitle'],
            order: [['id', 'DESC']],
        });

        const boardIdList = boardList.rows.map((board) => board.id);

        const photoList = await Photo.findAll({
            raw: true,
            where: {
                board_pk: boardIdList,
            },
            order: [['id', 'DESC']],
            attributes: ['id', 'filePath', 'board_pk'],
        });

        let photoMap = new Map();
        photoList.forEach((photo) => {
            const data = photoMap.get(photo.board_pk) || [];
            photoMap.set(photo.board_pk, [...data, photo.filePath]);
        });
        console.log('map', photoMap);
        const hashTagList = await sequelize.query(
            'SELECT bht.board_id, tags.id, tags.title FROM boardHashTag AS bht JOIN hashtags AS tags ON tags.id = bht.hash_tag_id WHERE bht.board_id IN (:boardIdList)',
            {
                replacements: {boardIdList: boardIdList},
                type: QueryTypes.SELECT,
            }
        );

        let hashMap = new Map();
        hashTagList.forEach((hashTag) => {
            const data = hashMap.get(hashTag.board_id) || [];
            hashMap.set(hashTag.board_id, [...data, hashTag.title]);
        });
        console.log('hashMap', hashMap);

        boardList.rows.forEach((board) => {
            let photoList = photoMap.get(board.id) || [];
            board.photoList = photoList;
            let hashTagList = hashMap.get(board.id) || [];
            board.hashTagList = hashTagList;
        });
        console.log(boardList);
        const pageObject = new PagenationObject(
            page,
            boardList.count,
            limit,
            boardList.rows,
            'index'
        );
        res.status(200).send(pageObject);
    } catch (err) {
        console.error(err);
        next('게시글 리스트 호출 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
};
