export interface IBoardCreateDto {
  title: string;
  subTitle: string;
  content: string;
  tags: string[];
}

interface IPhotoDto {
  filePath: string;
}
export interface IBoardListDto {
  uuid: string;
  title: string;
  subTitle: string;
  hashTags: string[];
  filePath: string;
}
export interface IHashTagRowDto {
  title: string;
}
export interface IBoardRowDto {
  uuid: string;
  title: string;
  subTitle: string;
  HashTags: Array<IHashTagRowDto>;
  Photos: Array<IPhotoDto>;
}
