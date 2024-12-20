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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const tagsService = __importStar(require("../services/tags"));
const tagsRouter = (0, express_1.Router)();
tagsRouter.get("/", (0, auth_1.authMiddleware)(), tagsService.getTags);
tagsRouter.get("/main", (0, auth_1.authMiddleware)(), tagsService.getMainTags);
tagsRouter.get("/:id", (0, auth_1.authMiddleware)(), tagsService.getTagsById);
tagsRouter.get("/:id/tags", (0, auth_1.authMiddleware)(), tagsService.getTagsByTagId);
tagsRouter.post("/", (0, auth_1.authMiddleware)(), tagsService.createTags);
tagsRouter.put("/", (0, auth_1.authMiddleware)(), tagsService.updateTags);
tagsRouter.delete("/", (0, auth_1.authMiddleware)(), tagsService.deleteTags);
exports.default = tagsRouter;
