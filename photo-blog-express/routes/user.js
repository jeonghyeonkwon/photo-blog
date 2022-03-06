const {Router} = require('express');
const bcrypt = require('bcrypt');
const UserRole = require('../models/userRole');

User = require('../models/user');
const router = Router();

//관리자 생성
router.get('/admin', async (req, res) => {
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
});
//아이디 중복 체크
router.get('/find', async (req, res) => {
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
});

module.exports = router;
