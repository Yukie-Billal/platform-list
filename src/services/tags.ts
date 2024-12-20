import { Request, Response } from "express";
import * as tagsRepository from "../repository/tags";
import ApiResponse from "../utils/response";
import { Tables } from "../types/database.types";
import { createTagsSchemaValidation, deleteTagsSchemaValidation, updateTagsSchemaValidation } from "../schemas/tags";
import { errorHandler } from "../utils/errorHandler";

export const getTags = async (req: Request, res: Response) => {
   try {
      const { data: tags, error } = await tagsRepository.getTags()
      if (error) throw error 
      ApiResponse.success<Array<Tables<"tags">>>(tags, "success").send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}

export const getTagsById = async (req: Request, res: Response) => {
   try {
      const id: number = parseInt(req.params.id)

      if (isNaN(id)) return ApiResponse.badRequest({ id: "must be number" }, "invalid type id").send(res)

      const { data: tag } = await tagsRepository.getTagById(id)
      if (!tag) return ApiResponse.notFound("tag not found").send(res)

      ApiResponse.success(tag, "retreived").send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}

export const createTags = async (req: Request, res: Response) => {
   try {
      const { name, tag_id } = await createTagsSchemaValidation.validate(req.body)

      if (tag_id) {
         const { data: tag } = await tagsRepository.getTagById(tag_id)
         if (!tag) return ApiResponse.notFound("tag not found").send(res)
      }

      const { data: tag, error } = await tagsRepository.createTags({ name, tag_id })
      if (error) throw error

      ApiResponse.success(tag, "create success").send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}

export const updateTags = async (req: Request, res: Response) => {
   try {
      const { id, name, tag_id } = await updateTagsSchemaValidation.validate(req.body)

      const { data: tag } = await tagsRepository.getTagById(id)
      if (!tag) return ApiResponse.notFound("tag not found").send(res)

      if (tag_id) {
         const { data: checkTag } = await tagsRepository.getTagById(tag_id)
         if (!checkTag) return ApiResponse.notFound("tag not found").send(res)
      }

      const { error } = await tagsRepository.updateTags({ name, tag_id }, id)
      if (error) throw error

      ApiResponse.success({ id }, "update success").send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}

export const deleteTags = async (req: Request, res: Response) => {
   try {
      const { id } = await deleteTagsSchemaValidation.validate(req.body)

      const { data: tag } = await tagsRepository.getTagById(id)
      if (!tag) return ApiResponse.notFound("tag not found").send(res)

      const { error } = await tagsRepository.deleteTags(id)
      if (error) throw error

      ApiResponse.success({id}, "delete success").send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}

export const getMainTags = async (_: Request, res: Response) => {
   try {
      const {data: tags, error} = await tagsRepository.getMainTags()
      if (error) throw error

      ApiResponse.success(tags).send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}

export const getTagsByTagId = async (req: Request, res: Response) => {
   try {
      const tagId: number = parseInt(req.params.id)

      if (isNaN(tagId)) return ApiResponse.badRequest({ id: "must be number" }, "invalid type id").send(res)

      const {data: tags, error} = await tagsRepository.getTagsByMainTagId(tagId)
      if (error) throw error

      ApiResponse.success(tags).send(res)
   } catch (error) {
      errorHandler(error, res)
   }
}