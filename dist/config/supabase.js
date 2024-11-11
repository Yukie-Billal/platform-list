"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const _constant_1 = require("./_constant");
const supabase = (0, supabase_js_1.createClient)(_constant_1.SUPABASE_URL, _constant_1.SUPABASE_KEY);
exports.default = supabase;
