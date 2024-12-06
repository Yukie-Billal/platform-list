"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = __importDefault(require("./response"));
const yup_1 = require("yup");
const errorHandler = (e, res) => {
    if (e instanceof yup_1.ValidationError) {
        const errors = [];
        if (e.inner) {
            e.inner.map(err => {
                errors.push({
                    field: err.path || "",
                    message: err.message
                });
            });
        }
        else {
            response_1.default.badRequest(e.errors, e.message).send(res);
            return;
        }
        response_1.default.badRequest(errors, e.message, 400).send(res);
        return;
    }
    console.log(e);
    response_1.default.internalError(e.message).send(res);
};
exports.errorHandler = errorHandler;
