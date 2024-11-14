import { Router } from "express"
import { createUser, getUsers, uploadProfile } from "../services/user"
import { authMiddleware } from "../middleware/auth"

const userRouter: Router = Router()

userRouter.get("/", getUsers)
userRouter.post("/", createUser)
userRouter.patch("/profile", authMiddleware(), uploadProfile)

export default userRouter;