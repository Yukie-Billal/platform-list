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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const _constant_1 = require("../config/_constant");
const returnVal = (data, error = null) => ({
    data,
    error
});
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new FormData();
    form.append("refresh_token", _constant_1.IMGUR_REFRESH_TOKEN);
    form.append("client_id", _constant_1.IMGUR_CLIENT_ID);
    form.append("client_secret", _constant_1.IMGUR_CLIENT_SECRET);
    form.append("grant_type", "refresh_token");
    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");
    const response = yield fetch("https://api.imgur.com/oauth2/token", {
        method: "POST",
        body: form,
        headers: headers
    });
    const responseBody = yield response.json();
    return responseBody.access_token;
});
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (Buffer.from(file, "base64").toString("base64") !== file) {
        return returnVal(null, "Must be a base64");
    }
    const form = new FormData();
    form.append("image", file);
    form.append("type", "base64");
    const response = yield fetch("https://api.imgur.com/3/upload", {
        method: 'POST',
        body: form,
        headers: {
            "Authorization": "Client-ID " + _constant_1.IMGUR_CLIENT_ID
        }
    });
    if (!response.ok) {
        console.log(response.status, response.statusText);
        return returnVal(null, "Failed to upload image");
    }
    const link = (yield response.json()).data.link;
    return returnVal(link, null);
});
exports.uploadImage = uploadImage;
const deleteImage = (fileUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + getAccessToken());
    const response = yield fetch("https://api.imgur.com/3/image/" + fileUrl.slice(20).split(".")[0], {
        method: "DELETE",
        headers: headers
    });
    if (!response.ok)
        return false;
    return true;
});
exports.deleteImage = deleteImage;
