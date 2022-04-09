import jwt from 'jsonwebtoken';

const User = require('../models/user');
const bcrypt = require('bcrypt');
const UserRole = require('../models/userRole');
export const createUser = async (req, res) => {
    try {
        const {userId, password, name, tel, email} = req.body;
        const isUserExist = await User.findOne({where: {userId}});
        if (isUserExist) {
            return res.status(400).send({message: '이미 존재하는 아이디 입니다.'});
        }
        const hash = await bcrypt.hash(password, 12);
        const createUser = await User.create({
            userId,
            password: hash,
            name,
            tel,
            email,
            role: UserRole.NORMAIL,
        });

        return res.status(200).send('회원 가입을 완료했습니다!');
    } catch (error) {
        console.error(error);
    }
};

export const createAdmin = async (req, res) => {
    try {
        const adminId = process.env.ADMIN_ID;
        const isUserExist = await User.findOne({where: {userId: adminId}});
        if (isUserExist) {
            return res.status(400).send({message: '이미 존재하는 아이디 입니다.'});
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
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
    }
};

export const validateUserId = async (req, res) => {
    try {
        const {userId} = req.body;
        const isUserExist = await User.findOne({where: {userId}});
        if (isUserExist) {
            return res.status(400).send({message: '이미 존재하는 아이디 입니다.'});
        } else {
            return res.status(200).send({message: '이용 가능한 아이디 입니다'});
        }
    } catch (error) {
        console.error(error);
    }
};

export const userLogin = async (req, res) => {
    const {userId, password} = req.body;
    const user = await User.findOne({
        attributes: ['userId', 'password', 'name'],
        where: {userId},
    });
    if (user === null) {
        return res
            .status(400)
            .send({message: '존재하지 않는 아이디 입니다. 다시 확인해 주세요'});
    }
    let passwordValidate = await bcrypt.compare(password, user.password);
    if (!passwordValidate) {
        return res.status(400).send({
            message: '아이디와 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.',
        });
    }
    const token = jwt.sign(
        {
            userId: user.userId,
            name: user.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
    res.status(200).send({token: token});
};
