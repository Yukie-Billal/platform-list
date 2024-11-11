import supabase from "../config/supabase"
import { TablesInsert } from "../types/database.types"

export const getUsers = async () => supabase.from("users").select("*")

export const createUser = (user: TablesInsert<"users">) => supabase.from("users").insert(user)

export const getUserByEmail = (email: string) => supabase.from("users").select("*").eq("email", email).single()

export const getUserByUsername = (username: string) => supabase.from("users").select("*").eq("username", username).single()