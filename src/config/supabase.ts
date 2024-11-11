import { createClient } from "@supabase/supabase-js"
import { SUPABASE_KEY, SUPABASE_URL } from "./_constant"
import { Database } from "../types/database.types"

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)

export default supabase;