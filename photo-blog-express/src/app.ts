import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import userRouter from "../routes/user";

import boardRouter from "../routes/board";

const { sequelize } = require("../models");

dotenv.config();
const app = express();

const port = process.env.PORT;
app.use(
  "/",
  express.static(
    path.join(
      __dirname,
      "..",
      path.sep,
      "..",
      path.sep,
      "..",
      path.sep,
      "uploads"
    )
  )
);
app.use(morgan("dev"));
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결 성공");
  })
  .catch(() => {
    console.log("에러");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/board", boardRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    return res.status(400).send({ msg: err.message });
  }
);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
