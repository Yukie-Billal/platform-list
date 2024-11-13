import { Request, Response, Router } from "express"
import * as userRepository from "../repository/user"
import * as authRepository from "../repository/auth"
import { comparePassword } from "../utils/password"

const authRouter: Router = Router()

authRouter.post("/signin", async (req: Request, res: Response) => {
   const { email, password } = req.body

   const { data: userEmail, error: emailError } = await userRepository.getUserByEmail(email)
   if (!userEmail || emailError) {
      res.status(400).json({ "message": "wrong email or password" })
      return
   }
   if (!comparePassword(password, userEmail.password)) {
      res.status(400).json({ "message": "wrong email or password" })
      return
   }

   const { data: authData, error } = await authRepository.signIn(email, password)
   if (error) {
      res.status(400).json({ "message": "Invalid credentials", error: error })
      return
   }
   console.log(authData);

   res.json({ "message": "Berhasil login" })
})

export default authRouter;