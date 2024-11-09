import { users } from "../models/user"

export const getUsers = () => users

export const createUser = (user: any) => users.push(user)

export const getUserByUsernamePassword = (username: string, password: string) => users.find(u => u.username == username && u.password == password)