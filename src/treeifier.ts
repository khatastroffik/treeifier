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

export type TreeSortFunction = ( objPropA: [string, unknown], objPropB: [string, unknown] ) => number;
export type NodeProcessorFunction = ( node: TreeifierNode ) => any;

export class Treeifier {

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

}
