// import { verifyToken } from "./middleware";
import * as express from "express";

import {
  createUser,
  createAdmin,
  validateUserId,
  userLogin,
  createTestUser,
  userList,
  deleteUser,
  resignUser,
} from "../controllers/user";

const router = express.Router();
//테스트 유저 생성
router.get("/test", createTestUser);

// //유저 생성
router.post("/", createUser);
// //관리자 생성
router.get("/admin", createAdmin);
// //아이디 중복 체크
router.get("/find", validateUserId);

router.post("/login", userLogin);

router.delete("/user/:uuid", deleteUser);

// //유저 리스트
router.get("/admin/manage", userList);

router.delete("/admin/user/:uuid", resignUser);

export default router;
