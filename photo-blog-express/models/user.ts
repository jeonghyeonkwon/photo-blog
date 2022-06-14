import { DataTypes, Model } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";
import { AuthRoleEnum } from "../enums/authEnum";
class User extends Model {
  public readonly id!: number;
  public readonly uuid!: string;
  public readonly userId!: string;
  public readonly password!: string;
  public readonly name!: string;
  public readonly tel!: string;
  public readonly email!: string;
  public readonly authRole!: AuthRoleEnum;
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

export const associate = (db: dbType) => {};
export default User;

// module.exports = class User extends Sequelize.Model {
//     static init(sequelize) {
//         return super.init(
//             {
//                 userId: {
//                     type: Sequelize.STRING,
//                     allowNull: false,
//                     unicode: true,
//                 },
//                 password: {
//                     type: Sequelize.STRING,
//                     allowNull: false,
//                 },
//                 name: {
//                     type: Sequelize.STRING,
//                     allowNull: false,
//                 },
//                 tel: {
//                     type: Sequelize.STRING,
//                     allowNull: false,
//                 },
//                 email: {
//                     type: Sequelize.STRING,
//                     validate: {
//                         isEmail: true,
//                     },
//                 },
//                 role: {
//                     type: Sequelize.STRING,
//                 },
//             },
//             {
//                 sequelize,
//                 timestamps: true,
//                 underscored: true,
//                 modelName: 'User',
//                 tableName: 'users',
//                 paranoid: true,
//                 charset: 'utf8',
//                 collate: 'utf8_general_ci',
//             }
//         );
//     }

//     static associate(db) {
//         db.User.hasMany(db.Board, {foreignKey: 'user_pk', sourceKey: 'id'});
//     }
// };
