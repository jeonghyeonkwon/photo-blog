import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";

class HashTag extends Model {
  public readonly id!: number;
  public title!: string;
  public uuid!: string;
}
HashTag.init(
  {
    title: {
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
    modelName: "HashTag",
    tableName: "hash_tags",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);
export const associate = (db: dbType) => {
  db.HashTag.belongsToMany(db.Board, {
    through: "boardHashTag",
    sourceKey: "uuid",
    foreignKey: "hash_tag_pk",
  });
};
export default HashTag;
// const Sequelize = require('sequelize');

// module.exports = class HashTag extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         title: { type: Sequelize.STRING, allowNull: false },
//       },
//       {
//         sequelize,
//         timestamps: true,
//         underscored: true,
//         modelName: 'HashTag',
//         tableName: 'hashtags',
//         paranoid: true,
//         charset: 'utf8',
//         collate: 'utf8_general_ci',
//       }
//     );
//   }

//   static associate(db) {
//     db.HashTag.belongsToMany(db.Board, { through: 'boardHashTag' });
//   }
// };
