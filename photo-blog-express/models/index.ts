import User, { associate as associateUser } from "./user";
import Board, { associate as associateBoard } from "./board";
import HashTag, { associate as associateHashTag } from "./hashtag";
import Photo, { associate as associatePhoto } from "./photo";
export * from "./sequelize";
const db = { User, Board, HashTag, Photo };
export type dbType = typeof db;

associateUser(db);
associateBoard(db);
associatePhoto(db);
associateHashTag(db);
