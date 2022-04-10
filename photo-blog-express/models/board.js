const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {type: Sequelize.STRING, allowNull: false},
                subTitle: {type: Sequelize.STRING, allowNull: false},
                content: {type: Sequelize.STRING, allowNull: false},
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'Board',
                tableName: 'boards',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db) {
        db.Board.belongsTo(db.User, {foreignKey: 'user_pk', targetKey: 'id'});
        db.Board.hasMany(db.Photo, {foreignKey: 'photo_pk', sourceKey: 'id'});
        db.Board.belongsToMany(db.HashTag, {through: 'boardHashTag'});
    }
};
