import {Router} from "express"
import { authMiddleware } from "../middleware/auth"
import * as tagsService from "../services/tags"

const tagsRouter = Router()

tagsRouter.get("/", authMiddleware(), tagsService.getTags)

export default tagsRouter;