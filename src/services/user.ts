import crypto from "node:crypto"
import { users } from "../models/user"
import { Request, Response } from "express"

export const getUsers = async (req: Request, res: Response) => {
   res.json(users)
}

export const createUser = async (req: Request, res: Response) => {
   const { username, password } = req.body

   const user = {
      username,
      password,
      id: crypto.randomBytes(12).toString("hex").trim()
   }
   users.push(user)
   res.json(user)
}