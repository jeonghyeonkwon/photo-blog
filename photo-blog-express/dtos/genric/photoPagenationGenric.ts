import {
  IBoardListDto,
  IBoardRowDto,
  IHashTagRowDto,
} from "../../interfaces/IBoard";

export class PhotoPagenationGenric {
  currentPage: number;
  totalCount: number;
  limit: number;
  list: Array<IBoardListDto>;
  constructor(
    currentPage: number,
    totalCount: number,
    limit: number,
    list: Array<any>
  ) {
    this.currentPage = currentPage;
    this.totalCount = totalCount;
    this.limit = limit;

    this.list = [];
    this.list = list.map((dto) => {
      const { uuid, title, subTitle, HashTags, Photos } = dto as IBoardRowDto;
      const hashTitleList = HashTags.map((obj: IHashTagRowDto) => obj.title);
      console.log(
        JSON.stringify(
          {
            uuid: uuid,
            title: title,
            subTitle: subTitle,
            filePath: Photos[0].filePath,
            hashTags: hashTitleList,
          },
          null,
          2
        )
      );
      const result: IBoardListDto = {
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
