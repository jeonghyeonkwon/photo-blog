import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]!.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.decoded! = payload;

    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        msg: "다시 로그인 해주세요",
      });
    } else {
      return res.status(400).send({
        msg: "잘못된 요청 입니다 다시 시도해 주세요",
      });
    }
  }
};
