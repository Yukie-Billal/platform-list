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
exports.updateUser = exports.uploadProfile = exports.createUser = exports.getUsers = void 0;
const yup = __importStar(require("yup"));
const userRepository = __importStar(require("../repository/user"));
const authRepository = __importStar(require("../repository/auth"));
const password_1 = require("../utils/password");
const response_1 = __importDefault(require("../utils/response"));
const errorHandler_1 = require("../utils/errorHandler");
const errorClass_1 = require("../utils/errorClass");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: users, error } = yield userRepository.getUsers();
        if (error)
            throw new errorClass_1.HttpInternalError(error.message);
        response_1.default.success({ users }).send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, username } = req.body;
        const { data: emailUsed } = yield userRepository.getUserByEmail(email);
        if (emailUsed) {
            response_1.default.badRequest("email", "email already registered").send(res);
            return;
        }
        const user = {
            name: name,
            username: username,
            email: email,
            password: (0, password_1.hashPassword)(password)
        };
        const { data: signUpUser, error: errorSignUp } = yield authRepository.signUp(email, password);
        if (errorSignUp) {
            response_1.default.badRequest(errorSignUp, "sign up failed");
            return;
        }
        console.log(signUpUser);
        const { data, error: errorInsert } = yield userRepository.createUser(user);
        if (errorInsert) {
            response_1.default.badRequest(errorInsert, "failed craete new user").send(res);
            return;
        }
        response_1.default.success(null, "berhasil membuat user").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.createUser = createUser;
const uploadProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageProfile, userId } = yield yup.object().shape({
            userId: yup.string().required().nonNullable(),
            imageProfile: yup.string().required().nonNullable()
        }).validate(req.body, { abortEarly: false });
        if (Buffer.from(imageProfile, "base64").toString("base64") !== imageProfile) {
            response_1.default.badRequest("imageProfile", "harus berupa base64").send(res);
            return;
        }
        const { data: user } = yield userRepository.getUserById(userId);
        if (!user)
            throw new errorClass_1.HttpNotFound("user not found");
        const profileLink = "https://i.imgur.com/0Ngl2xs.jpeg";
        const errorUpload = null;
        // const {data: profileLink, error: errorUpload} = await uploadImage(imageProfile)
        if (errorUpload)
            throw new errorClass_1.HttpBadRequest("Failed to upload profile picture", null);
        const { error } = yield userRepository.updateUser({ profile: profileLink, updated_at: new Date().toUTCString() }, userId);
        if (error) {
            response_1.default.internalError("failed to update profile picture", error).send(res);
            return;
        }
        response_1.default.success({ link: profileLink }, "profile picture uploaded successfuly").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.uploadProfile = uploadProfile;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, } = req.body;
        const { data: checkUser, error: errorNotFound } = yield userRepository.getUserById(id);
        if (!checkUser || errorNotFound)
            throw new errorClass_1.HttpNotFound("user not found");
        const { error: errorUpdate } = yield userRepository.updateUser({}, id);
        if (errorUpdate)
            throw new errorClass_1.HttpInternalError(errorUpdate.message);
        response_1.default.success({ id }, "success update").send(res);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
});
exports.updateUser = updateUser;
