import * as express from "express";

// import // boardList,
// // createBoard,
// // createTestBoard,
// // mangeBoard,
// // boardDetail,
// "../controllers/board";
import { boardDetail } from "../controllers/board";
const router = express.Router();

// //사진 리스트
// router.get("/", boardList);

// //사진 디테일
router.get("/:id", boardDetail);

// //게시글 테스트
// router.get("/test", createTestBoard);

export default router;
