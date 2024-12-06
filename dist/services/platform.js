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
exports.deletePlatform = exports.updatePlatform = exports.createPlatform = exports.getPlatformById = exports.getPlatforms = void 0;
const platformRepository = __importStar(require("../repository/platform"));
const response_1 = __importDefault(require("../utils/response"));
const errorHandler_1 = require("../utils/errorHandler");
const platforms_1 = require("../schemas/platforms");
const getPlatforms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: platforms, error } = yield platformRepository.getPlatforms();
        if (error)
            throw error;
        response_1.default.success(platforms).send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.getPlatforms = getPlatforms;
const getPlatformById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { data: platform, error } = yield platformRepository.getPlatformById(id);
        if (error)
            throw error;
        response_1.default.success(platform).send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.getPlatformById = getPlatformById;
const createPlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, main_feature, type, description, active, mobile_app, web_url, design_rating, service_rating } = yield platforms_1.createPlatfromSchemaValidation.validate(req.body, { abortEarly: false });
        const { data: platform, error } = yield platformRepository.createPLatform({ name, main_feature, type, description, active, mobile_app, web_url, design_rating, service_rating });
        if (error)
            throw error;
        response_1.default.success(platform, "create success").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.createPlatform = createPlatform;
const updatePlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, active, description, design_rating, main_feature, mobile_app, name, service_rating, type, web_url } = yield platforms_1.updatePlatfromSchemaValidation.validate(req.body, { abortEarly: false });
        const { data: platform, error } = yield platformRepository.getPlatformById(id);
        if (!platform || error) {
            return response_1.default.notFound("platform not found").send(res);
        }
        const { error: updateError } = yield platformRepository.updatePlatform({ active, description, design_rating, main_feature, mobile_app, name, service_rating, type, web_url }, id);
        if (updateError)
            throw updateError;
        response_1.default.success({ id }, "update success").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.updatePlatform = updatePlatform;
const deletePlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const { data: platform, error: notFoundError } = yield platformRepository.getPlatformById(id);
        console.log(platform, notFoundError);
        if (notFoundError || !platform) {
            response_1.default.notFound("Platform not found").send(res);
            return;
        }
        const { error: deleteError } = yield platformRepository.deletePlatform(id);
        if (deleteError)
            throw deleteError;
        response_1.default.success({ id }).send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.deletePlatform = deletePlatform;
