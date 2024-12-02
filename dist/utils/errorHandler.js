"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = __importDefault(require("./response"));
const errorHandler = (e, res) => {
    console.log(e);
    response_1.default.internalError(e.message).send(res);
};
exports.errorHandler = errorHandler;
