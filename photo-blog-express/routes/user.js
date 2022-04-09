const {Router} = require('express');

import {
    createUser,
    createAdmin,
    validateUserId,
    userLogin,
} from '../controllers/user';

const router = Router();

//유저 생성
router.post('/', createUser);
//관리자 생성
router.get('/admin', createAdmin);
//아이디 중복 체크
router.get('/find', validateUserId);

router.post('/login', userLogin);

module.exports = router;
