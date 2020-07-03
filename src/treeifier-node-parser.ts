/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @khatastroffik/treeifier :: Treeifier node parser and node type
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

// TODO: allow the client app to redefine/modify the criteria used to identify/differentiate between "leaf" and "branch" nodes.

/**
 * The TreeifierNodeTypes describes the possible types of values stored in the tree nodes.
 * Beside "pure" value types, compounds or "complex" types are defined.
 *
 * @export
 * @enum {number}
 */
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

/**
 * HELPER Filter/Criteria indentifying all kind of nodes
 */
const DefaultNodeTypesArray: Array<TreeifierNodeTypes> = [
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

/**
 * Filter/Criteria indentifying a "pure value" node
 */
const DefaultNodeValueTypesArray : Array<TreeifierNodeTypes> = [
  TreeifierNodeTypes.empty,
  TreeifierNodeTypes.string,
  TreeifierNodeTypes.number,
  TreeifierNodeTypes.boolean,
  TreeifierNodeTypes.date,
  TreeifierNodeTypes.function,
  TreeifierNodeTypes.symbol,

];

/**
 * Filter/Criteria indentifying a "LEAF" node
 */
const DefaultLeafTypesArray: Array<TreeifierNodeTypes> = [
  ...DefaultNodeValueTypesArray,
  TreeifierNodeTypes.unknown,  
  TreeifierNodeTypes.array,
  TreeifierNodeTypes.emptyObject
];

/**
 * Filter/Criteria indentifying a "BRANCH" node - automatically generated out of the "LeafTypesArray"...
 */
const DefaultBranchTypesArray: Array<TreeifierNodeTypes> = DefaultNodeTypesArray.filter(x => !DefaultLeafTypesArray.includes(x));

/**
 * Abstract class used to create Treeifier Node objects (TreeifierNode)
 * The static methods of this class are used to analyze and parse the item given as input to Treeifier.
 * The results of those methods help to instanciate the corresponding tree nodes (TreeifierNode).
 * 
 * The methods "isLeafNode", "isLeaf", "isBranchNode" and "isBranch" are intended to be adjustable i.e.:
 * The client application should be able to adapt the results of those methods to its needs.
 * For that purpose, the predefined arrays "BranchTypesArray" and "LeafTypesArray" should be modified.
 * NOTE: TO BE DONE!
 * 
 * @export
 * @abstract
 * @class TreeifierNodeParser
 */
export abstract class TreeifierNodeParser {
  private static _branchTypes: Array<TreeifierNodeTypes> = DefaultBranchTypesArray;
  private static _leafTypes: Array<TreeifierNodeTypes> = DefaultLeafTypesArray;

  public static get leafTypes() : Array<TreeifierNodeTypes> {
    return [...TreeifierNodeParser._leafTypes]; // shallow copy to protect the array
  }
  public  static set leafTypes(newLeafTypes: Array<TreeifierNodeTypes>) {
    TreeifierNodeParser._leafTypes= [...newLeafTypes]; // shallow copy to protect the array
    TreeifierNodeParser._branchTypes = DefaultNodeTypesArray.filter(x => !TreeifierNodeParser._leafTypes.includes(x));
  }
  public static get branchTypes() : Array<TreeifierNodeTypes> {
    return [...TreeifierNodeParser._branchTypes]; // shallow copy to protect the array
  }
  public  static set branchTypes(newBranchTypes: Array<TreeifierNodeTypes>) {
    TreeifierNodeParser._branchTypes= [...newBranchTypes]; // shallow copy to protect the array
    TreeifierNodeParser._leafTypes = DefaultNodeTypesArray.filter(x => !TreeifierNodeParser._branchTypes.includes(x));
  }
  public static resetLeafAndBranchTypes():void{
    TreeifierNodeParser._branchTypes = DefaultBranchTypesArray;
    TreeifierNodeParser._leafTypes = DefaultLeafTypesArray;
  }
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
    return DefaultNodeValueTypesArray.includes(nodeType);
  }
  static isLeafNode(nodeType: TreeifierNodeTypes): boolean{
    return TreeifierNodeParser._leafTypes.includes(nodeType);
  }
  static isBranchNode( nodeType: TreeifierNodeTypes): boolean{
    return TreeifierNodeParser._branchTypes.includes(nodeType);
  }
  static isLeaf( candidate: any ): boolean {
    return TreeifierNodeParser.isLeafNode(TreeifierNodeParser.getNodeType(candidate));
  }
  static isBranch( candidate: any ): boolean {
    return TreeifierNodeParser.isBranchNode(TreeifierNodeParser.getNodeType(candidate));
  }
}
