import * as moment from "moment";

export class PagenationGenric {
  currentPage: number;
  totalCount: number;
  limit: number;
  userList: Array<any>;

  constructor(
    currentPage: number,
    totalCount: number,
    limit: number,
    array: Array<any>,
    type: string
  ) {
    this.currentPage = Number(currentPage);
    this.totalCount = totalCount;
    this.limit = limit;
    if (type === "user") {
      this.userList = array.map((user) => ({
        id: user.uuid,
        userId: user.userId,
        name: user.name,
        tel: user.tel,
        email: user.email,
        authRole: user.authRole,
        createdAt: moment(user.createdAt).format("YYYY년 MM월 DD일"),
      }));
    } else if (type === "board") {
      this.userList = array.map((board) => ({
        id: board.id,
        title: board.title,
        subTitle: board.subTitle,
        createdAt: moment(board.createdAt).format("YYYY년 MM월 DD일"),
      }));
    } else {
      this.userList = array;
    }
  }
}
