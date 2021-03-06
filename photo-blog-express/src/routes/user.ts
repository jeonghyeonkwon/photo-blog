// import { verifyToken } from "./middleware";
import * as express from "express";

import {
  createUser,
  validateUserId,
  userLogin,
  createTestUser,
  deleteUser,
  userInfo,
} from "../controllers/user";
import { verifyToken } from "./middleware";
const router = express.Router();
//테스트 유저 생성
router.get("/test", createTestUser);

//유저 생성
router.post("/", createUser);

//유저 마이페이지
router.get("/info", verifyToken, userInfo);

//아이디 중복 체크
router.get("/find", validateUserId);

router.post("/login", userLogin);

router.delete("/user/:uuid", deleteUser);

export default router;
