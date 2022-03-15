"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFieldsValidation = void 0;
const zod_1 = require("zod");
const buildFieldsValidation = (objectDefinition) => {
    const fieldsValidation = {};
    objectDefinition.fields.forEach((field) => {
        if (field.validationSchema) {
            fieldsValidation[field.name] = field.validationSchema(zod_1.z) || zod_1.z.any();
        }
    });
    return fieldsValidation;
};
exports.buildFieldsValidation = buildFieldsValidation;
