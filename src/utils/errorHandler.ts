import { PostgrestError } from "@supabase/supabase-js"
import ApiResponse from "./response"
import { Response } from "express"

export const errorHandler = (e: unknown, res: Response): void => {
   console.log(e)
   ApiResponse.internalError((e as Error).message).send(res)
}