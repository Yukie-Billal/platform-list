import supabase from "../config/supabase"
import {TablesInsert, TablesUpdate} from "../types/database.types"

export const getTags = async () => await supabase.from("tags").select()
