"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const env = process.env.NODE_ENV ||
    "development";
const { database, username, password } = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(database, username, password, config_1.default[env]);
exports.sequelize = sequelize;
exports.default = sequelize;
