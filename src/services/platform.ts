import { Request, Response } from "express"
import * as yup from "yup"
import * as platformRepository from "../repository/platform"

export const getPlatforms = async (req: Request, res: Response) => {
   try {
      const { data: platforms, error } = await platformRepository.getPlatforms()
      if (error) throw error
      res.json(platforms)
   } catch (error) {
      res.status(500).json({ "message": (error as Error).message })
   }
}

export const getPlatformById = async (req: Request, res: Response) => {
   try {
      const { data: platform, error } = await platformRepository.getPlatformById(req.params.id)
      if (error) throw error
      res.json(platform)
   } catch (error: any) {
      res.status(500).json({ "message": error.message })
   }
}

export const createPlatform = async (req: Request, res: Response) => {
   try {
      const platform = await yup.object().shape({

      }).validate(req.body, { abortEarly: false })
      res.json({ "message": "Berhasil menambah platform" })
   } catch (error: any) {
      res.status(500).json({ "message": error.message })
   }
}

export const updatePlatform = async (req: Request, res: Response) => {
   try {
      const { id } = await yup.object().shape({
         id: yup.string().required()
      }).validate(req.body, { abortEarly: false })

      res.json({ id })
   } catch (error: any) {
      res.status(500).json({ "message": error.message })
   }
}