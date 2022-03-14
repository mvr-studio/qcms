"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const zod_1 = require("zod");
test('buildFieldsValidation reflects zod validation', () => {
    const objectDefinition = {
        fields: [
            {
                name: 'name',
                type: 'String',
                validationSchema: (z) => z.string().min(3)
            }
        ]
    };
    const fieldsValidation = (0, _1.buildFieldsValidation)(objectDefinition);
    const resultMock = { name: zod_1.z.string().min(3) };
    expect(JSON.stringify(fieldsValidation)).toEqual(JSON.stringify(resultMock));
});
