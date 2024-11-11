import bcrypt from "bcrypt"

export const hashPassword = (raw: string): string => {
   return bcrypt.hashSync(raw, bcrypt.genSaltSync(12))
}

export const comparePassword = (raw: string, hashed: string): boolean => {
   return bcrypt.compareSync(raw, hashed)
}