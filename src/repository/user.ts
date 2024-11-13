import supabase from "../config/supabase"
import { TablesInsert, TablesUpdate } from "../types/database.types"

export const getUsers = async () => supabase.from("users").select("id,name,username,email,profile,created_at,updated_at")

export const getUserById = (id: string) => supabase.from("users").select().eq("id", id).single()

export const createUser = async (user: TablesInsert<"users">) => await supabase.from("users").insert(user)

export const getUserByEmail = async (email: string) => await supabase.from("users").select("*").eq("email", email).single()

export const getUserByUsername = async (username: string) => await supabase.from("users").select("*").eq("username", username).single()

export const updateUser = async (update: TablesUpdate<"users">, id: string) => {
   return await supabase.from("users").update(update).eq("id", id).select()
}