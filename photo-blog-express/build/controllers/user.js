"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.userInfo = exports.resignUser = exports.deleteUser = exports.userList = exports.userLogin = exports.validateUserId = exports.createAdmin = exports.createUser = exports.createTestUser = void 0;
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const models_1 = require("../models");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const authEnum_1 = require("../enums/authEnum");
const basicResponseDto_1 = require("../dtos/basicResponseDto");
const messageGenric_1 = require("../dtos/genric/messageGenric");
const http_status_codes_1 = require("http-status-codes");
const express_validator_1 = require("express-validator");
const pagenationGenric_1 = require("../dtos/genric/pagenationGenric");
const Sequelize = require("sequelize");
const createTestUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let testObj = {
        userId: "givejeong",
        password: "1234",
        name: "테스트 이름",
        tel: "010-0000-",
        email: "givejeong@naver.com",
    };
    const transaction = yield models_1.sequelize.transaction();
    try {
        let end = Number(req.query.end) || 2;
        if (end <= 1 || end > 9999) {
            throw Error("1~9999이하로 작성하세요");
        }
        for (let i = 1; i <= end; i++) {
            const userId = testObj.userId + i;
            const password = testObj.password;
            const name = testObj.name + i;
            const tel = testObj.tel + String(i).padStart(4, "0");
            const email = testObj.email;
            const hash = yield bcrypt.hash(password, 12);
            const createUser = yield user_1.default.create({
                userId,
                password: hash,
                uuid: (0, uuid_1.v4)(),
                name,
                tel,
                email,
                authRole: authEnum_1.AuthRoleEnum.BASIC,
            }, { transaction });
        }
        yield transaction.commit();
        return res
            .status(201)
            .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.CREATED, new messageGenric_1.MessageGenric("테스트 계정을 생성 완료 했습니다.")));
    }
    catch (err) {
        yield transaction.rollback();
        next(err);
    }
});
exports.createTestUser = createTestUser;
// var patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("userId", "아이디를 입력하세요").not().isEmpty().run(req);
    yield (0, express_validator_1.check)("password", "비밀번호를 6자 이상 입력하세요")
        .isLength({
        min: 6,
    })
        .run(req);
    yield (0, express_validator_1.check)("name", "이름을 입력하세요").not().isEmpty().run(req);
    yield (0, express_validator_1.check)("tel")
        .custom((value) => {
        const patternPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (!patternPhone.test(value)) {
            throw new Error("전화번호 확인해 주세요");
        }
        return true;
    })
        .run(req);
    (0, express_validator_1.check)("email", "이메일을 다시 한번 확인해 주세요").isEmail().run(req);
    const transaction = yield models_1.sequelize.transaction();
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            throw res.status(400).json({ errors: errors.array() });
        }
        const { userId, password, name, tel, email } = req.body;
        const isUserExist = yield user_1.default.findOne({ where: { userId } });
        if (isUserExist) {
            throw new Error("이미 존재하는 아이디 입니다.");
        }
        const hash = yield bcrypt.hash(password, 12);
        const createUser = yield user_1.default.create({
            userId,
            password: hash,
            name,
            uuid: (0, uuid_1.v4)(),
            tel,
            email,
            authRole: authEnum_1.AuthRoleEnum.BASIC,
        }, { transaction });
        yield transaction.commit();
        return res.status(201).send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.CREATED, {
            userId: createUser.userId,
        }));
    }
    catch (err) {
        yield transaction.rollback();
        next(err);
    }
});
exports.createUser = createUser;
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield models_1.sequelize.transaction();
    try {
        const adminId = process.env.ADMIN_ID;
        const isUserExist = yield user_1.default.findOne({ where: { userId: adminId } });
        if (isUserExist) {
            throw new Error("이미 존재하는 아이디 입니다.");
        }
        const hash = yield bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
        const user = yield user_1.default.create({
            userId: adminId,
            password: hash,
            uuid: (0, uuid_1.v4)(),
            name: process.env.ADMIN_NAME,
            tel: process.env.ADMIN_TEL,
            email: process.env.ADMIN_EMAIL,
            authRole: authEnum_1.AuthRoleEnum.ADMIN,
        }, { transaction });
        yield transaction.commit();
        return res
            .status(201)
            .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.CREATED, { userId: user.userId }));
    }
    catch (err) {
        yield transaction.rollback();
        next(err);
    }
});
exports.createAdmin = createAdmin;
const validateUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (userId === "") {
            throw new Error("아이디를 입력하세요.");
        }
        const isUserExist = yield user_1.default.findOne({ where: { userId } });
        if (isUserExist) {
            throw new Error("이미 존재하는 아이디 입니다.");
        }
        else {
            return res
                .status(200)
                .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.OK, new messageGenric_1.MessageGenric("이용 가능한 아이디 입니다")));
        }
    }
    catch (err) {
        next(err);
    }
});
exports.validateUserId = validateUserId;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, password } = req.body;
        const user = yield user_1.default.findOne({
            attributes: ["uuid", "userId", "password", "name"],
            where: { userId },
        });
        if (!user) {
            throw new Error("존재하지 않는 아이디 입니다. 다시 확인해 주세요");
        }
        let passwordValidate = yield bcrypt.compare(password, user.password);
        if (!passwordValidate) {
            throw new Error("아이디와 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
        }
        console.log(user);
        const token = jwt.sign({
            uuid: user.uuid,
        }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res
            .status(200)
            .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.OK, { token: token }));
    }
    catch (err) {
        next(err);
    }
});
exports.userLogin = userLogin;
const userList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let name = req.query.name || "";
        let offset = 0 + (page - 1) * limit;
        let Op = Sequelize.Op;
        const userList = yield user_1.default.findAndCountAll({
            raw: true,
            offset: offset,
            limit: limit,
            order: [["createdAt", "DESC"]],
            distinct: true,
            attributes: [
                "uuid",
                "userId",
                "name",
                "tel",
                "email",
                "authRole",
                "createdAt",
            ],
            where: {
                authRole: authEnum_1.AuthRoleEnum.BASIC,
                name: {
                    [Op.like]: `%${name}%`,
                },
            },
        });
        console.log(userList);
        let pageObj = new pagenationGenric_1.PagenationGenric(page, userList.count, limit, userList.rows, "user");
        return res
            .status(200)
            .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.OK, pageObj));
    }
    catch (err) {
        next(err);
    }
});
exports.userList = userList;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = req.decoded;
    const uuid = req.params.uuid;
    try {
        if (decoded.uuid !== uuid) {
            throw new Error("잘못된 요청 입니다. 확인 후 다시 시도해 주세요");
        }
        yield user_1.default.destroy({
            where: { uuid: uuid },
        });
        res
            .status(204)
            .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.NO_CONTENT, new messageGenric_1.MessageGenric("탈퇴를 완료했습니다.")));
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
const resignUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = req.decoded;
    const uuid = req.params.uuid;
    try {
        const admin = yield user_1.default.findOne({ where: { uuid: decoded.uuid } });
        if (!admin || admin.authRole !== authEnum_1.AuthRoleEnum.ADMIN) {
            throw new Error("관리자 정보가 일치하지 않습니다. 다시 시도해 주세요");
        }
        yield user_1.default.destroy({
            where: { uuid: uuid },
        });
        res
            .status(204)
            .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.NO_CONTENT, new messageGenric_1.MessageGenric("해당 유저를 탈퇴 완료 했습니다.")));
    }
    catch (err) {
        next(err);
    }
});
exports.resignUser = resignUser;
const userInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = req.decoded;
        const uuid = decoded.uuid;
        const user = yield user_1.default.findOne({
            where: { uuid },
            attributes: ["uuid", "userId", "name", "tel", "email"],
        });
        if (!user) {
            throw new Error("해당 유저는 없습니다");
        }
        return res
            .status(200)
            .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.OK, user));
    }
    catch (err) {
        next(err);
    }
});
exports.userInfo = userInfo;
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = req.decoded;
        res.status(200).send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.OK, {
            uuid: decoded.id,
        }));
    }
    catch (err) {
        next(err);
    }
});
exports.validateToken = validateToken;
