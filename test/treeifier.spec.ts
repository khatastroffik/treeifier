/* eslint-disable @typescript-eslint/no-array-constructor */
/**
 * treeifier 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import 'jest-extended';
import { Treeifier, NodeType } from "../src/treeifier";


const func = (): void => { return };
const symb = Symbol( 'test-symbol' );
const date = new Date();
const emptyObject = { 1: 1 };
delete emptyObject[1];
const aTestObject: any = {};
aTestObject.test = '#';
aTestObject.toString = (): string => { return 'from toString' };
const aClassInstance = new Treeifier();

describe( 'treeifier', () => {
  it( 'should not parse non exisiting objects', () => {
    const treeifier = new Treeifier();
    const z: any = null;
    expect( () => treeifier.parse( z ) ).toThrow( 'Cannot parse non exisiting object.' );
  } );

  describe( 'static functions', () => {
    it( 'should identify strings', () => {
      /* strings */
      expect( Treeifier.isString( `a string` ) ).toBeTrue();
      expect( Treeifier.isString( 'a string' ) ).toBeTrue();
      expect( Treeifier.isString( '' ) ).toBeTrue();
      expect( Treeifier.isString( new String( 'a' ) ) ).toBeTrue();
      /* others */
      expect( Treeifier.isString( null ) ).toBeFalse();
      expect( Treeifier.isString( undefined ) ).toBeFalse();
      expect( Treeifier.isString( {} ) ).toBeFalse();
      expect( Treeifier.isString( [] ) ).toBeFalse();
      expect( Treeifier.isString( 123 ) ).toBeFalse();
      expect( Treeifier.isString( NaN ) ).toBeFalse();
      expect( Treeifier.isString( true ) ).toBeFalse();
      expect( Treeifier.isString( func ) ).toBeFalse();
      expect( Treeifier.isString( symb ) ).toBeFalse();
      expect( Treeifier.isString( symb ) ).toBeFalse();
      expect( Treeifier.isString( date ) ).toBeFalse();

    } );
    it( 'should identify numbers', () => {
      /* numbers */
      expect( Treeifier.isNumber( 123 ) ).toBeTrue();
      expect( Treeifier.isNumber( NaN ) ).toBeTrue();
      expect( Treeifier.isNumber( Infinity ) ).toBeTrue();
      expect( Treeifier.isNumber( new Number( 123 ) ) ).toBeTrue();
      /* others */
      expect( Treeifier.isNumber( null ) ).toBeFalse();
      expect( Treeifier.isNumber( undefined ) ).toBeFalse();
      expect( Treeifier.isNumber( {} ) ).toBeFalse();
      expect( Treeifier.isNumber( [] ) ).toBeFalse();
      expect( Treeifier.isNumber( 'a string' ) ).toBeFalse();
      expect( Treeifier.isNumber( true ) ).toBeFalse();
      expect( Treeifier.isNumber( func ) ).toBeFalse();
      expect( Treeifier.isNumber( symb ) ).toBeFalse();
      expect( Treeifier.isNumber( date ) ).toBeFalse();
    } );
    it( 'should identify arrays', () => {
      /* arrays */
      expect( Treeifier.isArray( [] ) ).toBeTrue();
      expect( Treeifier.isArray( [1, 2, 3] ) ).toBeTrue();
      expect( Treeifier.isArray( [{}, {}, {}] ) ).toBeTrue();
      expect( Treeifier.isArray( new Array( 1, 2, 3 ) ) ).toBeTrue();
      expect( Treeifier.isArray( new Array( 0 ) ) ).toBeTrue();
      /* others */
      expect( Treeifier.isArray( true ) ).toBeFalse();
      expect( Treeifier.isArray( null ) ).toBeFalse();
      expect( Treeifier.isArray( undefined ) ).toBeFalse();
      expect( Treeifier.isArray( {} ) ).toBeFalse();
      expect( Treeifier.isArray( 'a string' ) ).toBeFalse();
      expect( Treeifier.isArray( new String( 'a string' ) ) ).toBeFalse();
      expect( Treeifier.isArray( 123 ) ).toBeFalse();
      expect( Treeifier.isArray( NaN ) ).toBeFalse();
      expect( Treeifier.isArray( func ) ).toBeFalse();
      expect( Treeifier.isArray( symb ) ).toBeFalse();
      expect( Treeifier.isArray( date ) ).toBeFalse();
    } );
    it( 'should identify booleans', () => {
      /* booleans */
      expect( Treeifier.isBoolean( true ) ).toBeTrue();
      expect( Treeifier.isBoolean( false ) ).toBeTrue();
      expect( Treeifier.isBoolean( new Boolean ) ).toBeTrue();
      expect( Treeifier.isBoolean( new Boolean( 1 ) ) ).toBeTrue();
      expect( Treeifier.isBoolean( new Boolean( false ) ) ).toBeTrue();
      expect( Treeifier.isBoolean( new Boolean( '#' ) ) ).toBeTrue();
      /* others */
      expect( Treeifier.isBoolean( null ) ).toBeFalse();
      expect( Treeifier.isBoolean( undefined ) ).toBeFalse();
      expect( Treeifier.isBoolean( 'a string' ) ).toBeFalse();
      expect( Treeifier.isBoolean( {} ) ).toBeFalse();
      expect( Treeifier.isBoolean( [] ) ).toBeFalse();
      expect( Treeifier.isBoolean( 123 ) ).toBeFalse();
      expect( Treeifier.isBoolean( NaN ) ).toBeFalse();
      expect( Treeifier.isBoolean( func ) ).toBeFalse();
      expect( Treeifier.isBoolean( symb ) ).toBeFalse();
      expect( Treeifier.isBoolean( date ) ).toBeFalse();
    } );
    it( 'should identify dates', () => {
      /* dates */
      expect( Treeifier.isDate( date ) ).toBeTrue();
      /* others */
      expect( Treeifier.isDate( null ) ).toBeFalse();
      expect( Treeifier.isDate( undefined ) ).toBeFalse();
      expect( Treeifier.isDate( 'a string' ) ).toBeFalse();
      expect( Treeifier.isDate( '2020-01-01T01:01:01.000Z' ) ).toBeFalse();
      expect( Treeifier.isDate( {} ) ).toBeFalse();
      expect( Treeifier.isDate( [] ) ).toBeFalse();
      expect( Treeifier.isDate( 123 ) ).toBeFalse();
      expect( Treeifier.isDate( NaN ) ).toBeFalse();
      expect( Treeifier.isDate( func ) ).toBeFalse();
      expect( Treeifier.isDate( symb ) ).toBeFalse();
      expect( Treeifier.isDate( true ) ).toBeFalse();
    } );
    it( 'should identify a function', () => {
      /* functions */
      expect( Treeifier.isFunction( func ) ).toBeTrue();
      expect( Treeifier.isFunction( () => { return } ) ).toBeTrue();
      expect( Treeifier.isFunction( new Function() ) ).toBeTrue();
      expect( Treeifier.isFunction( Object.create ) ).toBeTrue(); // a class function
      expect( Treeifier.isFunction( Object ) ).toBeTrue(); // a class constructor
      /* others */
      expect( Treeifier.isFunction( null ) ).toBeFalse();
      expect( Treeifier.isFunction( undefined ) ).toBeFalse();
      expect( Treeifier.isFunction( 'a string' ) ).toBeFalse();
      expect( Treeifier.isFunction( {} ) ).toBeFalse();
      expect( Treeifier.isFunction( [] ) ).toBeFalse();
      expect( Treeifier.isFunction( 123 ) ).toBeFalse();
      expect( Treeifier.isFunction( NaN ) ).toBeFalse();
      expect( Treeifier.isFunction( symb ) ).toBeFalse();
      expect( Treeifier.isFunction( date ) ).toBeFalse();
      expect( Treeifier.isFunction( true ) ).toBeFalse();
    } );
    it( 'should identify a symbol', () => {
      /* symbols */
      expect( Treeifier.isSymbol( symb ) ).toBeTrue();
      expect( Treeifier.isSymbol( Symbol() ) ).toBeTrue();
      /* others */
      expect( Treeifier.isSymbol( null ) ).toBeFalse();
      expect( Treeifier.isSymbol( undefined ) ).toBeFalse();
      expect( Treeifier.isSymbol( 'a string' ) ).toBeFalse();
      expect( Treeifier.isSymbol( {} ) ).toBeFalse();
      expect( Treeifier.isSymbol( [] ) ).toBeFalse();
      expect( Treeifier.isSymbol( 123 ) ).toBeFalse();
      expect( Treeifier.isSymbol( NaN ) ).toBeFalse();
      expect( Treeifier.isSymbol( date ) ).toBeFalse();
      expect( Treeifier.isSymbol( true ) ).toBeFalse();
    } );

    it( 'should identify values', () => {
      /* values */
      expect( Treeifier.isValue( '' ) ).toBeTrue();
      expect( Treeifier.isValue( 'a string' ) ).toBeTrue();
      expect( Treeifier.isValue( new String() ) ).toBeTrue();
      expect( Treeifier.isValue( 123 ) ).toBeTrue();
      expect( Treeifier.isValue( NaN ) ).toBeTrue();
      expect( Treeifier.isValue( Infinity ) ).toBeTrue();
      expect( Treeifier.isValue( new Number( 1 ) ) ).toBeTrue();
      expect( Treeifier.isValue( NaN ) ).toBeTrue();
      expect( Treeifier.isValue( true ) ).toBeTrue();
      expect( Treeifier.isValue( false ) ).toBeTrue();
      expect( Treeifier.isValue( new Boolean( 1 ) ) ).toBeTrue();
      expect( Treeifier.isValue( func ) ).toBeTrue();
      expect( Treeifier.isValue( () => { return } ) ).toBeTrue();
      expect( Treeifier.isValue( new Function() ) ).toBeTrue();
      expect( Treeifier.isValue( Object.create ) ).toBeTrue(); // function
      expect( Treeifier.isValue( Object ) ).toBeTrue(); // constructor function
      expect( Treeifier.isValue( symb ) ).toBeTrue();
      expect( Treeifier.isValue( Symbol() ) ).toBeTrue();
      expect( Treeifier.isValue( null ) ).toBeTrue();
      expect( Treeifier.isValue( undefined ) ).toBeTrue();
      /* others */
      expect( Treeifier.isValue( {} ) ).toBeFalse();
      expect( Treeifier.isValue( emptyObject ) ).toBeFalse();
      expect( Treeifier.isValue( ['a', 'b'] ) ).toBeFalse();
      expect( Treeifier.isValue( [] ) ).toBeFalse();
      expect( Treeifier.isValue( new Array( 3 ) ) ).toBeFalse();
    } );
    it( 'should identify null or undefined objects as "empty" ', () => {
      /* empty objects */
      expect( Treeifier.isEmpty( null ) ).toBeTrue();
      expect( Treeifier.isEmpty( undefined ) ).toBeTrue();
      /* others */
      expect( Treeifier.isEmpty( {} ) ).toBeFalse();
      expect( Treeifier.isEmpty( emptyObject ) ).toBeFalse();
      expect( Treeifier.isEmpty( NaN ) ).toBeFalse();
      expect( Treeifier.isEmpty( [] ) ).toBeFalse();
      expect( Treeifier.isEmpty( new Object() ) ).toBeFalse();
      expect( Treeifier.isEmpty( '' ) ).toBeFalse();
      expect( Treeifier.isEmpty( 'a string' ) ).toBeFalse();
      expect( Treeifier.isEmpty( 123 ) ).toBeFalse();
      expect( Treeifier.isEmpty( func ) ).toBeFalse();
      expect( Treeifier.isEmpty( date ) ).toBeFalse();
      expect( Treeifier.isEmpty( true ) ).toBeFalse();
      expect( Treeifier.isEmpty( Object ) ).toBeFalse();
      expect( Treeifier.isEmpty( Object.create ) ).toBeFalse();
      expect( Treeifier.isEmpty( new Function() ) ).toBeFalse();
      expect( Treeifier.isEmpty( Symbol() ) ).toBeFalse();

    } );

  } );
  describe( 'tree node functions', () => {
    it( 'should identify leafs', () => {
      expect( Treeifier.isLeaf( null ) ).toBeTrue();
      expect( Treeifier.isLeaf( '' ) ).toBeTrue();
      expect( Treeifier.isLeaf( 'a string' ) ).toBeTrue();
      expect( Treeifier.isLeaf( new String() ) ).toBeTrue();
      expect( Treeifier.isLeaf( new String( 'a' ) ) ).toBeTrue();
      expect( Treeifier.isLeaf( 123 ) ).toBeTrue();
      expect( Treeifier.isLeaf( new Number( 123 ) ) ).toBeTrue();
      expect( Treeifier.isLeaf( NaN ) ).toBeTrue();
      expect( Treeifier.isLeaf( Infinity ) ).toBeTrue();
      expect( Treeifier.isLeaf( true ) ).toBeTrue();
      expect( Treeifier.isLeaf( false ) ).toBeTrue();
      expect( Treeifier.isLeaf( new Boolean() ) ).toBeTrue();
      expect( Treeifier.isLeaf( new Boolean( 'x' ) ) ).toBeTrue();
      expect( Treeifier.isLeaf( func ) ).toBeTrue();
      expect( Treeifier.isLeaf( new Function() ) ).toBeTrue();
      expect( Treeifier.isLeaf( () => { return } ) ).toBeTrue();
      expect( Treeifier.isLeaf( symb ) ).toBeTrue();
      expect( Treeifier.isLeaf( Symbol() ) ).toBeTrue();
      expect( Treeifier.isLeaf( {} ) ).toBeTrue();
      expect( Treeifier.isLeaf( emptyObject ) ).toBeTrue();
      expect( Treeifier.isLeaf( [] ) ).toBeTrue();
      expect( Treeifier.isLeaf( new Array() ) ).toBeTrue();
      expect( Treeifier.isLeaf( new Array( 1, 2, 3 ) ) ).toBeTrue();
      expect( Treeifier.isLeaf( new Array( 2 ) ) ).toBeTrue();
      expect( Treeifier.isLeaf( symb ) ).toBeTrue();
      expect( Treeifier.isLeaf( symb ) ).toBeTrue();
      expect( Treeifier.isLeaf( symb ) ).toBeTrue();
      expect( Treeifier.isLeaf( symb ) ).toBeTrue();


    } );

    it( 'should recognize the node type', () => {
      /* test strings */
      expect( Treeifier.getNodeType( '' ) ).toBe( NodeType.string );
      expect( Treeifier.getNodeType( 'a string' ) ).toBe( NodeType.string );
      expect( Treeifier.getNodeType( new String() ) ).toBe( NodeType.string );
      expect( Treeifier.getNodeType( new String( 'a' ) ) ).toBe( NodeType.string );
      /* test numbers */
      expect( Treeifier.getNodeType( 123 ) ).toBe( NodeType.number );
      expect( Treeifier.getNodeType( NaN ) ).toBe( NodeType.number );
      expect( Treeifier.getNodeType( Infinity ) ).toBe( NodeType.number );
      expect( Treeifier.getNodeType( new Number() ) ).toBe( NodeType.number );
      expect( Treeifier.getNodeType( new Number( 123 ) ) ).toBe( NodeType.number );
      expect( Treeifier.getNodeType( new Number( NaN ) ) ).toBe( NodeType.number );
      expect( Treeifier.getNodeType( new Object( 123 ) ) ).toBe( NodeType.number );
      expect( Treeifier.getNodeType( new Object( NaN ) ) ).toBe( NodeType.number );
      /* test booleans */
      expect( Treeifier.getNodeType( true ) ).toBe( NodeType.boolean );
      expect( Treeifier.getNodeType( false ) ).toBe( NodeType.boolean );
      expect( Treeifier.getNodeType( new Boolean() ) ).toBe( NodeType.boolean );
      expect( Treeifier.getNodeType( new Boolean( 1 ) ) ).toBe( NodeType.boolean );
      expect( Treeifier.getNodeType( new Object( true ) ) ).toBe( NodeType.boolean );
      /* test functions */
      expect( Treeifier.getNodeType( func ) ).toBe( NodeType.function );
      expect( Treeifier.getNodeType( () => { return } ) ).toBe( NodeType.function );
      expect( Treeifier.getNodeType( new Function() ) ).toBe( NodeType.function );
      expect( Treeifier.getNodeType( Object.create ) ).toBe( NodeType.function );
      expect( Treeifier.getNodeType( Object ) ).toBe( NodeType.function );
      expect( Treeifier.getNodeType( new Object( func ) ) ).toBe( NodeType.function );
      /* test symbols */
      expect( Treeifier.getNodeType( symb ) ).toBe( NodeType.symbol );
      expect( Treeifier.getNodeType( Symbol() ) ).toBe( NodeType.symbol );
      /* test emptyness: null or undefined */
      expect( Treeifier.getNodeType( null ) ).toBe( NodeType.empty );
      expect( Treeifier.getNodeType( undefined ) ).toBe( NodeType.empty );
      /* test empty objects */
      expect( Treeifier.getNodeType( {} ) ).toBe( NodeType.emptyObject );
      expect( Treeifier.getNodeType( new Object() ) ).toBe( NodeType.emptyObject );
      expect( Treeifier.getNodeType( emptyObject ) ).toBe( NodeType.emptyObject );
      expect( Treeifier.getNodeType( new Object( null ) ) ).toBe( NodeType.emptyObject );
      expect( Treeifier.getNodeType( new Object( undefined ) ) ).toBe( NodeType.emptyObject );
      expect( Treeifier.getNodeType( new Object( {} ) ) ).toBe( NodeType.emptyObject );
      expect( Treeifier.getNodeType( new Object( emptyObject ) ) ).toBe( NodeType.emptyObject );
      expect( Treeifier.getNodeType( new Object( 123 ) ) ).not.toBe( NodeType.emptyObject );
      /* non-empty objects */
      expect( Treeifier.getNodeType( { 1: 1 } ) ).toBe( NodeType.nonEmptyObject );
      expect( Treeifier.getNodeType( aClassInstance ) ).toBe( NodeType.nonEmptyObject );
      expect( Treeifier.getNodeType( new Object( aClassInstance ) ) ).toBe( NodeType.nonEmptyObject );
      expect( Treeifier.getNodeType( new Object( aTestObject ) ) ).toBe( NodeType.nonEmptyObject );
      /* arrays, which are not "array of objects" */
      expect( Treeifier.getNodeType( [] ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( [1, 2, 3] ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( ['#', null, 3] ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( [undefined, null, undefined] ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( [new Object( 123 ), new Object( 456 )] ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( new Array( 1, 2, 3 ) ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( new Array( undefined, null, undefined ) ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( new Array( 1 ) ) ).toBe( NodeType.array );
      expect( Treeifier.getNodeType( [new Array(), new Array()] ) ).toBe( NodeType.array );
      /* arrays of (non-value) objects - ALL items are objects */
      expect( Treeifier.getNodeType( [{}] ) ).toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [{}, {}, {}] ) ).toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [aTestObject] ) ).toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [aClassInstance, aTestObject] ) ).toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [new Object(), new Object(), new Object()] ) ).toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [new Treeifier(), {}, new Treeifier(), {}] ) ).toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [new Treeifier()] ) ).toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( new Object( new Array( {}, aTestObject, aClassInstance ) ) ) ).toBe( NodeType.arrayofobjects );
      /* test "invalid" array of objects -> those are "standard arrays" */
      expect( Treeifier.getNodeType( [new Object( 123 ), new Object( 456 )] ) ).not.toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [new Date(), new Date(), new Date()] ) ).not.toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [aClassInstance, aTestObject, null] ) ).not.toBe( NodeType.arrayofobjects );
      expect( Treeifier.getNodeType( [new Array(), new Array()] ) ).not.toBe( NodeType.arrayofobjects );

    } );
  } );
  describe( 'parser', () => {
    // const testobject1 = { 'a': 1, 'b': { c: 2, d: 3 }, e: [1, 2, 3], f: { g: new Date(), h: 'a string', i: null, k: (): boolean => { return true } } };
    const testobject1 = {
      "a": "toto was here",
      "b": {
        "c": 123,
        "d": NaN
      },
      "e": [1, 2, 3],
      "f": {
        "g": new Date(),
        "h": "a string",
        "i": null,
        "j": undefined,
        "k": (): boolean => {return true },
      "l": [
        {
          "first": "Elvis has just left the building",
          "second": ["a","b","c"],
          "third": true,
          "fourth": 'should be a symbol',//Symbol("atari")
        },
        {
          "Min": -123,
          "max": Infinity
        }
      ]
      }
    };
    
    it( 'should work...', () => {
      const tree = new Treeifier();
      console.log( tree.parse( testobject1 ).join( '\n' ) );
      expect( true ).toBeTrue();
    } );

  } );
} );

/*

Test objects:


var person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    alert(this.name[0] + ' ' + this.name[1] +
    ' is ' + this.age + ' years old. He likes ' +
    this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};


*/
