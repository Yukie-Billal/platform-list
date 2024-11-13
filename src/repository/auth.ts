import supabase from "../config/supabase";

export const signIn = async (email: string, password: string) => await supabase.auth.signInWithPassword({ email, password })

export const signUp = async (email: string, password: string) => await supabase.auth.signUp({ email, password })