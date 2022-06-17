import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
class Board extends Model {
  public readonly id!: number;
  public uuid!: string;
  public title!: string;
  public subTitle!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public updatedAt!: Date;
}
Board.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "Board",
    tableName: "boards",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);
export const associate = (db: dbType) => {
  db.Board.belongsTo(db.User, { foreignKey: "user_pk", targetKey: "uuid" });
  db.Board.belongsToMany(db.HashTag, {
    through: "boardHashTag",
    foreignKey: "board_pk",
    sourceKey: "uuid",
  });
};
export default Board;
//     static associate(db) {
//         db.Board.belongsTo(db.User, {foreignKey: 'user_pk', targetKey: 'id'});
//         db.Board.hasMany(db.Photo, {foreignKey: 'board_pk', sourceKey: 'id'});
//         db.Board.belongsToMany(db.HashTag, {through: 'boardHashTag'});
//     }
// module.exports = class Board extends Sequelize.Model {
//     static init(sequelize) {
//         return super.init(
//             {
//                 title: {type: Sequelize.STRING, allowNull: false},
//                 subTitle: {type: Sequelize.STRING, allowNull: false},
//                 content: {type: Sequelize.STRING, allowNull: false},
//             },
//             {
//                 sequelize,
//                 timestamps: true,
//                 underscored: true,
//                 modelName: 'Board',
//                 tableName: 'boards',
//                 paranoid: true,
//                 charset: 'utf8',
//                 collate: 'utf8_general_ci',
//             }
//         );
//     }

// };
