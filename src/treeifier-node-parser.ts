/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @khatastroffik/treeifier :: Treeifier node parser and node type
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

export enum TreeifierNodeTypes {
  unknown = 0,
  empty = 1,
  string = 2,
  number = 3,
  boolean = 4,
  date = 5,
  function = 6,
  symbol = 7,
  array = 8,
  emptyObject = 9,
  nonEmptyObject = 10,
  arrayofobjects = 11
}
const NodeTypesArray: Array<TreeifierNodeTypes> = [
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
]
const NodeValueTypesArray : Array<TreeifierNodeTypes> = [
  TreeifierNodeTypes.empty,
  TreeifierNodeTypes.string,
  TreeifierNodeTypes.number,
  TreeifierNodeTypes.boolean,
  TreeifierNodeTypes.date,
  TreeifierNodeTypes.function,
  TreeifierNodeTypes.symbol,

];
const LeafTypesArray: Array<TreeifierNodeTypes> = [
  ...NodeValueTypesArray,
  TreeifierNodeTypes.unknown,  
  TreeifierNodeTypes.array,
  TreeifierNodeTypes.emptyObject
];
const BranchTypesArray: Array<TreeifierNodeTypes> = NodeTypesArray.filter(x => !LeafTypesArray.includes(x));

/**
 * Abstract class used to create Treeifier Node objects (TreeifierNode)
 *
 * @export
 * @abstract
 * @class TreeifierNodeParser
 */
export abstract class TreeifierNodeParser {

  static isArray( candidate: any ): boolean {
    return Array.isArray( candidate );
  }
  static isEmpty( candidate: any ): boolean {
    return ( candidate === null ) || ( candidate === undefined );
  }
  static isString( candidate: any ): boolean {
    return ( typeof candidate === 'string' ) || ( candidate instanceof String );
  }
  static isNumber( candidate: any ): boolean {
    return ( typeof candidate === 'number' ) || ( candidate instanceof Number );
  }
  static isBoolean( candidate: any ): boolean {
    return ( typeof candidate === 'boolean' ) || ( candidate instanceof Boolean );
  }
  static isFunction( candidate: any ): boolean {
    return ( typeof candidate === 'function' ) || ( candidate instanceof Function );
  }
  static isSymbol( candidate: any ): boolean {
    return ( typeof candidate === 'symbol' ) || ( candidate instanceof Symbol );
  }
  static isDate( candidate: any ): boolean {
    return ( typeof candidate === 'object' ) && ( candidate instanceof Date );
  }  
  static isObject(candidate: any): boolean{
    return (candidate!= null) && ( typeof candidate === 'object' ) && !TreeifierNodeParser.isArray( candidate ) && !TreeifierNodeParser.isValue( candidate );
  }
  static isNonEmptyObject( candidate: any ): boolean {
    return (candidate!= null) && ( typeof candidate === 'object' ) && ( Object.getOwnPropertyNames( candidate ).length > 0 );    
  }
  static isEmptyObject( candidate: any ): boolean {
    return (candidate!= null) && ( typeof candidate === 'object' ) && ( Object.getOwnPropertyNames( candidate ).length == 0 );
  }
  static isEmptyArray( candidate: Array<any> ): boolean {
    // TEST FOR "new Array(x)" with x >0
    let everyItemIsEmpty = true;
    // Array.reduce(...), Array.every(...) and Array.some(...) DO NOT WORK with "new Array(x)"; hence using for loop
    for ( let index = 0; index < candidate.length; index++ ) {
      everyItemIsEmpty = !candidate[index] && everyItemIsEmpty;
    }
    return everyItemIsEmpty;
  }
  static isArrayOfObjects( candidate: any ): boolean {
    return TreeifierNodeParser.isArray( candidate ) &&
      !TreeifierNodeParser.isEmptyArray( candidate ) &&
      ( <any[]>candidate ).every( item => TreeifierNodeParser.isObject(item));
  }
  static getNodeType( nodeItem: any ): TreeifierNodeTypes {
    let result: TreeifierNodeTypes = TreeifierNodeTypes.unknown;
    ( TreeifierNodeParser.isString( nodeItem ) && ( result = TreeifierNodeTypes.string ) ) ||
      ( TreeifierNodeParser.isNumber( nodeItem ) && ( result = TreeifierNodeTypes.number ) ) ||
      ( TreeifierNodeParser.isBoolean( nodeItem ) && ( result = TreeifierNodeTypes.boolean ) ) ||
      ( TreeifierNodeParser.isDate( nodeItem ) && ( result = TreeifierNodeTypes.date ) ) ||
      ( TreeifierNodeParser.isFunction( nodeItem ) && ( result = TreeifierNodeTypes.function ) ) ||
      ( TreeifierNodeParser.isSymbol( nodeItem ) && ( result = TreeifierNodeTypes.symbol ) ) ||
      ( TreeifierNodeParser.isEmpty( nodeItem ) && ( result = TreeifierNodeTypes.empty ) ) ||
      ( TreeifierNodeParser.isArray( nodeItem ) && ( result = TreeifierNodeParser.isArrayOfObjects( nodeItem )? TreeifierNodeTypes.arrayofobjects: TreeifierNodeTypes.array ) ) ||
      ( TreeifierNodeParser.isEmptyObject( nodeItem ) && ( result = TreeifierNodeTypes.emptyObject ) ) ||
      ( TreeifierNodeParser.isNonEmptyObject( nodeItem ) && ( result = TreeifierNodeTypes.nonEmptyObject ) );
    return result;
  }
  static isValue( candidate: any ): boolean {
    return TreeifierNodeParser.isValueNode(TreeifierNodeParser.getNodeType(candidate));
  }
  static isValueNode( nodeType: TreeifierNodeTypes ): boolean {
    return NodeValueTypesArray.includes(nodeType);
  }

  // TODO: change to instance function...
  static isLeafNode(nodeType: TreeifierNodeTypes): boolean{
    return LeafTypesArray.includes(nodeType);
  }
  // TODO: change to instance function...
  static isBranchNode( nodeType: TreeifierNodeTypes): boolean{
    return BranchTypesArray.includes(nodeType);
  }
  // TODO: change to instance function...
  static isLeaf( candidate: any ): boolean {
    return TreeifierNodeParser.isLeafNode(TreeifierNodeParser.getNodeType(candidate));
  }
  // TODO: change to instance function...
  static isBranch( candidate: any ): boolean {
    return TreeifierNodeParser.isBranchNode(TreeifierNodeParser.getNodeType(candidate));
  }

}
