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
exports.updateUser = exports.getUserByUsername = exports.getUserByEmail = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () { return supabase_1.default.from("users").select("id,name,username,email,profile,created_at,updated_at"); });
exports.getUsers = getUsers;
const getUserById = (id) => supabase_1.default.from("users").select().eq("id", id).single();
exports.getUserById = getUserById;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("users").insert(user); });
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("users").select("*").eq("email", email).single(); });
exports.getUserByEmail = getUserByEmail;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("users").select("*").eq("username", username).single(); });
exports.getUserByUsername = getUserByUsername;
const updateUser = (update, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield supabase_1.default.from("users").update(update).eq("id", id).select();
});
exports.updateUser = updateUser;
