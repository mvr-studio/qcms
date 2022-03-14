"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
test('generates correct names for operations', () => {
    const operationsNames = (0, _1.getOperationsNames)('pear');
    expect(JSON.stringify(operationsNames)).toEqual(JSON.stringify({
        findAll: 'pears',
        findOne: 'pearById',
        create: 'createPear',
        update: 'updatePear',
        delete: 'deletePear'
    }));
});
