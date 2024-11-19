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
const express_1 = require("express");
const otherRouter = (0, express_1.Router)();
otherRouter.post("/space", (req, res) => {
    let { latitude1, latitude2, longitude1, longitude2, return_distance_type = "km" } = req.body;
    const R = 6371.0;
    latitude1 = latitude1 * (Math.PI / 180);
    longitude1 = longitude1 * (Math.PI / 180);
    latitude2 = latitude2 * (Math.PI / 180);
    longitude2 = longitude2 * (Math.PI / 180);
    const dlat = latitude2 - latitude1;
    const dlon = longitude2 - longitude1;
    const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.pow(Math.sin(dlon / 2), 2);
    let result = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    if (return_distance_type == "meter")
        result *= 1000;
    res.json({
        "message": "success",
        "data": {
            "result": result,
            "type": return_distance_type,
        }
    });
});
const baseUrl = "https://haddock-flexible-mouse.ngrok-free.app";
otherRouter.get("/smart-lamp/state", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(baseUrl + "/state");
    res.send(yield response.text());
}));
otherRouter.get("/smart-lamp/on", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(baseUrl + "/on");
    res.send(yield response.text());
}));
otherRouter.get("/smart-lamp/off", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(baseUrl + "/off");
    res.send(yield response.text());
}));
exports.default = otherRouter;
