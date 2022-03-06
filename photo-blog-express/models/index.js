const Sequelize = require('sequelize');
const User = require('./user');
const Photo = require('./photo');
const HashTag = require('./hashtag');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Photo = Photo;
db.HashTag = HashTag;

User.init(sequelize);
Photo.init(sequelize);
HashTag.init(sequelize);

User.associate(db);
Photo.associate(db);
HashTag.associate(db);
module.exports = db;
