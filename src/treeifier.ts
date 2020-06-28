/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @khatastroffik/treeifier :: Treeifier (parser)
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import { TreeifierNode } from './TreeifierNode';
import { TreeifierNodeTypes } from './TreeifierNodeParser';

export type TreeSortFunction = ( objPropA: [string, unknown], objPropB: [string, unknown] ) => number;
export type NodeProcessorFunction = ( node: TreeifierNode ) => any;

export class Treeifier {

  protected defaultProcessor(node: TreeifierNode): string {
    const circular = node.isCircular ? ' -> ' + node.circularRefNode?.key ?? '?' : '';
    let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' ) + circular ;
    if (node.isBranch) {
      node.children.forEach( (child:TreeifierNode): void => { 
        child.processResult && (result = result + '\n' + child.processResult) 
      } ) ;
    }
    return result;
  }

  protected debugProcessor(node: TreeifierNode): string {
    const circular = node.isCircular ? ' -> ' + node.circularRefNode?.key ?? '?' : '';
    let nodeValueString = node.toString();
    if (node.key === 'processResult') nodeValueString = nodeValueString.replace(/\r?\n|\r/g, '\\n');
    if (node.key === 'nodeType') nodeValueString = TreeifierNodeTypes[parseInt(nodeValueString,10)];
    let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + nodeValueString : '' ) + circular ;
    if (node.isBranch) {
      node.children.forEach( (child:TreeifierNode): void => { 
        child.processResult && (result = result + '\n' + child.processResult) 
      } ) ;
    }
    return result;
  }

  private processInternal( node: TreeifierNode, processor: NodeProcessorFunction ): void {
    if ( node.isBranch && !node.isCircular ) {
      Object.entries( node.value ).forEach( ( [key, value], index ) => {
        const subNode = new TreeifierNode( key, value, index, node );
        this.processInternal( subNode, processor );
      } );
    }
    node.processResult = processor( node );
  }

  parse( root: any, label: string, nodeProcessorCallback: NodeProcessorFunction ): TreeifierNode {
    if ( !nodeProcessorCallback ) throw new Error( 'Cannot process without a processor function.' );
    const rootObjectNode = new TreeifierNode( label ? label : 'root', root, 0, null );
    this.processInternal( rootObjectNode, nodeProcessorCallback );
    return rootObjectNode;
  }  
  process( root: any, label: string, nodeProcessorCallback: NodeProcessorFunction ): any {
    return this.parse(root, label, nodeProcessorCallback).processResult;
  }

  debug( root: any, label: string, nodeProcessorCallback: NodeProcessorFunction ): string {
    const rootnode = this.parse(root,label, nodeProcessorCallback);
    return this.process(rootnode, 'treeifier-root-node', this.debugProcessor);
  }
}
