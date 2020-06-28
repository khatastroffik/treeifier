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
  public readonly depth!: number;
  public readonly ancestors!: Array<TreeifierNode>;
  public readonly maxIndex!: number;
  public readonly isCircular: boolean;
  public readonly circularRefNode: TreeifierNode | null;
  private circularRefIndex!: number;
  public prefix: string;
  public joint: string;
  public readonly children: Array<TreeifierNode>;
  public processResult: any;
  public readonly path: string;

  constructor(
    public readonly key: string,
    public readonly value: any,
    public readonly index: number,
    public readonly parent: TreeifierNode | null,
  ) {

    this.nodeType = TreeifierNodeParser.getNodeType( value );
    this.ancestors = parent ? [...parent.ancestors, parent] : [];
    this.circularRefIndex = this.ancestors.map( ( nodeitem ) => nodeitem.value ).indexOf( value );
    this.isCircular = this.circularRefIndex >= 0;//this.ancestors.map( (nodeitem) => nodeitem.value).includes( value );
    this.circularRefNode = this.isCircular ? this.ancestors[this.circularRefIndex] : null;
    this.isLeaf = TreeifierNodeParser.isLeafNode( this.nodeType ) || this.isCircular;
    this.isBranch = !this.isLeaf;
    this.isValue = TreeifierNodeParser.isValueNode( this.nodeType );
    this.depth = this.ancestors.length;
    this.maxIndex = parent ? Object.entries( parent.value ).length - 1 : 0; // this works for both arrays and objects
    this.prefix = parent ? ( parent.prefix ) + ( ( ( parent.maxIndex - parent.index ) === 0 ) ? ( ( this.depth > 1 ) ? '   ' : '' ) : '│  ' ) : '';
    this.joint = parent ? ( ( this.index === this.maxIndex ) ? '└─ ' : '├─ ' ) : '';
    this.children = [];
    parent && (parent.children.push(this)); // add this node to its parent's children list
    this.path = `${parent? parent.path + '.': ''}${this.key}`;
    this.processResult = null;
  } 

  toString(): string {
    // IMPORTANT: the order of the tests is important here!
    // => 1. empty 2. non displayable values 3. circular 4. branches 5. array 6. values
    let result = '';
    ( ( this.nodeType == TreeifierNodeTypes.empty && this.value === undefined ) && ( result = 'undefined' ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.empty && this.value === null ) && ( result = 'null' ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.function ) && ( result = 'function' ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.symbol ) && ( result = ( this.value as symbol ).toString() ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.date ) && ( result = ( this.value as Date ).toLocaleDateString() ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.number && isNaN( this.value ) ) && ( result = 'NaN' ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.emptyObject ) && ( result = '{}' ) ) ||
      ( this.isCircular && ( result = 'circular ref.' ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.nonEmptyObject ) && ( result = 'object' ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.arrayofobjects ) && ( result = 'array of objects' ) ) ||
      ( ( this.nodeType == TreeifierNodeTypes.array ) && ( result = `[${( this.value as Array<any> ).join( ', ' )}]` ) ) ||
      // ((this.nodeType == TreeifierNodeTypes.unknown) && ( result = '<UNKNOWN>')) || // this should never happen
      ( result = this.value.toString() );
    return result;
  }
}
