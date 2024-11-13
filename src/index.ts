import express, { Request, Response } from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req: Request, res: Response) => {
   res.json({ "app": APP_NAME })
})

import { APP_NAME, APP_PORT } from "./config/_constant"

import userRouter from "./routers/user"
import authRouter from "./routers/auth"
import platformRouter from "./routers/platform"

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/platforms", platformRouter)

app.listen(APP_PORT, () => console.log("server running on 0:" + APP_PORT))