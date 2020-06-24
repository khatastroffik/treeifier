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

import { TreeifierNodeParser, TreeifierNodeTypes } from "./TreeifierNodeParser";

export type TreeSortFunction = ( objPropA: [string, unknown], objPropB: [string, unknown] ) => number;


export class Treeifier {

  private output: Array<string> = [];

  private joint( index: number, maxIndex: number ): string {
    return ( index == maxIndex ) ? '└─ ' : '├─ ';
  }

  private updatePrefix( currentPrefix: string, remainingParent: number ): string {
    return currentPrefix + ( ( remainingParent == 0 ) ? '   ' : '│  ' );
  }

  private pushToOutput( prefix: string, index: number, maxIndex: number, label: string, value: any, valueType: TreeifierNodeTypes ): void {
    const text = prefix + this.joint( index, maxIndex ) + label + ` (${TreeifierNodeTypes[valueType]})` + ( value ? ': ' + value : '' );
    // const text = prefix + this.joint( index, maxIndex ) + label + ( value ? ': ' + value : '' );
    this.output.push( text );
  }

  private parseInternal( inObject: Record<string, unknown>, depth: number, prefix: string ): void {
    //const objectType = Treeifier.getNodeType(inObject);
    const maxIndex = inObject && Object.entries( inObject ).length - 1;
    const entries = Object.entries( inObject );
    entries.forEach( ( [key, value], index ) => {
      const valueType = TreeifierNodeParser.getNodeType( value );
      if ( TreeifierNodeParser.isLeaf( value )) {
        this.pushToOutput( prefix, index, maxIndex, key, value, valueType );
        return;
      }
      this.pushToOutput( prefix, index, maxIndex, key, '', valueType );
      if ( valueType === TreeifierNodeTypes.arrayofobjects ) {
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
