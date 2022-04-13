import moment from 'moment';

export class PagenationObject {
    constructor(currentPage, totalCount, limit, array, type) {
        this.currentPage = parseInt(currentPage);
        this.totalCount = totalCount;
        this.limit = limit;
        if (type === 'user') {
            this.data = array.map((user) => ({
                id: user.id,
                userId: user.userId,
                name: user.name,
                tel: user.tel,
                email: user.email,
                role: user.role,
                createdAt: moment(user.createdAt).format('YYYY년 MM월 DD일'),
            }));
        } else if (type === 'board') {
            this.data = array.map((board) => ({
                id: board.id,
                title: board.title,
                subTitle: board.subTitle,
                createdAt: moment(board.createdAt).format('YYYY년 MM월 DD일'),
            }));
        } else {
            this.data = array;
        }
    }
}
