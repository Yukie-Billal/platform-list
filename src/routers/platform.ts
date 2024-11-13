import { Router } from "express"
import * as platformService from "../services/platform"

const platformRouter: Router = Router()

platformRouter.get("/", platformService.getPlatforms)
platformRouter.get("/:id", platformService.getPlatformById)
platformRouter.post("/", platformService.createPlatform)
platformRouter.put("/", platformService.updatePlatform)

export default platformRouter;