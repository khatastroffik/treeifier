/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TreeifierNodeParser, TreeifierNodeTypes } from './treeifier-node-parser';

/**
 * @khatastroffik/treeifier :: Treeifier Node
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

// TODO: implement deep property access i.e. a function to access "item[..][..]...[..]" using the "path" information
//       i.e. a kind of recursive version of:
//       function get(obj: any, ...props: string[]): any {
//         return obj && props.reduce(
//           (result, prop) => result == null ? undefined : result[prop],
//           obj
//         );
//       }
//      as defined in https://codewithstyle.info/Deep-property-access-in-TypeScript/
// 
//      or
// 
//      const getNestedObject = (nestedObj, pathArr) => {
//        return pathArr.reduce((obj, key) =>
//            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
//      }
//      etc. as in https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f
//           https://www.npmjs.com/package/typy


/**
 * This class represents the building block of the tree structure corresponding 
 * to the analyzed/parsed/processed input (object).
 *
 * @export
 * @member nodeType the type of the value stored in the node.
 * @member isLeaf true when the node is "at the end of a branch" (eq. to "not isBranch").
 * @member isBranch true when the node is "carrying further branches or leafs" (eq. to "not isLeaf").
 * @member isValue the stored value can be interpreted as "pure data" i.e. is not itself an object holding further data.
 * @member depth the branching depth of the node i.e. how far away from the root node it is. Level 0 = root node.
 * @member ancestors an array containing the hierarchically (relative to the node instance) sorted (!) list of ancestor nodes up to the root node. The array item at index 0 is the root node.
 * @member maxIndex the amount of the sibling nodes on the current branch i.e. how many children -1 the parent node is holding.
 * @member isCircular true when the value correspond to a node listed as "ancestor" of the current node instance.
 * @member circularRefNode the reference to the tree node which value corresponds to the circular reference (if any).
 * @member circularRefIndex (private) the index of the circularly referenced ancestor in the ancestors array (if any)
 * @member prefix the ascii text representing a "branch" structure of the tree representation for the current node. Helper for the representation of a node in a textual tree view.
 * @member joint   the ascii text representing a "leaf" structure representation for the current node. Helper for the representation of a node in a textual tree view.
 * @member children an array containing the list of all 1st level (sibling) child nodes directly bound to the current node instance.
 * @member processResult: the textual or objectal representation of the node as provided by the "processor" callback function. Used to "output" the tree representation.
  * @member path the "chain" of node "keys" leading to the current node. The keys are separated by a ".". Can be used to IDENTIFY the node and to access the item value directly (e.g. for path = root.b.xtra.beta, then use 'item.b.xtra.beta' or 'item["b"]["xtra"]["beta"]'.
 * @class TreeifierNode
 */
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

  /**
   * Creates an instance of a TreeifierNode and initialize all its properties
   * 
   * @param {string} key the "label" corresponding to the item name/property
   * @param {*} value the value i.e. data originally contained in the item or its property
   * @param {number} index the index of the tree node in a node sequence (sibling) or node array
   * @param {(TreeifierNode | null)} parent the tree node referencing this instance as its child
   * @memberof TreeifierNode
   */
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
  /**
   * This function returns a default textual representation of the  
   * original "value" stored in the tree node.
   * 
   * @description By default, some values are "translated" in their respective types
   * to avoid textual noise or because the value cannot be represented properly. 
   * e.g.
   * - values corresponding to functions and symbols
   * - values of "container" nodes
   * - values of circularly referenced objects
   * - non existing values (null or empty)
   * etc.
   *
   * @returns {string} the textual representation of a "value" (or its type...)
   * @memberof TreeifierNode
   */
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
