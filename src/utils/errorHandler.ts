import { PostgrestError } from "@supabase/supabase-js"
import ApiResponse from "./response"
import { Response } from "express"
import { ValidationError } from "yup"
import { HttpBadRequest, HttpNotFound } from "./errorClass"

type ErrorValidationObject = {
   field: string,
   message: string
}

export const errorHandler = (e: unknown, res: Response): void => {
   if (e instanceof ValidationError) {
      const errors: ErrorValidationObject[] = []

      if (e.inner) {
         e.inner.map(err => {
            errors.push({
               field: err.path || "",
               message: err.message
            })
         })
      } else {
         ApiResponse.badRequest(e.errors, e.message).send(res)
         return;
      }
      ApiResponse.badRequest(errors, e.message, 400).send(res)
      return;
   }

   console.log(e)

   if (e instanceof HttpNotFound) {
      ApiResponse.notFound(e.message).send(res)
      return;
   }

   if (e instanceof HttpBadRequest) {
      ApiResponse.badRequest(e.errors, e.message).send(res)
      return;
   }
   
   ApiResponse.internalError((e as Error).message).send(res)
}