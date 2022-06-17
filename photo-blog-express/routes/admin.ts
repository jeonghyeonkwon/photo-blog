// import { verifyToken } from "./middleware";
import * as express from "express";

import { userList, resignUser, createAdmin } from "../controllers/user";

const router = express.Router();
// //관리자 생성
router.get("/", createAdmin);
// //유저 리스트
router.get("/user", userList);

router.delete("/user/:uuid", resignUser);

export default router;
