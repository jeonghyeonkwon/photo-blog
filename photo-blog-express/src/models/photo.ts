import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";

class Photo extends Model {
  public readonly id!: number;
  public originalFileName!: string;
  public filePath!: string;
  public uuid!: string;
  public readonly createdAt!: Date;
  public updatedAt!: Date;
}
Photo.init(
  {
    originalFileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
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
    modelName: "Photo",
    tableName: "photos",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);
export const associate = (db: dbType) => {
  db.Photo.belongsTo(db.Board, { foreignKey: "board_pk", targetKey: "uuid" });
};
export default Photo;
