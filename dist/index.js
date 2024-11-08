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
const node_crypto_1 = __importDefault(require("node:crypto"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.APP_PORT || 3000;
let users = [
    {
        "id": node_crypto_1.default.randomBytes(12).toString("hex").trim(),
        "username": "admin",
        "password": "admin"
    }
];
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ "app": "EXPRESS TYPESCRIPT API" });
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(users);
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = {
        username,
        password,
        id: node_crypto_1.default.randomBytes(12).toString("hex").trim()
    };
    users.push(user);
    res.json(user);
}));
app.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = users.find(u => u.username == username && u.password == password);
    if (!user) {
        res.status(400).json({ "message": "wrong username or password" });
        return;
    }
    res.json({ "message": "Berhasil login" });
}));
app.listen(port, () => console.log("server running on 0:" + port));
