"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteTags = exports.updateTags = exports.createTags = exports.getTagsById = exports.getTags = void 0;
const tagsRepository = __importStar(require("../repository/tags"));
const response_1 = __importDefault(require("../utils/response"));
const tags_1 = require("../schemas/tags");
const errorHandler_1 = require("../utils/errorHandler");
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: tags, error } = yield tagsRepository.getTags();
        if (error)
            throw error;
        response_1.default.success(tags, "success").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.getTags = getTags;
const getTagsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id))
            return response_1.default.badRequest({ id: "must be string" }, "invalid type id").send(res);
        const { data: tag } = yield tagsRepository.getTagById(id);
        if (!tag)
            return response_1.default.notFound("tag not found").send(res);
        response_1.default.success(tag, "retreived").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.getTagsById = getTagsById;
const createTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, tag_id } = yield tags_1.createTagsSchemaValidation.validate(req.body);
        console.log(req.user);
        if (tag_id) {
            const { data: tag } = yield tagsRepository.getTagById(tag_id);
            if (!tag)
                return response_1.default.notFound("tag not found").send(res);
        }
        const { data: tag, error } = yield tagsRepository.createTags({ name, tag_id });
        if (error)
            throw error;
        response_1.default.success(tag, "create success").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.createTags = createTags;
const updateTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, tag_id } = yield tags_1.updateTagsSchemaValidation.validate(req.body);
        const { data: tag } = yield tagsRepository.getTagById(id);
        if (!tag)
            return response_1.default.notFound("tag not found").send(res);
        if (tag_id) {
            const { data: checkTag } = yield tagsRepository.getTagById(tag_id);
            if (!checkTag)
                return response_1.default.notFound("tag not found").send(res);
        }
        const { error } = yield tagsRepository.updateTags({ name, tag_id }, id);
        if (error)
            throw error;
        response_1.default.success({ id }, "update success").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.updateTags = updateTags;
const deleteTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield tags_1.deleteTagsSchemaValidation.validate(req.body);
        const { data: tag } = yield tagsRepository.getTagById(id);
        if (!tag)
            return response_1.default.notFound("tag not found").send(res);
        const { error, status } = yield tagsRepository.deleteTags(id);
        if (error)
            throw error;
        response_1.default.success({}, "delete success").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.deleteTags = deleteTags;
