import { Request, Response, Router } from "express"
import * as userRepository from "../repository/user"
import * as authRepository from "../repository/auth"
import { comparePassword } from "../utils/password"
import ApiResponse from "../utils/response"
import { authMiddleware } from "../middleware/auth"

const authRouter: Router = Router()

authRouter.post("/signin", async (req: Request, res: Response) => {
   const { email, password } = req.body
   const { data: authData, error } = await authRepository.signIn(email, password)
   if (error) {
      ApiResponse.badRequest(error, "Invalid credentials").send(res)
      return
   }
   ApiResponse.success({
      user_id: authData.user.id,
      role: authData.user.role,
      access_token: authData.session.access_token,
      refresh_token: authData.session.refresh_token,
   }, "Berhasil login").send(res)
})

authRouter.get("/signout", authMiddleware(), async (req: Request, res: Response) => {
   const { error } = await authRepository.signOut()
   if (error) {
      ApiResponse.internalError(error.message, error).send(res)
   }
   ApiResponse.success(null, "berhasil sign out").send(res)
})

export default authRouter;