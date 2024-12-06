import { Request, Response } from "express"
import * as platformRepository from "../repository/platform"
import ApiResponse from "../utils/response"
import { errorHandler } from "../utils/errorHandler"
import { createPlatfromSchemaValidation, updatePlatfromSchemaValidation } from "../schemas/platforms"

export const getPlatforms = async (req: Request, res: Response) => {
   try {
      const { data: platforms, error } = await platformRepository.getPlatforms()
      if (error) throw error
      ApiResponse.success(platforms).send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}

export const getPlatformById = async (req: Request, res: Response) => {
   try {
      const id: string = req.params.id

      const { data: platform, error } = await platformRepository.getPlatformById(id)
      if (error) throw error

      ApiResponse.success(platform).send(res)
   } catch (error: any) {
      errorHandler(error, res)
   }
}

export const createPlatform = async (req: Request, res: Response) => {
   try {
      const { name, main_feature, type, description, active, mobile_app, web_url, design_rating, service_rating } = await createPlatfromSchemaValidation.validate(req.body, { abortEarly: false })

      const { data: platform, error } = await platformRepository.createPLatform({ name, main_feature, type, description, active, mobile_app, web_url, design_rating, service_rating })
      if (error) throw error

      ApiResponse.success(platform, "create success").send(res)
   } catch (error: any) {
      errorHandler(error, res)
   }
}

export const updatePlatform = async (req: Request, res: Response) => {
   try {
      const { id, active, description, design_rating, main_feature, mobile_app, name, service_rating, type, web_url } = await updatePlatfromSchemaValidation.validate(req.body, { abortEarly: false })

      const { data: platform, error } = await platformRepository.getPlatformById(id)
      if (!platform || error) {
         return ApiResponse.notFound("platform not found").send(res)
      }

      const { error: updateError } = await platformRepository.updatePlatform({ active, description, design_rating, main_feature, mobile_app, name, service_rating, type, web_url }, id)
      if (updateError) throw updateError

      ApiResponse.success({id}, "update success").send(res)
   } catch (error: any) {
      errorHandler(error, res)
   }
}

export const deletePlatform = async (req: Request, res: Response) => {
   try {
      const id: string = req.body.id

      const { data: platform, error: notFoundError } = await platformRepository.getPlatformById(id)
      console.log(platform, notFoundError)
      if (notFoundError || !platform) {
         ApiResponse.notFound("Platform not found").send(res)
         return;
      }

      const { error: deleteError } = await platformRepository.deletePlatform(id)
      if (deleteError) throw deleteError

      ApiResponse.success({ id }).send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}