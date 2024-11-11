import { Request, Response } from "express"
import * as userRepository from "../repository/user"
import { hashPassword } from "../utils/password"
import { TablesInsert } from "../types/database.types"

export const getUsers = async (req: Request, res: Response): Promise<void> => {
   const { data: users, error } = await userRepository.getUsers()
   if (error) {
      res.status(500).json({ "message": error })
      return
   }
   res.json({
      users: users
   })
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
   const { email, name, password, username }: TablesInsert<"users"> = req.body

   const { data: emailUsed, error } = await userRepository.getUserByEmail(email)
   if (emailUsed || error) {
      res.status(400).json({ "message": "Email already registered" })
      return
   }

   const user: TablesInsert<'users'> = {
      name: name,
      username: username,
      email: email,
      password: hashPassword(password)
   }
   res.json(user)
} 