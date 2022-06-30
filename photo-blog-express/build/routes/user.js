"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { verifyToken } from "./middleware";
const express = require("express");
const user_1 = require("../controllers/user");
const middleware_1 = require("./middleware");
const router = express.Router();
//테스트 유저 생성
router.get("/test", user_1.createTestUser);
//유저 생성
router.post("/", user_1.createUser);
//유저 마이페이지
router.get("/info", middleware_1.verifyToken, user_1.userInfo);
//아이디 중복 체크
router.get("/find", user_1.validateUserId);
router.post("/login", user_1.userLogin);
router.delete("/user/:uuid", user_1.deleteUser);
exports.default = router;
