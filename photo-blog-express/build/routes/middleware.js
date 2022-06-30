"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = payload;
        return next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send({
                msg: "다시 로그인 해주세요",
            });
        }
        else {
            return res.status(400).send({
                msg: "잘못된 요청 입니다 다시 시도해 주세요",
            });
        }
    }
};
exports.verifyToken = verifyToken;
