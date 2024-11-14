import { Router } from "express"
import * as platformService from "../services/platform"
import { authMiddleware } from "../middleware/auth"

const platformRouter: Router = Router()

platformRouter.get("/", platformService.getPlatforms)
platformRouter.get("/:id", platformService.getPlatformById)
platformRouter.post("/", authMiddleware(), platformService.createPlatform)
platformRouter.put("/", authMiddleware(), platformService.updatePlatform)
platformRouter.patch("/", authMiddleware(), (req, res) => {res.json({})})

export default platformRouter;