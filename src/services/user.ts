import { Request, Response } from "express"
import * as yup from "yup"
import * as userRepository from "../repository/user"
import * as authRepository from "../repository/auth"
import { hashPassword } from "../utils/password"
import { TablesInsert } from "../types/database.types"
import { uploadImage } from "../utils/imgur"

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

   if (emailUsed) {
      res.status(400).json({ "message": "Email already registered" })
      return
   }

   const user: TablesInsert<'users'> = {
      name: name,
      username: username,
      email: email,
      password: hashPassword(password)
   }

   const { data: signUpUser, error: errorSignUp } = await authRepository.signUp(email, password)
   if (errorSignUp) {
      res.status(400).json({ "message": "Sign up failed", error: errorSignUp })
      return
   }
   console.log(signUpUser);

   const { data, error: errorInsert } = await userRepository.createUser(user)

   if (errorInsert) {
      res.status(400).json({ "message": "Failed create new user", error: errorInsert })
      return
   }

   res.json({ "message": "berhasil membuat user" })
}

export const uploadProfile = async (req: Request, res: Response): Promise<void> => {
   try {
      const { imageProfile, userId } = await yup.object().shape({
         userId: yup.string().required().nonNullable(),
         imageProfile: yup.string().required().nonNullable()
      }).validate(req.body, { abortEarly: false })

      if (Buffer.from(imageProfile, "base64").toString("base64") !== imageProfile) {
         res.status(400).json({ "message": "harus berupa base64" })
         return
      }

      const { data: user } = await userRepository.getUserById(userId)
      if (!user) {
         res.status(404).json({ "message": "User not found" })
         return
      }

      const profileLink = "https://i.imgur.com/0Ngl2xs.jpeg"
      const errorUpload = null
      // const {data: profileLink, error: errorUpload} = await uploadImage(imageProfile)
      if (errorUpload) {
         res.status(400).json({ "message": "Failed to upload profile picture" })
         return
      }

      const { data, error, status, statusText } = await userRepository.updateUser({ profile: profileLink, updated_at: new Date().toUTCString() }, userId)

      if (error) {
         res.status(status).json({ "message": "Failed to upload profile picture", error: error.message })
         return
      }

      res.json({ "message": "Profile picture uploaded successfuly", "data": { "link": profileLink } })
   } catch (error: any) {
      if (error instanceof yup.ValidationError) {
         res.status(400).json({ "message": "error", "_errors": error.errors })
         return
      }
      res.status(500).json({ "message": error.message })
   }
}