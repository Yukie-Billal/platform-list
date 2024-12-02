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
exports.getTagsByMainTagId = exports.getMainTags = exports.getTagById = exports.deleteTags = exports.updateTags = exports.createTags = exports.getTags = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
const getTags = () => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("tags").select(); });
exports.getTags = getTags;
const createTags = (values) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("tags").insert(values); });
exports.createTags = createTags;
const updateTags = (values, id) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("tags").update(values).eq("id", id); });
exports.updateTags = updateTags;
const deleteTags = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("tags").delete().eq("id", id); });
exports.deleteTags = deleteTags;
const getTagById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("tags").select().eq("id", id).single(); });
exports.getTagById = getTagById;
const getMainTags = () => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("tags").select().filter("tag_id", "is", null); });
exports.getMainTags = getMainTags;
const getTagsByMainTagId = (tag_id) => __awaiter(void 0, void 0, void 0, function* () { return yield supabase_1.default.from("tags").select().eq("tag_id", tag_id); });
exports.getTagsByMainTagId = getTagsByMainTagId;
