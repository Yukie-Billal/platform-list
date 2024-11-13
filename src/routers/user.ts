import { Router } from "express"
import { createUser, getUsers, uploadProfile } from "../services/user"

const userRouter: Router = Router()

userRouter.get("/", getUsers)
userRouter.post("/", createUser)
userRouter.patch("/profile", uploadProfile)

export default userRouter;