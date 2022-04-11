import {verifyToken} from './middleware';

const {Router} = require('express');

import {
    createUser,
    createAdmin,
    validateUserId,
    userLogin,
    createTestUser,
    userList,
} from '../controllers/user';

const router = Router();
//테스트 유저 생성
router.get('/test', createTestUser);

//유저 리스트
router.get('/', userList);
//유저 생성
router.post('/', createUser);
//관리자 생성
router.get('/admin', createAdmin);
//아이디 중복 체크
router.get('/find', validateUserId);

router.post('/login', userLogin);

module.exports = router;
