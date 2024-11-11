"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.getUserByEmail = exports.createUser = exports.getUsers = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () { return supabase_1.default.from("users").select("*"); });
exports.getUsers = getUsers;
const createUser = (user) => supabase_1.default.from("users").insert(user);
exports.createUser = createUser;
const getUserByEmail = (email) => supabase_1.default.from("users").select("*").eq("email", email).single();
exports.getUserByEmail = getUserByEmail;
const getUserByUsername = (username) => supabase_1.default.from("users").select("*").eq("username", username).single();
exports.getUserByUsername = getUserByUsername;
