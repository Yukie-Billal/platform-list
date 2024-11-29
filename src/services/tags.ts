import { Request, Response } from "express";
import * as tagsRepository from "../repository/tags";

export const getTags = async (req: Request, res: Response) => {
   try {
      const { data: tags, error } = await tagsRepository.getTags()
      if (error) throw error
      res.json(tags)
   } catch (error) {
      res.status(500).json({ "message": (error as Error).message })
   }
}