import crypto from "node:crypto"
import express, { Request, Response } from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.APP_PORT || 3000

app.get("/", async (req: Request, res: Response) => {
   res.json({ "app": "EXPRESS TYPESCRIPT API" })
})

import userRouter from "./routers/user"
import authRouter from "./routers/auth"

app.use("/auth", authRouter)
app.use("/users", userRouter)

app.listen(port, () => console.log("server running on 0:" + port))