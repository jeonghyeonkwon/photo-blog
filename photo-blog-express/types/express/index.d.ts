import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  export interface Request {
    decoded?: JwtPayload;
    files?: any;
  }
}
