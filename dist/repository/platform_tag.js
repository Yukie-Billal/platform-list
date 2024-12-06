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
exports.getPlatformByTag = exports.getPlatformTags = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
const getPlatformTags = (platformId) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("platform_tag").select().eq('platform_id', platformId); });
exports.getPlatformTags = getPlatformTags;
const getPlatformByTag = (tagId) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("platform_tag").select().eq("tag_id", tagId); });
exports.getPlatformByTag = getPlatformByTag;
