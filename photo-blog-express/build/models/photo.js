"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Photo extends sequelize_1.Model {
}
Photo.init({
    originalFileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
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
    modelName: "Photo",
    tableName: "photos",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
});
const associate = (db) => {
    db.Photo.belongsTo(db.Board, { foreignKey: "board_pk", targetKey: "uuid" });
};
exports.associate = associate;
exports.default = Photo;
