"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Board extends sequelize_1.Model {
}
Board.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    underscored: true,
    modelName: "Board",
    tableName: "boards",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
});
const associate = (db) => {
    db.Board.belongsTo(db.User, { foreignKey: "user_pk", targetKey: "uuid" });
    db.Board.belongsToMany(db.HashTag, {
        through: "boardHashTag",
        foreignKey: "board_pk",
        sourceKey: "uuid",
    });
    db.Board.hasMany(db.Photo, { foreignKey: "board_pk", sourceKey: "uuid" });
};
exports.associate = associate;
exports.default = Board;
