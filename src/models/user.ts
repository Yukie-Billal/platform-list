import crypto from "node:crypto"

export const users = [
   {
      "id": crypto.randomBytes(12).toString("hex").trim(),
      "username": "admin",
      "password": "admin"
   }
]