// import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import { PagenationObject } from "../common/pagenationObject";
import User from "../models/user";
import { sequelize } from "../models";
import { v4 } from "uuid";
const bcrypt = require("bcrypt");
// const UserRole = require("../models/userRole");
import { AuthRoleEnum } from "../enums/authEnum";
import { BasicResponseDto } from "../dtos/basicResponseDto";
import { MessageGenric } from "../dtos/genric/messageGenric";
import { StatusCodes } from "http-status-codes";
import { IUserRegisterDto } from "../interfaces/IUser";

import { check, validationResult } from "express-validator";
export const createTestUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let testObj = {
    userId: "givejeong",
    password: "1234",
    name: "테스트 이름",
    tel: "010-0000-",
    email: "givejeong@naver.com",
  };
  const transaction = await sequelize.transaction();
  try {
    let end = Number(req.params.end);
    if (end <= 1 || end > 9999) {
      throw Error("1~9999이하로 작성하세요");
    }
    for (let i = 1; i <= end; i++) {
      const userId = testObj.userId + i;
      const password = testObj.password;
      const name = testObj.name + i;
      const tel = testObj.tel + String(i).padStart(4, "0");
      const email = testObj.email;

      const hash = await bcrypt.hash(password, 12);
      const createUser = await User.create(
        {
          userId,
          password: hash,
          uuid: v4(),
          name,
          tel,
          email,
          authRole: AuthRoleEnum.BASIC,
        },
        { transaction }
      );
    }
    await transaction.commit();
    return res
      .status(200)
      .send(
        new BasicResponseDto<MessageGenric>(
          StatusCodes.CREATED,
          new MessageGenric("테스트 계정을 생성완료했습니다.")
        )
      );
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
// var patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check("userId", "아이디를 입력하세요").not().isEmpty().run(req);
  await check("password", "비밀번호를 6자 이상 입력하세요")
    .isLength({
      min: 6,
    })
    .run(req);
  await check("name", "이름을 입력하세요").not().isEmpty().run(req);
  await check("tel")
    .custom((value) => {
      const patternPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      if (!patternPhone.test(value)) {
        throw new Error("전화번호 확인해 주세요");
      }
      return true;
    })
    .run(req);
  check("email", "이메일을 다시 한번 확인해 주세요").isEmail().run(req);

  const transaction = await sequelize.transaction();
  try {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      throw res.status(400).json({ errors: errors.array() });
    }

    const { userId, password, name, tel, email }: IUserRegisterDto = req.body;
    const isUserExist = await User.findOne({ where: { userId } });
    if (isUserExist) {
      throw new Error("이미 존재하는 아이디 입니다.");
    }
    const hash = await bcrypt.hash(password, 12);
    const createUser = await User.create(
      {
        userId,
        password: hash,
        name,
        uuid: v4(),
        tel,
        email,
        authRole: AuthRoleEnum.BASIC,
      },
      { transaction }
    );
    await transaction.commit();
    return res
      .status(201)
      .send(
        new BasicResponseDto(
          StatusCodes.CREATED,
          new MessageGenric(createUser.userId)
        )
      );
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const adminId = process.env.ADMIN_ID;
    const isUserExist = await User.findOne({ where: { userId: adminId } });
    if (isUserExist) {
      throw new Error("이미 존재하는 아이디 입니다.");
    }
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    const user = await User.create(
      {
        userId: adminId,
        password: hash,
        uuid: v4(),
        name: process.env.ADMIN_NAME,
        tel: process.env.ADMIN_TEL,
        email: process.env.ADMIN_EMAIL,
        authRole: AuthRoleEnum.ADMIN,
      },
      { transaction }
    );
    await transaction.commit();
    return res
      .status(200)
      .send(
        new BasicResponseDto(
          StatusCodes.CREATED,
          new MessageGenric(user.userId)
        )
      );
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

export const validateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const isUserExist = await User.findOne({ where: { userId } });
    if (isUserExist) {
      throw new Error("이미 존재하는 아이디 입니다.");
    } else {
      return res.status(200).send({ message: "이용 가능한 아이디 입니다" });
    }
  } catch (err) {
    next(err);
  }
};

// export const userLogin = async (req, res, next) => {
//     try {
//         const {userId, password} = req.body;
//         const user = await User.findOne({
//             attributes: ['id', 'userId', 'password', 'name'],
//             where: {userId},
//         });
//         if (user === null) {
//             throw new Error('존재하지 않는 아이디 입니다. 다시 확인해 주세요');
//         }
//         let passwordValidate = await bcrypt.compare(password, user.password);
//         if (!passwordValidate) {
//             throw new Error(
//                 '아이디와 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.'
//             );
//         }
//         console.log(user);
//         const token = jwt.sign(
//             {
//                 id: user.id,
//                 name: user.name,
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: '1h',
//             }
//         );
//         res.status(200).send({token: token});
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// };

// export const userList = async (req, res, next) => {
//     try {
//         let page = req.query.page || 1;
//         let limit = 10;
//         let offset = 0 + (page - 1) * limit;

//         const userList = await User.findAndCountAll({
//             raw: true,
//             offset: offset,
//             limit: limit,
//             order: [['id', 'DESC']],
//             distinct: true,
//             attributes: ['id', 'userId', 'name', 'tel', 'email', 'role', 'createdAt'],
//             where: {role: UserRole.NORMAL},
//         });
//         console.log(userList);
//         let pageObj = new PagenationObject(
//             page,
//             userList.count,
//             limit,
//             userList.rows,
//             'user'
//         );

//         return res.status(200).send(pageObj);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// };
