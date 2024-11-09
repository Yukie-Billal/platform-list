import { Router } from "express";
import { createUser, getUsers } from "../services/user";

const userRouter: Router = Router()

userRouter.get("/", getUsers)
userRouter.post("/", createUser)

export default userRouter;