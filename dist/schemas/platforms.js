"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlatformSchemaValidation = exports.updatePlatfromSchemaValidation = exports.createPlatfromSchemaValidation = void 0;
const yup_1 = require("yup");
exports.createPlatfromSchemaValidation = (0, yup_1.object)().shape({
    main_feature: (0, yup_1.string)().required().nonNullable(),
    name: (0, yup_1.string)().required().nonNullable(),
    type: (0, yup_1.string)().required().nonNullable(),
    active: (0, yup_1.boolean)().required(),
    description: (0, yup_1.string)().nullable().optional(),
    design_rating: (0, yup_1.number)().nullable().optional(),
    mobile_app: (0, yup_1.string)().nullable().default(null),
    web_url: (0, yup_1.string)().nullable().default(null),
});
exports.updatePlatfromSchemaValidation = (0, yup_1.object)().shape({
    id: (0, yup_1.string)().required(),
    name: (0, yup_1.string)().required().nonNullable(),
    main_feature: (0, yup_1.string)().required().nonNullable(),
    type: (0, yup_1.string)().required().nonNullable(),
    active: (0, yup_1.boolean)().required(),
    description: (0, yup_1.string)().nullable().optional(),
    design_rating: (0, yup_1.number)().nullable().optional(),
    mobile_app: (0, yup_1.string)().nullable().default(null),
    web_url: (0, yup_1.string)().nullable().default(null),
});
exports.deletePlatformSchemaValidation = (0, yup_1.object)().shape({
    id: (0, yup_1.number)().required(),
    force: (0, yup_1.boolean)().nullable().optional()
});
