"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
exports.users = [
    {
        "id": node_crypto_1.default.randomBytes(12).toString("hex").trim(),
        "username": "admin",
        "email": "admin@gmail.com",
        "password": "$2b$12$m.BdoJ0SaFJH0xsyxNdKo.wZKnFh9W5Z6R.LwZ3fCUMd8gdn.Avua",
        "profile": ""
    }
];
