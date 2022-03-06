const Sequelize = require('sequelize');

module.exports = class Photo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { type: Sequelize.STRING, allowNull: false },
        content: { type: Sequelize.STRING, allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Photo',
        tableName: 'photos',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Photo.belongsTo(db.User, { foreignKey: 'user_pk', targetKey: 'id' });
    db.Photo.belongsToMany(db.HashTag, { through: 'photoHashTag' });
  }
};
