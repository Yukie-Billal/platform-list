import supabase from "../config/supabase";
import { TablesInsert, TablesUpdate } from "../types/database.types";

export const getPlatforms = async () => await supabase.from("platforms").select()

export const getPlatformById = async (id: number) => await supabase.from("platforms").select().eq("id", id).single()

export const createPLatform = async (platform: TablesInsert<"platforms">) => await supabase.from("platforms").insert(platform)

export const updatePlatform = async (platform: TablesUpdate<"platforms">, id: number) => await supabase.from("platforms").update(platform).eq("id", id)

export const deletePlatform = async (id: number) => await supabase.from("platforms").update({ deleted_at: new Date().toUTCString() }).eq("id", id)