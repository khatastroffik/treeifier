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
export type NodeProcessorFunction = ( node: TreeifierNode ) => void;

export class Treeifier {

  private processInternal( node: TreeifierNode, processor: NodeProcessorFunction ): void {
    processor(node);
    if ( node.isBranch && !node.isCircular ) {
      Object.entries( node.value ).forEach( ( [key, value], index ) => {
        const subNode = new TreeifierNode( key, value, index, node );
        this.processInternal( subNode, processor );
      } );
    }
    // processor(node);
  }

  process( root: any, label: string, nodeProcessorCallback: NodeProcessorFunction ): void {
    if ( !nodeProcessorCallback ) throw new Error( 'Cannot process without a processor function.' );
    const rootObjectNode = new TreeifierNode( label ? label:  'root', root, 0, null);
    this.processInternal( rootObjectNode, nodeProcessorCallback);
  }
}



/*
Treeifier should be usable with "toString" as in:

--code--
var pt = { x: 1, y: 2 };
console.log(pt);
pt.toString = function() {
  return '(' + this.x + ', ' + this.y + ')'; <-- integrate Treeifier here...
};
console.log(pt);

--output--
[object Object]
(1, 2)

*/
