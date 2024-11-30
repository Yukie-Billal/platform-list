import supabase from "../config/supabase"
import {TablesInsert, TablesUpdate} from "../types/database.types"

export const getTags = async () => await supabase.from("tags").select()

export const createTags = async (values: TablesInsert<"tags">) => await supabase.from("tags").insert(values)

export const updateTags = async (values: TablesUpdate<"tags">, id: number) => await supabase.from("tags").update(values).eq("id", id)

export const deleteTags = async (id: number) => await supabase.from("tags").delete().eq("id", id)

export const getMainTags = async () => await supabase.from("tags").select().filter("tag_id", "is", null)

export const getTagsByMainTagId = async (tag_id: number) => await supabase.from("tags").select().eq("tag_id", tag_id)