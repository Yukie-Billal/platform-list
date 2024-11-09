import { Request, Response, Router } from "express"
import * as userRepository from "../repository/user"

const authRouter: Router = Router()

authRouter.post("/", async (req: Request, res: Response) => {
   const { username, password } = req.body

   const user = userRepository.getUserByUsernamePassword(username, password)
   if (!user) {
      res.status(400).json({ "message": "wrong username or password" })
      return
   }
   res.json({ "message": "Berhasil login" })
})

export default authRouter;