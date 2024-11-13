import { IMGUR_CLIENT_ID, IMGUR_CLIENT_SECRET, IMGUR_REFRESH_TOKEN } from "../config/_constant"

type UploadImageReturnVal = {
   data: string | null,
   error: string | null
}

const returnVal = (data: string | null, error: string | null = null): UploadImageReturnVal => ({
   data,
   error
})

const getAccessToken = async (): Promise<string> => {
   const form = new FormData()
   form.append("refresh_token", IMGUR_REFRESH_TOKEN)
   form.append("client_id", IMGUR_CLIENT_ID)
   form.append("client_secret", IMGUR_CLIENT_SECRET)
   form.append("grant_type", "refresh_token")

   const headers = new Headers()
   headers.append("Content-Type", "multipart/form-data")

   const response = await fetch("https://api.imgur.com/oauth2/token", {
      method: "POST",
      body: form,
      headers: headers
   })
   const responseBody = await response.json()
   return responseBody.access_token
}

export const uploadImage = async (file: string): Promise<UploadImageReturnVal> => {
   if (Buffer.from(file, "base64").toString("base64") !== file) {
      return returnVal(null, "Must be a base64")
   }

   const form = new FormData()
   form.append("image", file)
   form.append("type", "base64")

   const response = await fetch("https://api.imgur.com/3/upload", {
      method: 'POST',
      body: form,
      headers: {
         "Authorization": "Client-ID " + IMGUR_CLIENT_ID
      }
   })

   if (!response.ok) {
      console.log(response.status, response.statusText)
      return returnVal(null, "Failed to upload image")
   }

   const link: string = (await response.json()).data.link
   return returnVal(link, null)
}

export const deleteImage = async (fileUrl: string): Promise<boolean> => {
   const headers = new Headers()
   headers.append("Authorization", "Bearer " + getAccessToken())

   const response = await fetch("https://api.imgur.com/3/image/" + fileUrl.slice(20).split(".")[0], {
      method: "DELETE",
      headers: headers
   })

   if (!response.ok) return false
   return true
}