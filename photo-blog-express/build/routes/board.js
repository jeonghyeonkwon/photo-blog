"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// import // boardList,
// // createBoard,
// // createTestBoard,
// // mangeBoard,
// // boardDetail,
// "../controllers/board";
const board_1 = require("../controllers/board");
const router = express.Router();
// //사진 리스트
router.get("/", board_1.boardList);
// //사진 디테일
router.get("/:id", board_1.boardDetail);
// //게시글 테스트
// router.get("/test", createTestBoard);
exports.default = router;
