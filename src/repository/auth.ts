import supabase from "../config/supabase";

export const signIn = async (email: string, password: string) => await supabase.auth.signInWithPassword({ email, password })

export const signUp = async (email: string, password: string) => await supabase.auth.signUp({ email, password })

export const getUserBytoken = async (token: string) => await supabase.auth.getUser(token)

export const signOut = async () => await supabase.auth.signOut()