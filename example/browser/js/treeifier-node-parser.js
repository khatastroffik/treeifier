/**
* @khatastroffik/treeifier :: TREEIFIER SAMPLE ESM (BROWSER) APP
*
* License: MIT
* Copyright (c) 2020, Loïs Bégué
*
**/

export var TreeifierNodeTypes;
(function (TreeifierNodeTypes) {
    TreeifierNodeTypes[TreeifierNodeTypes["unknown"] = 0] = "unknown";
    TreeifierNodeTypes[TreeifierNodeTypes["empty"] = 1] = "empty";
    TreeifierNodeTypes[TreeifierNodeTypes["string"] = 2] = "string";
    TreeifierNodeTypes[TreeifierNodeTypes["number"] = 3] = "number";
    TreeifierNodeTypes[TreeifierNodeTypes["boolean"] = 4] = "boolean";
    TreeifierNodeTypes[TreeifierNodeTypes["date"] = 5] = "date";
    TreeifierNodeTypes[TreeifierNodeTypes["function"] = 6] = "function";
    TreeifierNodeTypes[TreeifierNodeTypes["symbol"] = 7] = "symbol";
    TreeifierNodeTypes[TreeifierNodeTypes["array"] = 8] = "array";
    TreeifierNodeTypes[TreeifierNodeTypes["emptyObject"] = 9] = "emptyObject";
    TreeifierNodeTypes[TreeifierNodeTypes["nonEmptyObject"] = 10] = "nonEmptyObject";
    TreeifierNodeTypes[TreeifierNodeTypes["arrayofobjects"] = 11] = "arrayofobjects";
})(TreeifierNodeTypes || (TreeifierNodeTypes = {}));
const DefaultNodeTypesArray = [
    TreeifierNodeTypes.unknown,
    TreeifierNodeTypes.empty,
    TreeifierNodeTypes.string,
    TreeifierNodeTypes.number,
    TreeifierNodeTypes.boolean,
    TreeifierNodeTypes.date,
    TreeifierNodeTypes.array,
    TreeifierNodeTypes.function,
    TreeifierNodeTypes.symbol,
    TreeifierNodeTypes.emptyObject,
    TreeifierNodeTypes.nonEmptyObject,
    TreeifierNodeTypes.arrayofobjects
];
const DefaultNodeValueTypesArray = [
    TreeifierNodeTypes.empty,
    TreeifierNodeTypes.string,
    TreeifierNodeTypes.number,
    TreeifierNodeTypes.boolean,
    TreeifierNodeTypes.date,
    TreeifierNodeTypes.function,
    TreeifierNodeTypes.symbol,
];
const DefaultLeafTypesArray = [
    ...DefaultNodeValueTypesArray,
    TreeifierNodeTypes.unknown,
    TreeifierNodeTypes.array,
    TreeifierNodeTypes.emptyObject
];
const DefaultBranchTypesArray = DefaultNodeTypesArray.filter(x => !DefaultLeafTypesArray.includes(x));
export class TreeifierNodeParser {
    static get leafTypes() {
        return [...TreeifierNodeParser._leafTypes];
    }
    static set leafTypes(newLeafTypes) {
        TreeifierNodeParser._leafTypes = [...newLeafTypes];
        TreeifierNodeParser._branchTypes = DefaultNodeTypesArray.filter(x => !TreeifierNodeParser._leafTypes.includes(x));
    }
    static get branchTypes() {
        return [...TreeifierNodeParser._branchTypes];
    }
    static set branchTypes(newBranchTypes) {
        TreeifierNodeParser._branchTypes = [...newBranchTypes];
        TreeifierNodeParser._leafTypes = DefaultNodeTypesArray.filter(x => !TreeifierNodeParser._branchTypes.includes(x));
    }
    static resetLeafAndBranchTypes() {
        TreeifierNodeParser._branchTypes = DefaultBranchTypesArray;
        TreeifierNodeParser._leafTypes = DefaultLeafTypesArray;
    }
    static isArray(candidate) {
        return Array.isArray(candidate);
    }
    static isEmpty(candidate) {
        return (candidate === null) || (candidate === undefined);
    }
    static isString(candidate) {
        return (typeof candidate === 'string') || (candidate instanceof String);
    }
    static isNumber(candidate) {
        return (typeof candidate === 'number') || (candidate instanceof Number);
    }
    static isBoolean(candidate) {
        return (typeof candidate === 'boolean') || (candidate instanceof Boolean);
    }
    static isFunction(candidate) {
        return (typeof candidate === 'function') || (candidate instanceof Function);
    }
    static isSymbol(candidate) {
        return (typeof candidate === 'symbol') || (candidate instanceof Symbol);
    }
    static isDate(candidate) {
        return (typeof candidate === 'object') && (candidate instanceof Date);
    }
    static isObject(candidate) {
        return (candidate != null) && (typeof candidate === 'object') && !TreeifierNodeParser.isArray(candidate) && !TreeifierNodeParser.isValue(candidate);
    }
    static isNonEmptyObject(candidate) {
        return (candidate != null) && (typeof candidate === 'object') && (Object.getOwnPropertyNames(candidate).length > 0);
    }
    static isEmptyObject(candidate) {
        return (candidate != null) && (typeof candidate === 'object') && (Object.getOwnPropertyNames(candidate).length == 0);
    }
    static isEmptyArray(candidate) {
        let everyItemIsEmpty = true;
        for (let index = 0; index < candidate.length; index++) {
            everyItemIsEmpty = !candidate[index] && everyItemIsEmpty;
        }
        return everyItemIsEmpty;
    }
    static isArrayOfObjects(candidate) {
        return TreeifierNodeParser.isArray(candidate) &&
            !TreeifierNodeParser.isEmptyArray(candidate) &&
            candidate.every(item => TreeifierNodeParser.isObject(item));
    }
    static getNodeType(nodeItem) {
        let result = TreeifierNodeTypes.unknown;
        (TreeifierNodeParser.isString(nodeItem) && (result = TreeifierNodeTypes.string)) ||
            (TreeifierNodeParser.isNumber(nodeItem) && (result = TreeifierNodeTypes.number)) ||
            (TreeifierNodeParser.isBoolean(nodeItem) && (result = TreeifierNodeTypes.boolean)) ||
            (TreeifierNodeParser.isDate(nodeItem) && (result = TreeifierNodeTypes.date)) ||
            (TreeifierNodeParser.isFunction(nodeItem) && (result = TreeifierNodeTypes.function)) ||
            (TreeifierNodeParser.isSymbol(nodeItem) && (result = TreeifierNodeTypes.symbol)) ||
            (TreeifierNodeParser.isEmpty(nodeItem) && (result = TreeifierNodeTypes.empty)) ||
            (TreeifierNodeParser.isArray(nodeItem) && (result = TreeifierNodeParser.isArrayOfObjects(nodeItem) ? TreeifierNodeTypes.arrayofobjects : TreeifierNodeTypes.array)) ||
            (TreeifierNodeParser.isEmptyObject(nodeItem) && (result = TreeifierNodeTypes.emptyObject)) ||
            (TreeifierNodeParser.isNonEmptyObject(nodeItem) && (result = TreeifierNodeTypes.nonEmptyObject));
        return result;
    }
    static isValue(candidate) {
        return TreeifierNodeParser.isValueNode(TreeifierNodeParser.getNodeType(candidate));
    }
    static isValueNode(nodeType) {
        return DefaultNodeValueTypesArray.includes(nodeType);
    }
    static isLeafNode(nodeType) {
        return TreeifierNodeParser._leafTypes.includes(nodeType);
    }
    static isBranchNode(nodeType) {
        return TreeifierNodeParser._branchTypes.includes(nodeType);
    }
    static isLeaf(candidate) {
        return TreeifierNodeParser.isLeafNode(TreeifierNodeParser.getNodeType(candidate));
    }
    static isBranch(candidate) {
        return TreeifierNodeParser.isBranchNode(TreeifierNodeParser.getNodeType(candidate));
    }
}
TreeifierNodeParser._branchTypes = DefaultBranchTypesArray;
TreeifierNodeParser._leafTypes = DefaultLeafTypesArray;
