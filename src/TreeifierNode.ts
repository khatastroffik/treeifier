/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TreeifierNodeParser, TreeifierNodeTypes } from './TreeifierNodeParser';

/**
 * @khatastroffik/treeifier :: Treeifier Node
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
export class TreeifierNode {
  public readonly nodeType: TreeifierNodeTypes;
  public readonly isLeaf: boolean;
  public readonly isBranch: boolean;
  public readonly isValue: boolean;

  constructor( 
    public readonly value: any,
    public readonly parser: TreeifierNodeParser | null,
    public readonly parent: TreeifierNode | null,
    public readonly ancestors: Array<TreeifierNode> ) {

    this.nodeType = TreeifierNodeParser.getNodeType( value );
    this.isLeaf = TreeifierNodeParser.isLeafNode( this.nodeType );
    this.isBranch = !this.isLeaf;
    this.isValue = TreeifierNodeParser.isValueNode( this.nodeType );
  }
  toString(): string {
    let result: string;
    ((this.nodeType == TreeifierNodeTypes.empty && this.value === undefined) && ( result = 'undefined')) ||
    ((this.nodeType == TreeifierNodeTypes.empty && this.value === null) && ( result = 'null')) ||
    ((this.nodeType == TreeifierNodeTypes.function) && ( result = 'function')) ||
    ((this.nodeType == TreeifierNodeTypes.symbol) && ( result = (this.value as symbol).toString() )) ||
    ((this.nodeType == TreeifierNodeTypes.date) && ( result = (this.value as Date).toLocaleDateString() )) ||
    ((this.nodeType == TreeifierNodeTypes.number && isNaN(this.value)) && ( result = 'NaN' )) ||
    ((this.nodeType == TreeifierNodeTypes.emptyObject) && ( result = '{}')) ||
    ((this.nodeType == TreeifierNodeTypes.nonEmptyObject) && ( result = 'object')) ||
    ((this.nodeType == TreeifierNodeTypes.arrayofobjects) && ( result = 'array of objects')) ||
    ((this.nodeType == TreeifierNodeTypes.array) && ( result = `[${(this.value as Array<any>).join(', ')}]`)) ||
    ((this.nodeType == TreeifierNodeTypes.unknown) && ( result = '<UNKNOWN>')) || // this should never happen
    (result = this.value.toString());
    return result;
  }
}
