const Sequelize = require('sequelize');

module.exports = class HashTag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { type: Sequelize.STRING, allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'HashTag',
        tableName: 'hashtags',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.HashTag.belongsToMany(db.Photo, { through: 'photoHashTag' });
  }
};
