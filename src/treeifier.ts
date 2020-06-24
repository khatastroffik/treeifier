/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @khatastroffik/treeifier :: Treeifier (parser)
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

// TODO:  handle circular references properly

// import { TreeifierNodeParser, TreeifierNodeTypes } from "./TreeifierNodeParser";

export type TreeSortFunction = ( objPropA: [string, unknown], objPropB: [string, unknown] ) => number;

export enum NodeType {
  unknown = 0,
  empty = 1,
  string = 2,
  number = 3,
  boolean = 4,
  date = 5,
  array = 6,
  function = 7,
  symbol = 8,
  emptyObject = 9,
  nonEmptyObject = 10,
  arrayofobjects = 11
}
const LeafNodes: Array<NodeType> = [
  NodeType.unknown,
  NodeType.empty,
  NodeType.string,
  NodeType.number,
  NodeType.boolean,
  NodeType.date,
  NodeType.array,
  NodeType.function,
  NodeType.symbol,
  NodeType.emptyObject
];

export class Treeifier {

  private output: Array<string> = [];

  static isArray( candidate: any ): boolean {
    return Array.isArray( candidate );
  }
  static isEmpty( candidate: any ): boolean {
    return ( candidate === null ) || ( candidate === undefined );
  }
  static isObject(candidate: any): boolean{
    return candidate && ( typeof candidate === 'object' ) && !Treeifier.isArray( candidate ) && !Treeifier.isValue( candidate );
  }
  static isNonEmptyObject( candidate: any ): boolean {
    return ( typeof candidate === 'object' ) && ( Object.getOwnPropertyNames( candidate ).length > 0 );
  }
  static isEmptyObject( candidate: any ): boolean {
    return ( typeof candidate === 'object' ) && ( Object.getOwnPropertyNames( candidate ).length == 0 );
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
    return Treeifier.isArray( candidate ) &&
      !Treeifier.isEmptyArray( candidate ) &&
      ( <any[]>candidate ).every( item => Treeifier.isObject(item)); // item && ( typeof item === 'object' ) && !Treeifier.isArray( item ) && !Treeifier.isValue( item ) )
  }

  /* ===== Tests for leafs ===== */
  static isValue( candidate: any ): boolean {
    return Treeifier.isString( candidate ) ||
      Treeifier.isNumber( candidate ) ||
      Treeifier.isBoolean( candidate ) ||
      Treeifier.isDate( candidate ) ||
      Treeifier.isFunction( candidate ) ||
      Treeifier.isSymbol( candidate ) ||
      Treeifier.isEmpty( candidate );
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
  static isLeaf( candidate: any ): boolean {
    return LeafNodes.includes(Treeifier.getNodeType(candidate));
  }
  static isLeafNode( nodeValueType: NodeType ): boolean {
    return LeafNodes.includes( nodeValueType );
  }
  static getNodeType( nodeItem: any ): NodeType {
    let result: NodeType = NodeType.unknown;
    ( Treeifier.isString( nodeItem ) && ( result = NodeType.string ) ) ||
      ( Treeifier.isNumber( nodeItem ) && ( result = NodeType.number ) ) ||
      ( Treeifier.isBoolean( nodeItem ) && ( result = NodeType.boolean ) ) ||
      ( Treeifier.isDate( nodeItem ) && ( result = NodeType.date ) ) ||
      ( Treeifier.isFunction( nodeItem ) && ( result = NodeType.function ) ) ||
      ( Treeifier.isSymbol( nodeItem ) && ( result = NodeType.symbol ) ) ||
      ( Treeifier.isEmpty( nodeItem ) && ( result = NodeType.empty ) ) ||
      ( Treeifier.isArray( nodeItem ) && ( result = Treeifier.isArrayOfObjects( nodeItem )? NodeType.arrayofobjects: NodeType.array ) ) ||
      ( Treeifier.isEmptyObject( nodeItem ) && ( result = NodeType.emptyObject ) ) ||
      ( Treeifier.isNonEmptyObject( nodeItem ) && ( result = NodeType.nonEmptyObject ) );
    return result;
  }
  private joint( index: number, maxIndex: number ): string {
    return ( index == maxIndex ) ? '└─ ' : '├─ ';
  }

  private updatePrefix( currentPrefix: string, remainingParent: number ): string {
    return currentPrefix + ( ( remainingParent == 0 ) ? '   ' : '│  ' );
  }

  private pushToOutput( prefix: string, index: number, maxIndex: number, label: string, value?: any, valueType: NodeType = NodeType.unknown ): void {
    const text = prefix + this.joint( index, maxIndex ) + label + ` (${NodeType[valueType]})` + ( value ? ': ' + value : '' );
    // const text = prefix + this.joint( index, maxIndex ) + label + ( value ? ': ' + value : '' );
    this.output.push( text );
  }

  private parseInternal( inObject: Record<string, unknown>, depth: number, prefix: string ): void {
    //const objectType = Treeifier.getNodeType(inObject);
    const maxIndex = inObject && Object.entries( inObject ).length - 1;
    const entries = Object.entries( inObject );
    entries.forEach( ( [key, value], index ) => {
      const valueType = Treeifier.getNodeType( value );
      if ( Treeifier.isLeaf( value )) {
        this.pushToOutput( prefix, index, maxIndex, key, value, valueType );
        return;
      }
      this.pushToOutput( prefix, index, maxIndex, key, '', valueType );
      if ( valueType === NodeType.arrayofobjects ) {
        Array( value ).forEach( element => {
          this.parseInternal( element as Record<string, unknown>, depth + 1, this.updatePrefix( prefix, maxIndex - index ) );
        } );
      } else {
        this.parseInternal( value as Record<string, unknown>, depth + 1, this.updatePrefix( prefix, maxIndex - index ) );
      }

    } );

    return;
  }

  parse( objectToParse: Record<string, unknown> ): Array<string> {
    this.output = [];
    if ( !objectToParse ) throw new Error( 'Cannot parse non exisiting object.' );
    this.parseInternal( objectToParse, 0, '' );
    return this.output;
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
