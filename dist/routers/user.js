"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../services/user");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_1.getUsers);
userRouter.post("/", user_1.createUser);
exports.default = userRouter;
