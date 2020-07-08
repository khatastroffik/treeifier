/**
 * @khatastroffik/treeifier :: TREEIFIER SAMPLE NODEJS APP
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

/**** import the Treeifier class definition from the library ****/
const Treeifier = require( '@khatastroffik/treeifier' ).Treeifier;

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
customProcessor = ( node ) => {
  let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' );
  if ( node.isBranch ) {
    node.children.forEach( ( child ) => {
      child.processResult && ( result = result + '\n' + child.processResult )
    } );
  }
  return result;
}

/**** instanciate Treeifier and register the custom processor to be used by default (instead of the "standard" default processor from the Treeifier class) ****/
const treeifier = new Treeifier( customProcessor );

/**** use the Treeifier instance to process the input object, providing a specific label for the inputObject (instead of the default "root" label) ****/
console.log( treeifier.process( inputObject, 'object-label' ) );
