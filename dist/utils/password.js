"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (raw) => {
    return bcrypt_1.default.hashSync(raw, bcrypt_1.default.genSaltSync(12));
};
exports.hashPassword = hashPassword;
const comparePassword = (raw, hashed) => {
    return bcrypt_1.default.compareSync(raw, hashed);
};
exports.comparePassword = comparePassword;
