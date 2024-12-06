import { Router } from "express"
import { authMiddleware } from "../middleware/auth"
import * as tagsService from "../services/tags"

const tagsRouter = Router()

tagsRouter.get("/", authMiddleware(), tagsService.getTags)
tagsRouter.get("/main", authMiddleware(), tagsService.getMainTags)
tagsRouter.get("/:id", authMiddleware(), tagsService.getTagsById)
tagsRouter.get("/:id/tags", authMiddleware(), tagsService.getTagsByTagId)
tagsRouter.post("/", authMiddleware(), tagsService.createTags)
tagsRouter.put("/", authMiddleware(), tagsService.updateTags)
tagsRouter.delete("/", authMiddleware(), tagsService.deleteTags)

export default tagsRouter;