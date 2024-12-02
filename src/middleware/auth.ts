import { NextFunction, Request, Response } from "express"
import * as authRepository from "../repository/auth"
import ApiResponse from "../utils/response"

export const authMiddleware = () => {
   return async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.headers.authorization?.split(" ")[1]
      if (!accessToken) {
         return ApiResponse.unAuthorized().send(res)
      }
      const { data, error } = await authRepository.getUserBytoken(accessToken)

      if (error || !data.user) {
         return ApiResponse.unAuthorized().send(res)
      }

      req.user = data.user
      next()
   }
}