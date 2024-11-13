import "dotenv/config"

export const APP_NAME: string = process.env.APP_NAME || ""
export const APP_PORT: number = parseInt(process.env.APP_PORT || "3000")

export const SUPABASE_URL: string = process.env.SUPABASE_URL || ""
export const SUPABASE_KEY: string = process.env.SUPABASE_KEY || ""


export const IMGUR_CLIENT_ID: string = process.env.IMGUR_CLIENT_ID || ""
export const IMGUR_CLIENT_SECRET: string = process.env.IMGUR_CLIENT_SECRET || ""
export const IMGUR_REFRESH_TOKEN: string = process.env.IMGUR_REFRESH_TOKEN || ""