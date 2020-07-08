/**
* @khatastroffik/treeifier :: TREEIFIER SAMPLE ESM (BROWSER) APP
*
* License: MIT
* Copyright (c) 2020, Loïs Bégué
*
**/

import { TreeifierNodeParser, TreeifierNodeTypes } from './treeifier-node-parser.js';
export class TreeifierNode {
    constructor(key, value, index, parent) {
        this.key = key;
        this.value = value;
        this.index = index;
        this.parent = parent;
        this.nodeType = TreeifierNodeParser.getNodeType(value);
        this.ancestors = parent ? [...parent.ancestors, parent] : [];
        this.circularRefIndex = this.ancestors.map((nodeitem) => nodeitem.value).indexOf(value);
        this.isCircular = this.circularRefIndex >= 0;
        this.circularRefNode = this.isCircular ? this.ancestors[this.circularRefIndex] : null;
        this.isLeaf = TreeifierNodeParser.isLeafNode(this.nodeType) || this.isCircular;
        this.isBranch = !this.isLeaf;
        this.isValue = TreeifierNodeParser.isValueNode(this.nodeType);
        this.depth = this.ancestors.length;
        this.maxIndex = parent ? Object.entries(parent.value).length - 1 : 0;
        this.prefix = parent ? (parent.prefix) + (((parent.maxIndex - parent.index) === 0) ? ((this.depth > 1) ? '   ' : '') : '│  ') : '';
        this.joint = parent ? ((this.index === this.maxIndex) ? '└─ ' : '├─ ') : '';
        this.children = [];
        parent && (parent.children.push(this));
        this.path = `${parent ? parent.path + '.' : ''}${this.key}`;
        this.processResult = null;
    }
    toString() {
        let result = '';
        ((this.nodeType == TreeifierNodeTypes.empty && this.value === undefined) && (result = 'undefined')) ||
            ((this.nodeType == TreeifierNodeTypes.empty && this.value === null) && (result = 'null')) ||
            ((this.nodeType == TreeifierNodeTypes.function) && (result = 'function')) ||
            ((this.nodeType == TreeifierNodeTypes.symbol) && (result = this.value.toString())) ||
            ((this.nodeType == TreeifierNodeTypes.date) && (result = this.value.toLocaleDateString())) ||
            ((this.nodeType == TreeifierNodeTypes.number && isNaN(this.value)) && (result = 'NaN')) ||
            ((this.nodeType == TreeifierNodeTypes.emptyObject) && (result = '{}')) ||
            (this.isCircular && (result = 'circular ref.')) ||
            ((this.nodeType == TreeifierNodeTypes.nonEmptyObject) && (result = 'object')) ||
            ((this.nodeType == TreeifierNodeTypes.arrayofobjects) && (result = 'array of objects')) ||
            ((this.nodeType == TreeifierNodeTypes.array) && (result = `[${this.value.join(', ')}]`)) ||
            (result = this.value.toString());
        return result;
    }
}
