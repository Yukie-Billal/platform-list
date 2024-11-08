import crypto from "node:crypto"
import express, { Request, Response } from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.APP_PORT || 3000

let users = [
   {
      "id": crypto.randomBytes(10).toString("hex").trim(),
      "username": "admin",
      "password": "admin"
   }
]

app.get("/", async (req: Request, res: Response) => {
   res.json({ "app": "API" })
})

app.get("/users", async (req: Request, res: Response) => {
   res.json(users)
})

app.post("/users", async (req: Request, res: Response) => {
   const { username, password } = req.body

   const user = {
      username,
      password,
      id: crypto.randomBytes(10).toString("hex").trim()
   }
   users.push(user)
   res.json(user)
})

app.post("/auth", async (req: Request, res: Response) => {
   const { username, password } = req.body

   const user = users.find(u => u.username == username && u.password == password)
   if (!user) {
      res.status(400).json({ "message": "wrong username or password" })
      return
   }
   res.json({ "message": "Berhasil login" })
})

app.listen(port, () => console.log("server running on 0:" + port))