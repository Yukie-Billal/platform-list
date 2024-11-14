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
exports.uploadProfile = exports.createUser = exports.getUsers = void 0;
const yup = __importStar(require("yup"));
const userRepository = __importStar(require("../repository/user"));
const authRepository = __importStar(require("../repository/auth"));
const password_1 = require("../utils/password");
const response_1 = __importDefault(require("../utils/response"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: users, error } = yield userRepository.getUsers();
    if (error) {
        response_1.default.internalError(error.message).send(res);
        return;
    }
    response_1.default.success({ users }).send(res);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password, username } = req.body;
    const { data: emailUsed, error } = yield userRepository.getUserByEmail(email);
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
        if (!user) {
            response_1.default.notFound("user not found").send(res);
            return;
        }
        const profileLink = "https://i.imgur.com/0Ngl2xs.jpeg";
        const errorUpload = null;
        // const {data: profileLink, error: errorUpload} = await uploadImage(imageProfile)
        if (errorUpload) {
            response_1.default.badRequest(null, "Failed to upload profile picture").send(res);
            return;
        }
        const { data, error, status, statusText } = yield userRepository.updateUser({ profile: profileLink, updated_at: new Date().toUTCString() }, userId);
        if (error) {
            response_1.default.internalError("failed to update profile picture", error).send(res);
            return;
        }
        response_1.default.success({ link: profileLink }, "profile picture uploaded successfuly").send(res);
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            response_1.default.badRequest(error.errors, "validation error").send(res);
            return;
        }
        response_1.default.internalError(error.message).send(res);
    }
});
exports.uploadProfile = uploadProfile;
