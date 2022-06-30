import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import { AuthRoleEnum } from "../enums/authEnum";
class User extends Model {
  public readonly id!: number;
  public readonly uuid!: string;
  public readonly userId!: string;
  public password!: string;
  public readonly name!: string;
  public tel!: string;
  public email!: string;
  public readonly authRole!: AuthRoleEnum;
  public readonly createdAt!: Date;
  public updatedAt!: Date;
}
User.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "User",
    tableName: "users",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.User.hasMany(db.Board, { foreignKey: "user_pk", sourceKey: "uuid" });
};
export default User;
