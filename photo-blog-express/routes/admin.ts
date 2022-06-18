// import { verifyToken } from "./middleware";
import * as express from "express";

import { userList, resignUser, createAdmin } from "../controllers/user";
import { mangeBoard, createBoard } from "../controllers/board";

import * as path from "path";

import * as multer from "multer";
import * as fs from "fs";
const filePath = path.join(
  __dirname,
  "..",
  path.sep,
  "..",
  path.sep,
  "..",
  path.sep,
  "uploads"
);

try {
  fs.readdirSync(filePath);
} catch (error) {
  console.error("폴더 생성");
  fs.mkdirSync(filePath);
}
const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, filePath + path.sep);
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname);

    done(
      null,
      path.basename(encodeURIComponent(file.originalname), ext) +
        "-" +
        Date.now() +
        ext
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const router = express.Router();
// //관리자 생성
router.get("/", createAdmin);
// //유저 리스트
router.get("/user", userList);

router.delete("/user/:uuid", resignUser);
// //관리자 게시글 리스트
router.get("/board", mangeBoard);
//게시글 작성
router.post("/board", upload.array("image", 3), createBoard);
export default router;
