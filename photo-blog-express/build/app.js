"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const user_1 = require("./routes/user");
const admin_1 = require("./routes/admin");
const board_1 = require("./routes/board");
const basicResponseDto_1 = require("./dtos/basicResponseDto");
const http_status_codes_1 = require("http-status-codes");
const { sequelize } = require("./models");
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use("/", express.static(path.join(__dirname, "..", path.sep, "..", path.sep, "..", path.sep, "uploads")));
app.use(morgan("dev"));
app.use(cors());
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
const env = process.env.NODE_ENV ||
    "development";
if (env === "development") {
    const swaggerSpec = YAML.load(path.join(__dirname, "/swagger/swagger.yaml"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
app.use("/user", user_1.default);
app.use("/admin", admin_1.default);
app.use("/board", board_1.default);
app.use((err, req, res, next) => {
    console.error(err);
    return res
        .status(400)
        .send(new basicResponseDto_1.BasicResponseDto(http_status_codes_1.StatusCodes.BAD_REQUEST, err.message));
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
