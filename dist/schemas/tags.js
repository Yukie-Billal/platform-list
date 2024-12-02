"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTagsSchemaValidation = exports.createTagsSchemaValidation = void 0;
const yup_1 = require("yup");
exports.createTagsSchemaValidation = (0, yup_1.object)().shape({
    name: (0, yup_1.string)().required().trim().nonNullable().min(1).matches(/\S/, "Tidak boleh hanya spasi"),
    tag_id: (0, yup_1.number)().required().nullable(),
});
exports.updateTagsSchemaValidation = (0, yup_1.object)().shape({
    id: (0, yup_1.number)().required(),
    name: (0, yup_1.string)().required().trim().nonNullable().min(1).matches(/\S/, "Tidak boleh hanya spasi"),
    tag_id: (0, yup_1.number)().optional().nullable(),
});
