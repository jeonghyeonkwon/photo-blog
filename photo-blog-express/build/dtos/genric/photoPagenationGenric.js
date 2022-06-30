"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoPagenationGenric = void 0;
class PhotoPagenationGenric {
    constructor(currentPage, totalCount, limit, list) {
        this.currentPage = currentPage;
        this.totalCount = totalCount;
        this.limit = limit;
        this.list = [];
        this.list = list.map((dto) => {
            const { uuid, title, subTitle, HashTags, Photos } = dto;
            const hashTitleList = HashTags.map((obj) => obj.title);
            console.log(JSON.stringify({
                uuid: uuid,
                title: title,
                subTitle: subTitle,
                filePath: Photos[0].filePath,
                hashTags: hashTitleList,
            }, null, 2));
            const result = {
                uuid: uuid,
                title: title,
                subTitle: subTitle,
                filePath: Photos[0].filePath,
                hashTags: hashTitleList,
            };
            return result;
        });
    }
}
exports.PhotoPagenationGenric = PhotoPagenationGenric;
