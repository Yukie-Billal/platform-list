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

class ApiResponse {
   declare status: StatusCode
   declare statusMessage: string
   declare message: string
   declare errors: any
   declare data: any

   constructor(data: any, message: string, status: StatusCode) {
      this.data = data
      this.message = message
      this.status = status
      this.statusMessage = this.getStatusMessage(status)
   }

   public send(res: Response) {
      res.status(this.status).json({
         statusMessage: this.statusMessage,
         message: this.message,
         data: this.data,
         errors: this.errors
      })
   }

   private getStatusMessage(s: StatusCode): string {
      return statusList[s]
   }

   private setError(errors: any) {
      this.errors = errors
      return this
   }

   static success(data: any, message: string="", status: StatusCode=200) {
      return new ApiResponse(data, message, status)
   }
   static badRequest(errors: any, message: string, status: StatusCode=400) {
      return new ApiResponse(null, message, status).setError(errors)
   }
   static unAuthorized() {
      return new ApiResponse(null, "unauthorized", 401)
   }
   static forbidden() {
      return new ApiResponse(null, "forbidden", 403)
   }
   static notFound(message: string, status: StatusCode=404) {
      return new ApiResponse(null, message, status)
   }
   static internalError(message: string, error:any="", status: StatusCode=500) {
      return new ApiResponse(null, message, status).setError(error)
   }
}

export default ApiResponse;