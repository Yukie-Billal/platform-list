"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPABASE_KEY = exports.SUPABASE_URL = exports.APP_PORT = exports.APP_NAME = void 0;
require("dotenv/config");
exports.APP_NAME = process.env.APP_NAME || "";
exports.APP_PORT = parseInt(process.env.APP_PORT || "3000");
exports.SUPABASE_URL = process.env.SUPABASE_URL || "";
exports.SUPABASE_KEY = process.env.SUPABASE_KEY || "";
