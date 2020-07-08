/**
* @khatastroffik/treeifier :: TREEIFIER SAMPLE ESM (BROWSER) APP
*
* License: MIT
* Copyright (c) 2020, Loïs Bégué
*
**/

import { TreeifierNode } from './treeifier-node.js';
export class Treeifier {
    constructor(nodeProcessorCallback) {
        this.processor = nodeProcessorCallback ?? undefined;
    }
    static defaultProcessor(node) {
        const circular = node.isCircular ? ' -> ' + node.circularRefNode?.key ?? '?' : '';
        let result = node.prefix + node.joint + node.key + (node.isLeaf ? ' : ' + node.toString() : '') + circular;
        if (node.isBranch) {
            node.children.forEach((child) => {
                child.processResult && (result = result + '\n' + child.processResult);
            });
        }
        return result;
    }
    processInternal(node, processor) {
        if (node.isBranch && !node.isCircular) {
            Object.entries(node.value).forEach(([key, value], index) => {
                const subNode = new TreeifierNode(key, value, index, node);
                this.processInternal(subNode, processor);
            });
        }
        node.processResult = processor(node);
    }
    parse(root, label, nodeProcessorCallback) {
        if (!nodeProcessorCallback)
            nodeProcessorCallback = this.processor ?? Treeifier.defaultProcessor;
        const rootObjectNode = new TreeifierNode(label ? label : 'root', root, 0, null);
        this.processInternal(rootObjectNode, nodeProcessorCallback);
        return rootObjectNode;
    }
    process(root, label, nodeProcessorCallback) {
        return this.parse(root, label, nodeProcessorCallback).processResult;
    }
}
