import supabase from "../config/supabase"

export const getPlatformTags = async (platformId: string) => await supabase.from("platform_tag").select().eq('platform_id', platformId)

export const getPlatformByTag = async (tagId: number) => await supabase.from("platform_tag").select().eq("tag_id", tagId)