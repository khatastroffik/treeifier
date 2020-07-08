/**
 * @khatastroffik/treeifier :: TREEIFIER-UTILS SAMPLE NODEJS APP
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

/**** import the Treeifier and TreeifierUtils class definitions from the corresponding libraries ****/
const Treeifier = require( '@khatastroffik/treeifier' ).Treeifier;
const TreeifierUtils = require( '@khatastroffik/treeifier-utils' ).TreeifierUtils;

/**** import chalk to be able to modify the colors of the output ****/
const chalk = require( 'chalk' );

/**** Test object ****/
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

/*******************/
/**** EXAMPLE 1 ****/
/*******************/

console.log( '---- 1 show VALUES using custom colors ----' );

/**** modify the colors to be used by the TreeifierUtils processor ****/
TreeifierUtils.KeyColor = chalk.redBright;
TreeifierUtils.StructureColor = chalk.yellowBright;
TreeifierUtils.ValueColor = chalk.hex( '#57c3ea' );

/**** instanciate Treeifier and register the TreeifierUtils processor to be used by default instead of the "standard" default processor from the Treeifier class ****/
const treeifier1 = new Treeifier( TreeifierUtils.defaultColoredValuesProcessor );

/**** use the Treeifier instance to process the input object (here without sepcifying a label i.e. the output is using the default label) ****/
console.log( treeifier1.process( inputObject ) );

/*******************/
/**** EXAMPLE 2 ****/
/*******************/

console.log( '---- 2 show value TYPES with colors reset to default ----' );

/**** instanciate Treeifier ****/
const treeifier2 = new Treeifier();

/**** reset all colors to their default values ****/
TreeifierUtils.resetAllColors();

/**** use the previous Treeifier instance with another processor (rendering the types of the values) from the TreeifierUtils library i.e. bypassing the default set previously ****/
console.log( treeifier2.process( inputObject, '', TreeifierUtils.defaultColoredTypesProcessor ) );
