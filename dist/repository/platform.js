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
exports.deletePlatform = exports.updatePlatform = exports.createPLatform = exports.getPlatformById = exports.getPlatforms = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
const getPlatforms = () => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("platforms").select(`*, tags(id, name)`); });
exports.getPlatforms = getPlatforms;
const getPlatformById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("platforms").select().eq("id", id).single(); });
exports.getPlatformById = getPlatformById;
const createPLatform = (platform) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("platforms").insert(platform); });
exports.createPLatform = createPLatform;
const updatePlatform = (platform, id) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("platforms").update(platform).eq("id", id); });
exports.updatePlatform = updatePlatform;
const deletePlatform = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("platforms").update({ deleted_at: new Date().toUTCString() }).eq("id", id); });
exports.deletePlatform = deletePlatform;
