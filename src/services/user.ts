import { Request, Response } from "express"
import * as yup from "yup"
import * as userRepository from "../repository/user"
import * as authRepository from "../repository/auth"
import { hashPassword } from "../utils/password"
import { TablesInsert } from "../types/database.types"
import { uploadImage } from "../utils/imgur"
import ApiResponse from "../utils/response"

export const getUsers = async (req: Request, res: Response): Promise<void> => {
   const { data: users, error } = await userRepository.getUsers()
   if (error) {
      ApiResponse.internalError(error.message).send(res)
      return
   }
   ApiResponse.success({ users }).send(res)
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
   const { email, name, password, username }: TablesInsert<"users"> = req.body

   const { data: emailUsed, error } = await userRepository.getUserByEmail(email)

   if (emailUsed) {
      ApiResponse.badRequest("email", "email already registered").send(res)
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
      ApiResponse.badRequest(errorSignUp, "sign up failed")
      return
   }
   console.log(signUpUser);

   const { data, error: errorInsert } = await userRepository.createUser(user)
   if (errorInsert) {
      ApiResponse.badRequest(errorInsert, "failed craete new user").send(res)
      return
   }

   ApiResponse.success(null, "berhasil membuat user").send(res)
}

export const uploadProfile = async (req: Request, res: Response): Promise<void> => {
   try {
      const { imageProfile, userId } = await yup.object().shape({
         userId: yup.string().required().nonNullable(),
         imageProfile: yup.string().required().nonNullable()
      }).validate(req.body, { abortEarly: false })

      if (Buffer.from(imageProfile, "base64").toString("base64") !== imageProfile) {
         ApiResponse.badRequest("imageProfile", "harus berupa base64").send(res)
         return
      }

      const { data: user } = await userRepository.getUserById(userId)
      if (!user) {
         ApiResponse.notFound("user not found").send(res)
         return
      }

      const profileLink = "https://i.imgur.com/0Ngl2xs.jpeg"
      const errorUpload = null
      // const {data: profileLink, error: errorUpload} = await uploadImage(imageProfile)
      if (errorUpload) {
         ApiResponse.badRequest(null, "Failed to upload profile picture").send(res)
         return
      }

      const { data, error, status, statusText } = await userRepository.updateUser({ profile: profileLink, updated_at: new Date().toUTCString() }, userId)

      if (error) {
         ApiResponse.internalError("failed to update profile picture", error).send(res)
         return
      }

      ApiResponse.success({ link: profileLink }, "profile picture uploaded successfuly").send(res)
   } catch (error: any) {
      if (error instanceof yup.ValidationError) {
         ApiResponse.badRequest(error.errors, "validation error").send(res)
         return
      }
      ApiResponse.internalError(error.message).send(res)
   }
}