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
exports.signOut = exports.getUserBytoken = exports.signUp = exports.signIn = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.auth.signInWithPassword({ email, password }); });
exports.signIn = signIn;
const signUp = (email, password) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.auth.signUp({ email, password }); });
exports.signUp = signUp;
const getUserBytoken = (token) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.auth.getUser(token); });
exports.getUserBytoken = getUserBytoken;
const signOut = () => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.auth.signOut(); });
exports.signOut = signOut;
