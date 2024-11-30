import { Request, Response } from "express";
import * as tagsRepository from "../repository/tags";
import ApiResponse from "../utils/response";
import { Tables, TablesInsert } from "../types/database.types";

export const getTags = async (req: Request, res: Response) => {
   try {
      const { data: tags, error } = await tagsRepository.getTags()
      if (error) throw error
      ApiResponse.success<Array<Tables<"tags">>>(tags, "success").send(res)
   } catch (error) {
      ApiResponse.internalError((error as Error).message).send(res)
   }
}

export const createTags = async (req: Request, res: Response) => {
   try {
      const { name, tag_id }: TablesInsert<"tags"> = req.body
   } catch (error) {
      ApiResponse.internalError((error as Error).message).send(res)
   }
}