import { NextFunction, Request, Response } from "express"
import * as authRepository from "../repository/auth"
import ApiResponse from "../utils/response"

export const authMiddleware =  () => {
   return async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.headers.authorization?.split(" ")[1]
      if (!accessToken) {
         ApiResponse.unAuthorized().send(res)
         return
      }
      const {data, error} = await authRepository.getUserBytoken(accessToken)

      if (error || !data.user) {
         ApiResponse.unAuthorized().send(res)
      }

      req.user = data.user
      next()
   }
}