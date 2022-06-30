"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagenationGenric = void 0;
const moment = require("moment");
class PagenationGenric {
    constructor(currentPage, totalCount, limit, array, type) {
        this.currentPage = Number(currentPage);
        this.totalCount = totalCount;
        this.limit = limit;
        if (type === "user") {
            this.list = array.map((user) => ({
                id: user.uuid,
                userId: user.userId,
                name: user.name,
                tel: user.tel,
                email: user.email,
                authRole: user.authRole,
                createdAt: moment(user.createdAt).format("YYYY년 MM월 DD일"),
            }));
        }
        else if (type === "board") {
            this.list = array.map((board) => ({
                id: board.uuid,
                title: board.title,
                subTitle: board.subTitle,
                createdAt: moment(board.createdAt).format("YYYY년 MM월 DD일"),
            }));
        }
        else {
            this.list = array;
        }
    }
}
exports.PagenationGenric = PagenationGenric;
