import jwt from 'jsonwebtoken';

import {PagenationObject} from '../common/pagenationObject';

const User = require('../models/user');
const bcrypt = require('bcrypt');
const UserRole = require('../models/userRole');

export const createTestUser = async (req, res, next) => {
    let testObj = {
        userId: '테스트 아이디',
        password: '1234',
        name: '테스트 이름',
        tel: '010-1234-4321',
        email: 'givejeong@naver.com',
    };
    try {
        for (let i = 1; i <= 64; i++) {
            const userId = testObj.userId + i;
            const password = testObj.password;
            const name = testObj.name + i;
            const tel = testObj.tel;
            const email = testObj.email;

            const hash = await bcrypt.hash(password, 12);
            const createUser = await User.create({
                userId,
                password: hash,
                name,
                tel,
                email,
                role: UserRole.NORMAL,
            });
        }

        return res.status(200).send('회원 가입을 완료했습니다!');
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const {userId, password, name, tel, em1ail} = req.body;
        const isUserExist = await User.findOne({where: {userId}});
        if (isUserExist) {
            throw new Error('이미 존재하는 아이디 입니다.');
        }
        const hash = await bcrypt.hash(password, 12);
        const createUser = await User.create({
            userId,
            password: hash,
            name,
            tel,
            email,
            role: UserRole.NORMAL,
        });

        return res.status(200).send('회원 가입을 완료했습니다!');
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const createAdmin = async (req, res, next) => {
    try {
        const adminId = process.env.ADMIN_ID;
        const isUserExist = await User.findOne({where: {userId: adminId}});
        if (isUserExist) {
            throw new Error('이미 존재하는 아이디 입니다.');
        }
        const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
        const user = await User.create({
            userId: adminId,
            password: hash,
            name: '관리자',
            tel: '010-1234-4321',
            email: 'givejeong2468@gmail.com',
            role: UserRole.ADMIN,
        });
        return res.status(200).send({message: '관리자 계정을 생성했습니다.'});
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const validateUserId = async (req, res, next) => {
    try {
        const {userId} = req.body;
        const isUserExist = await User.findOne({where: {userId}});
        if (isUserExist) {
            throw new Error('이미 존재하는 아이디 입니다.');
        } else {
            return res.status(200).send({message: '이용 가능한 아이디 입니다'});
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const {userId, password} = req.body;
        const user = await User.findOne({
            attributes: ['id', 'userId', 'password', 'name'],
            where: {userId},
        });
        if (user === null) {
            throw new Error('존재하지 않는 아이디 입니다. 다시 확인해 주세요');
        }
        let passwordValidate = await bcrypt.compare(password, user.password);
        if (!passwordValidate) {
            throw new Error(
                '아이디와 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.'
            );
        }
        console.log(user);
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );
        res.status(200).send({token: token});
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const userList = async (req, res, next) => {
    try {
        let page = req.query.page || 1;
        let limit = 10;
        let offset = 0 + (page - 1) * limit;

        const userList = await User.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            order: [['id', 'DESC']],
            distinct: true,
            attributes: ['id', 'userId', 'name', 'tel', 'email', 'role', 'createdAt'],
            where: {role: UserRole.NORMAL},
        });
        console.log(userList);
        let pageObj = new PagenationObject(
            page,
            userList.count,
            limit,
            userList.rows,
            'user'
        );

        return res.status(200).send(pageObj);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
