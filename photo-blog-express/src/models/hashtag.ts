import { BelongsToManyAddAssociationsMixin, DataTypes, Model } from "sequelize";
import Board from "./board";
import { dbType } from "./index";
import { sequelize } from "./sequelize";

class HashTag extends Model {
  public readonly id!: number;
  public title!: string;
  public uuid!: string;
  public readonly createdAt!: Date;
  public updatedAt!: Date;

  public addBoards!: BelongsToManyAddAssociationsMixin<Board, string>;
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
    tableName: "hashtags",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);
export const associate = (db: dbType) => {
  db.HashTag.belongsToMany(db.Board, {
    through: "boardHashTag",
    foreignKey: "hashtag_pk",
    sourceKey: "uuid",
  });
};
export default HashTag;
