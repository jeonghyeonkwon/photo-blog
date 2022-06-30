"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { verifyToken } from "./middleware";
const express = require("express");
const user_1 = require("../controllers/user");
const board_1 = require("../controllers/board");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const filePath = path.join(__dirname, "..", path.sep, "..", path.sep, "..", path.sep, "uploads");
try {
    fs.readdirSync(filePath);
}
catch (error) {
    console.error("폴더 생성");
    fs.mkdirSync(filePath);
}
const storage = multer.diskStorage({
    destination(req, file, done) {
        done(null, filePath + path.sep);
    },
    filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(encodeURIComponent(file.originalname), ext) +
            "-" +
            Date.now() +
            ext);
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});
const router = express.Router();
// //관리자 생성
router.get("/", user_1.createAdmin);
// //유저 리스트
router.get("/user", user_1.userList);
router.delete("/user/:uuid", user_1.resignUser);
// //관리자 게시글 리스트
router.get("/board", board_1.mangeBoard);
//게시글 작성
router.post("/board", upload.array("image", 3), board_1.createBoard);
exports.default = router;
