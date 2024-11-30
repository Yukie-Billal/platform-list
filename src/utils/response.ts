import { Response } from "express"

type StatusObject = {
   [x: number]: string
}

const statusList: StatusObject = {
   '200': "ok",
   '400': 'bad request',
   '401': 'unauthorize',
   '403': 'forbidden',
   '404': 'not found',
   '500': 'internal server error',
   '504': 'server timeout',
} as const

type StatusCode = keyof typeof statusList

type BaseResponse<T, E> = {
   statusMessage: string
   message: string
   data: T
   errors: E | null
}

class ApiResponse<T, E> {
   declare status: StatusCode
   declare statusMessage: string
   declare message: string
   declare errors: E | null
   declare data: T

   constructor(data: T, message: string, status: StatusCode, errors: E | null = null) {
      this.data = data
      this.message = message
      this.status = status
      this.statusMessage = this.getStatusMessage(status)
      this.errors = errors
   }

   public send(res: Response) {
      res.status(this.status).json(this.getJson())
   }

   private getJson(): BaseResponse<T, E> {
      return {
         statusMessage: this.statusMessage,
         message: this.message,
         data: this.data,
         errors: this.errors
      }
   }

   private getStatusMessage(s: StatusCode): string {
      return statusList[s]
   }

   static success<T>(data: T, message: string = "", status: StatusCode = 200): ApiResponse<T, null> {
      return new ApiResponse(data, message, status)
   }
   static badRequest<E>(errors: E, message: string, status: StatusCode = 400): ApiResponse<null, E> {
      return new ApiResponse(null, message, status, errors)
   }
   static unAuthorized(): ApiResponse<null, null> {
      return new ApiResponse(null, "unauthorized", 401)
   }
   static forbidden(): ApiResponse<null, null> {
      return new ApiResponse(null, "forbidden", 403)
   }
   static notFound<E>(message: string, status: StatusCode = 404, errors: E | null = null): ApiResponse<null, E | null> {
      return new ApiResponse(null, message, status, errors)
   }
   static internalError<E>(message: string, error: E | null = null, status: StatusCode = 500): ApiResponse<null, E> {
      return new ApiResponse(null, message, status, error)
   }
}

export default ApiResponse;