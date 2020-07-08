/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @khatastroffik/treeifier :: TREEIFIER SAMPLE TYPESCRIPT APP
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

/**** import the required class definitions and types from the library ****/
import { Treeifier, NodeProcessorFunction } from "@khatastroffik/treeifier";
import { TreeifierNode } from '@khatastroffik/treeifier/dist/treeifier-node';
import { TreeifierUtils } from "@khatastroffik/treeifier-utils";

/**** test object ****/
const inputObject = {
  "a": "Chuck Norris was here",
  "b": {
    "c": 123,
    "d": NaN
  },
  "e": [1, 2, 3],
  "f": {
    "g": new Date( 2020, 0, 1 ),
    "h": "a string",
    "i": null,
    "j": undefined,
    "k": function () { return true },
    "l": [
      {
        "first": "Elvis has just left the building",
        "second": ["a", "b", "c"],
        "third": true,
        "fourth": Symbol( "atari" )
      },
      {
        "Min": -123,
        "max": Infinity,
        mixed: ["a", 1, null, { objectID: 123 }],
        emptyobject: {}
      },
      {
        101: 'foo',
        姓名: 'bar',
        'foo': `\u59d3\u540d`,
        'bar': `姓名`,
        anotherone: {
          \u59d3\u540d: 'Alf'
        }
      }
    ]
  }
};

/**** example of a custom processor function ****/
const customProcessor: NodeProcessorFunction = ( node: TreeifierNode ): any => {
  let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' );
  if ( node.isBranch ) {
    node.children.forEach( ( child ) => {
      child.processResult && ( result = result + '\n' + child.processResult )
    } );
  }
  return result;
}

/************************************/
/**** FIRST EXAMPLE :: TREEIFIER ****/
/************************************/

console.log( '---- 1 ----' );

/**** instanciate Treeifier and register the custom processor to be used by default ****/
const treeifier = new Treeifier( customProcessor );

/**** use the Treeifier instance to process the input object, also define a specific label ****/
console.log( treeifier.process( inputObject, 'inputObjectLabel' ) );

/************************************************/
/**** SECOND EXAMPLE :: WITH TREEIFIER-UTILS ****/
/************************************************/

console.log( '---- 2 ----' );

/**** instanciate Treeifier and register the TreeifierUtils processor to be used by default ****/
const treeifier2 = new Treeifier( TreeifierUtils.defaultColoredValuesProcessor );

/**** use the Treeifier instance to process the input object (here without sepcifying a label i.e. the output is using the default label) ****/
console.log( treeifier2.process( inputObject ) );
