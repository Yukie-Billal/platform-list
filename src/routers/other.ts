import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";

const otherRouter = Router()


type bodyRequestSpace = {
   latitude1: number,
   latitude2: number,
   longitude1: number,
   longitude2: number,
   return_distance_type: string
}

otherRouter.post("/space", (req: Request, res: Response) => {
   let { latitude1, latitude2, longitude1, longitude2, return_distance_type = "km" }: bodyRequestSpace = req.body

   const R = 6371.0;
   latitude1 = latitude1 * (Math.PI / 180)
   longitude1 = longitude1 * (Math.PI / 180)
   latitude2 = latitude2 * (Math.PI / 180)
   longitude2 = longitude2 * (Math.PI / 180)

   const dlat = latitude2 - latitude1
   const dlon = longitude2 - longitude1

   const a = Math.sin(dlat / 2) ** 2 + Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(dlon / 2) ** 2
   let result = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

   if (return_distance_type == "meter") result *= 1000

   res.json({
      "message": "success",
      "data": {
         "result": result,
         "type": return_distance_type,
      }
   })
})

const baseUrl = "https://haddock-flexible-mouse.ngrok-free.app"
otherRouter.get("/smart-lamp/state", authMiddleware(), async (req: Request, res: Response) => {
   const response = await fetch(baseUrl + "/state")
   res.send(await response.text())
})
otherRouter.get("/smart-lamp/on", authMiddleware(), async (req: Request, res: Response) => {
   const response = await fetch(baseUrl + "/on")
   res.send(await response.text())
})
otherRouter.get("/smart-lamp/off", authMiddleware(), async (req: Request, res: Response) => {
   const response = await fetch(baseUrl + "/off")
   res.send(await response.text())
})

export default otherRouter;