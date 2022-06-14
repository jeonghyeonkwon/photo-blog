// const Sequelize = require('sequelize');
// const User = require('./user');
// const Board = require('./board');
// const HashTag = require('./hashtag');
// const Photo = require('./photo');
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config')[env];
// const db = {};
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.User = User;
// db.Board = Board;
// db.HashTag = HashTag;
// db.Photo = Photo;
// User.init(sequelize);
// Board.init(sequelize);
// HashTag.init(sequelize);
// Photo.init(sequelize);

// User.associate(db);
// Board.associate(db);
// HashTag.associate(db);
// Photo.associate(db);

// module.exports = db;
import User, { associate as associateUser } from "./user";
export * from "./sequelize";
const db = { User };
export type dbType = typeof db;

associateUser(db);
