/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-array-constructor */
/**
 * @khatastroffik/treeifier :: Treeifier node parser and node type :: Tests
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import 'jest-extended';
import { TreeifierNodeParser, TreeifierNodeTypes } from "../src/treeifier-node-parser";

describe( 'treeifier node parser', () => {
  class TestClass { aValue = 'a value'; }
  // eslint-disable-next-line @typescript-eslint/ban-types
  let aFunction: Function;
  let aSymbol: symbol;
  let aDate: Date;
  let anEmptyObject: any;
  let aTestObject: any;
  let aClassInstance: TestClass;

  beforeAll( function () {
    aFunction = (): void => { return };
    aSymbol = Symbol( 'test-symbol' );
    aDate = new Date();
    anEmptyObject = { 1: 1 };
    delete anEmptyObject[1];
    aTestObject = {};
    aTestObject.test = '#';
    aTestObject.toString = (): string => { return 'from toString' };
    aClassInstance = new TestClass();
  } );

  describe( 'static functions', () => {
    it( 'should identify a string', () => {
      /* strings */
      expect( TreeifierNodeParser.isString( `a string` ) ).toBeTrue();
      expect( TreeifierNodeParser.isString( 'a string' ) ).toBeTrue();
      expect( TreeifierNodeParser.isString( '' ) ).toBeTrue();
      expect( TreeifierNodeParser.isString( new String( 'a' ) ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isString( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( true ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( aFunction ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isString( aDate ) ).toBeFalse();

    } );
    it( 'should identify a number', () => {
      /* numbers */
      expect( TreeifierNodeParser.isNumber( 123 ) ).toBeTrue();
      expect( TreeifierNodeParser.isNumber( NaN ) ).toBeTrue();
      expect( TreeifierNodeParser.isNumber( Infinity ) ).toBeTrue();
      expect( TreeifierNodeParser.isNumber( new Number( 123 ) ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isNumber( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( true ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( aFunction ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isNumber( aDate ) ).toBeFalse();
    } );
    it( 'should identify an array', () => {
      /* arrays */
      expect( TreeifierNodeParser.isArray( [] ) ).toBeTrue();
      expect( TreeifierNodeParser.isArray( [1, 2, 3] ) ).toBeTrue();
      expect( TreeifierNodeParser.isArray( [{}, {}, {}] ) ).toBeTrue();
      expect( TreeifierNodeParser.isArray( new Array( 1, 2, 3 ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isArray( new Array( 0 ) ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isArray( true ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( new String( 'a string' ) ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( aFunction ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isArray( aDate ) ).toBeFalse();
    } );
    it( 'should identify a booleans', () => {
      /* booleans */
      expect( TreeifierNodeParser.isBoolean( true ) ).toBeTrue();
      expect( TreeifierNodeParser.isBoolean( false ) ).toBeTrue();
      expect( TreeifierNodeParser.isBoolean( new Boolean ) ).toBeTrue();
      expect( TreeifierNodeParser.isBoolean( new Boolean( 1 ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isBoolean( new Boolean( false ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isBoolean( new Boolean( '#' ) ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isBoolean( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( aFunction ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isBoolean( aDate ) ).toBeFalse();
    } );
    it( 'should identify a date', () => {
      /* dates */
      expect( TreeifierNodeParser.isDate( aDate ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isDate( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( '2020-01-01T01:01:01.000Z' ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( aFunction ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isDate( true ) ).toBeFalse();
    } );
    it( 'should identify a function', () => {
      /* functions */
      expect( TreeifierNodeParser.isFunction( aFunction ) ).toBeTrue();
      expect( TreeifierNodeParser.isFunction( () => { return } ) ).toBeTrue();
      expect( TreeifierNodeParser.isFunction( new Function() ) ).toBeTrue();
      expect( TreeifierNodeParser.isFunction( Object.create ) ).toBeTrue(); // a class function
      expect( TreeifierNodeParser.isFunction( Object ) ).toBeTrue(); // a class constructor
      /* others */
      expect( TreeifierNodeParser.isFunction( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( aDate ) ).toBeFalse();
      expect( TreeifierNodeParser.isFunction( true ) ).toBeFalse();
    } );
    it( 'should identify a symbol', () => {
      /* symbols */
      expect( TreeifierNodeParser.isSymbol( aSymbol ) ).toBeTrue();
      expect( TreeifierNodeParser.isSymbol( Symbol() ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isSymbol( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( aDate ) ).toBeFalse();
      expect( TreeifierNodeParser.isSymbol( true ) ).toBeFalse();
    } );
    it( 'should identify a value', () => {
      /* values */
      expect( TreeifierNodeParser.isValue( '' ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( 'a string' ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( new String() ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( 123 ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( NaN ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( Infinity ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( new Number( 1 ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( NaN ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( true ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( false ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( new Boolean( 1 ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( aFunction ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( () => { return } ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( new Function() ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( Object.create ) ).toBeTrue(); // function
      expect( TreeifierNodeParser.isValue( Object ) ).toBeTrue(); // constructor function
      expect( TreeifierNodeParser.isValue( aSymbol ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( Symbol() ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( null ) ).toBeTrue();
      expect( TreeifierNodeParser.isValue( undefined ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isValue( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isValue( anEmptyObject ) ).toBeFalse();
      expect( TreeifierNodeParser.isValue( ['a', 'b'] ) ).toBeFalse();
      expect( TreeifierNodeParser.isValue( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isValue( new Array( 3 ) ) ).toBeFalse();
    } );
    it( 'should identify null or undefined objects as "empty" ', () => {
      /* empty objects */
      expect( TreeifierNodeParser.isEmpty( null ) ).toBeTrue();
      expect( TreeifierNodeParser.isEmpty( undefined ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isEmpty( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( anEmptyObject ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( new Object() ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( '' ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( aFunction ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( aDate ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( true ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( Object ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( Object.create ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( new Function() ) ).toBeFalse();
      expect( TreeifierNodeParser.isEmpty( Symbol() ) ).toBeFalse();

    } );
    it('should identify a non empty object', () => {
      /* non empty objects */
      expect(TreeifierNodeParser.isNonEmptyObject( {a:1})).toBeTrue();
      expect(TreeifierNodeParser.isNonEmptyObject(aTestObject)).toBeTrue();
      expect(TreeifierNodeParser.isNonEmptyObject(aClassInstance)).toBeTrue();
      /* others */
      expect(TreeifierNodeParser.isNonEmptyObject({})).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(anEmptyObject)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(aFunction)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(aSymbol)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(aDate)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject('a string')).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(123)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(NaN)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(true)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(null)).toBeFalse();
      expect(TreeifierNodeParser.isNonEmptyObject(undefined)).toBeFalse();

    });
  } );

  describe( 'tree node functions', () => {
    it( 'should identify leafs', () => {
      /* leafs */
      expect( TreeifierNodeParser.isLeaf( null ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( undefined ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( '' ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( 'a string' ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new String() ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new String( 'a' ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( 123 ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new Number( 123 ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( NaN ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( Infinity ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( true ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( false ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new Boolean() ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new Boolean( 'x' ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( aFunction ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new Function() ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( () => { return } ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( aSymbol ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( Symbol() ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( {} ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( anEmptyObject ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( [] ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new Array() ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new Array( 1, 2, 3 ) ) ).toBeTrue();
      expect( TreeifierNodeParser.isLeaf( new Array( 2 ) ) ).toBeTrue();
      /* others */
      expect( TreeifierNodeParser.isLeaf( [anEmptyObject, aClassInstance] ) ).toBeFalse();
      expect( TreeifierNodeParser.isLeaf( {a:1} ) ).toBeFalse();
      expect( TreeifierNodeParser.isLeaf( aClassInstance ) ).toBeFalse();
      expect( TreeifierNodeParser.isLeaf( aTestObject ) ).toBeFalse();
    } );

    it('should identify a branch', () => {
      /* branches */
      expect( TreeifierNodeParser.isBranch( [anEmptyObject, aClassInstance] ) ).toBeTrue();
      expect( TreeifierNodeParser.isBranch( {a:1} ) ).toBeTrue();
      expect( TreeifierNodeParser.isBranch( aClassInstance ) ).toBeTrue();
      expect( TreeifierNodeParser.isBranch( aTestObject ) ).toBeTrue();      
      /* others */
      expect( TreeifierNodeParser.isBranch( null ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( undefined ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( '' ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( 'a string' ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new String() ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new String( 'a' ) ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( 123 ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new Number( 123 ) ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( NaN ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( Infinity ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( true ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( false ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new Boolean() ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new Boolean( 'x' ) ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( aFunction ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new Function() ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( () => { return } ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( aSymbol ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( Symbol() ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( {} ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( anEmptyObject ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( [] ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new Array() ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new Array( 1, 2, 3 ) ) ).toBeFalse();
      expect( TreeifierNodeParser.isBranch( new Array( 2 ) ) ).toBeFalse();
      
    });
    it( 'should recognize the node type', () => {
      /* test strings */
      expect( TreeifierNodeParser.getNodeType( '' ) ).toBe( TreeifierNodeTypes.string );
      expect( TreeifierNodeParser.getNodeType( 'a string' ) ).toBe( TreeifierNodeTypes.string );
      expect( TreeifierNodeParser.getNodeType( new String() ) ).toBe( TreeifierNodeTypes.string );
      expect( TreeifierNodeParser.getNodeType( new String( 'a' ) ) ).toBe( TreeifierNodeTypes.string );
      /* test numbers */
      expect( TreeifierNodeParser.getNodeType( 123 ) ).toBe( TreeifierNodeTypes.number );
      expect( TreeifierNodeParser.getNodeType( NaN ) ).toBe( TreeifierNodeTypes.number );
      expect( TreeifierNodeParser.getNodeType( Infinity ) ).toBe( TreeifierNodeTypes.number );
      expect( TreeifierNodeParser.getNodeType( new Number() ) ).toBe( TreeifierNodeTypes.number );
      expect( TreeifierNodeParser.getNodeType( new Number( 123 ) ) ).toBe( TreeifierNodeTypes.number );
      expect( TreeifierNodeParser.getNodeType( new Number( NaN ) ) ).toBe( TreeifierNodeTypes.number );
      expect( TreeifierNodeParser.getNodeType( new Object( 123 ) ) ).toBe( TreeifierNodeTypes.number );
      expect( TreeifierNodeParser.getNodeType( new Object( NaN ) ) ).toBe( TreeifierNodeTypes.number );
      /* test booleans */
      expect( TreeifierNodeParser.getNodeType( true ) ).toBe( TreeifierNodeTypes.boolean );
      expect( TreeifierNodeParser.getNodeType( false ) ).toBe( TreeifierNodeTypes.boolean );
      expect( TreeifierNodeParser.getNodeType( new Boolean() ) ).toBe( TreeifierNodeTypes.boolean );
      expect( TreeifierNodeParser.getNodeType( new Boolean( 1 ) ) ).toBe( TreeifierNodeTypes.boolean );
      expect( TreeifierNodeParser.getNodeType( new Object( true ) ) ).toBe( TreeifierNodeTypes.boolean );
      /* test functions */
      expect( TreeifierNodeParser.getNodeType( aFunction ) ).toBe( TreeifierNodeTypes.function );
      expect( TreeifierNodeParser.getNodeType( () => { return } ) ).toBe( TreeifierNodeTypes.function );
      expect( TreeifierNodeParser.getNodeType( new Function() ) ).toBe( TreeifierNodeTypes.function );
      expect( TreeifierNodeParser.getNodeType( Object.create ) ).toBe( TreeifierNodeTypes.function );
      expect( TreeifierNodeParser.getNodeType( Object ) ).toBe( TreeifierNodeTypes.function );
      expect( TreeifierNodeParser.getNodeType( new Object( aFunction ) ) ).toBe( TreeifierNodeTypes.function );
      /* test symbols */
      expect( TreeifierNodeParser.getNodeType( aSymbol ) ).toBe( TreeifierNodeTypes.symbol );
      expect( TreeifierNodeParser.getNodeType( Symbol() ) ).toBe( TreeifierNodeTypes.symbol );
      /* test emptyness: null or undefined */
      expect( TreeifierNodeParser.getNodeType( null ) ).toBe( TreeifierNodeTypes.empty );
      expect( TreeifierNodeParser.getNodeType( undefined ) ).toBe( TreeifierNodeTypes.empty );
      /* test empty objects */
      expect( TreeifierNodeParser.getNodeType( {} ) ).toBe( TreeifierNodeTypes.emptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object() ) ).toBe( TreeifierNodeTypes.emptyObject );
      expect( TreeifierNodeParser.getNodeType( anEmptyObject ) ).toBe( TreeifierNodeTypes.emptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object( null ) ) ).toBe( TreeifierNodeTypes.emptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object( undefined ) ) ).toBe( TreeifierNodeTypes.emptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object( {} ) ) ).toBe( TreeifierNodeTypes.emptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object( anEmptyObject ) ) ).toBe( TreeifierNodeTypes.emptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object( 123 ) ) ).not.toBe( TreeifierNodeTypes.emptyObject );
      /* non-empty objects */
      expect( TreeifierNodeParser.getNodeType( { 1: 1 } ) ).toBe( TreeifierNodeTypes.nonEmptyObject );
      expect( TreeifierNodeParser.getNodeType( aClassInstance ) ).toBe( TreeifierNodeTypes.nonEmptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object( aClassInstance ) ) ).toBe( TreeifierNodeTypes.nonEmptyObject );
      expect( TreeifierNodeParser.getNodeType( new Object( aTestObject ) ) ).toBe( TreeifierNodeTypes.nonEmptyObject );
      /* arrays, which are not "array of objects" */
      expect( TreeifierNodeParser.getNodeType( [] ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( [1, 2, 3] ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( ['#', null, 3] ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( [undefined, null, undefined] ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( [new Object( 123 ), new Object( 456 )] ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( new Array( 1, 2, 3 ) ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( new Array( undefined, null, undefined ) ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( new Array( 1 ) ) ).toBe( TreeifierNodeTypes.array );
      expect( TreeifierNodeParser.getNodeType( [new Array(), new Array()] ) ).toBe( TreeifierNodeTypes.array );
      /* arrays of (non-value) objects - ALL items are objects */
      expect( TreeifierNodeParser.getNodeType( [{}] ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [{}, {}, {}] ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [aTestObject] ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [aClassInstance, aTestObject] ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [new Object(), new Object(), new Object()] ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [new TestClass(), {}, new TestClass(), {}] ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [new TestClass()] ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( new Object( new Array( {}, aTestObject, aClassInstance ) ) ) ).toBe( TreeifierNodeTypes.arrayofobjects );
      /* test "invalid" array of objects -> those are "standard arrays" */
      expect( TreeifierNodeParser.getNodeType( [new Object( 123 ), new Object( 456 )] ) ).not.toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [new Date(), new Date(), new Date()] ) ).not.toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [aClassInstance, aTestObject, null] ) ).not.toBe( TreeifierNodeTypes.arrayofobjects );
      expect( TreeifierNodeParser.getNodeType( [new Array(), new Array()] ) ).not.toBe( TreeifierNodeTypes.arrayofobjects );

    } );

    it('should identify a leaf node', () => {
      /* leaf nodes */
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.unknown)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.empty)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.string)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.number)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.boolean)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.date)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.function)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.symbol)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.array)).toBeTrue();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.emptyObject)).toBeTrue();
      /* others */
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.nonEmptyObject)).toBeFalse();
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.arrayofobjects)).toBeFalse();
    });

    it('should identify a branch node', () => {
      /* branch nodes */
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.nonEmptyObject)).toBeTrue();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.arrayofobjects)).toBeTrue();      
      /* others */
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.unknown)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.empty)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.string)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.number)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.boolean)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.date)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.function)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.symbol)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.array)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.emptyObject)).toBeFalse();
    });
  } );

  describe('leaf and branch types', () => {

    beforeEach(function() {
      TreeifierNodeParser.resetLeafAndBranchTypes();
    });
    
    it('leaf types should be set', () => {
      const fixtureLeafTypes = [TreeifierNodeTypes.array, TreeifierNodeTypes.boolean];
      TreeifierNodeParser.leafTypes = fixtureLeafTypes;
      expect(TreeifierNodeParser.leafTypes).toHaveLength(fixtureLeafTypes.length);
      expect(TreeifierNodeParser.leafTypes).toContainEqual(TreeifierNodeTypes.array);
      expect(TreeifierNodeParser.branchTypes).toHaveLength(Object.keys(TreeifierNodeTypes).length/2 - fixtureLeafTypes.length);
      expect(TreeifierNodeParser.branchTypes).not.toIncludeAnyMembers(fixtureLeafTypes);
    });
    it('branch types should be set', () => {
      const fixtureBranchTypes = [TreeifierNodeTypes.array, TreeifierNodeTypes.boolean];
      TreeifierNodeParser.branchTypes = fixtureBranchTypes;
      expect(TreeifierNodeParser.branchTypes).toHaveLength(fixtureBranchTypes.length);
      expect(TreeifierNodeParser.branchTypes).toContainEqual(TreeifierNodeTypes.array);
      expect(TreeifierNodeParser.leafTypes).toHaveLength(Object.keys(TreeifierNodeTypes).length/2 - fixtureBranchTypes.length);
      expect(TreeifierNodeParser.leafTypes).not.toIncludeAnyMembers(fixtureBranchTypes);
    });    
    it('should be reset', () => {
      const originalLeafTypes = TreeifierNodeParser.leafTypes;
      const originalBranchTypes = TreeifierNodeParser.branchTypes;
      const fixtureLeafTypes = [TreeifierNodeTypes.array, TreeifierNodeTypes.boolean];
      TreeifierNodeParser.leafTypes = fixtureLeafTypes;
      expect(TreeifierNodeParser.leafTypes).toHaveLength(fixtureLeafTypes.length);
      expect(TreeifierNodeParser.branchTypes).not.toIncludeAnyMembers(fixtureLeafTypes);
      TreeifierNodeParser.resetLeafAndBranchTypes();
      expect(TreeifierNodeParser.leafTypes).toEqual(originalLeafTypes);
      expect(TreeifierNodeParser.branchTypes).toEqual(originalBranchTypes);
    });
    it('should be used to check nodes', () => {
      const fixtureBranchTypes = [TreeifierNodeTypes.boolean];
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.boolean)).toBeTrue();
      expect(TreeifierNodeParser.isLeaf(true)).toBeTrue();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.boolean)).toBeFalse();
      expect(TreeifierNodeParser.isBranch(true)).toBeFalse();
      TreeifierNodeParser.branchTypes = fixtureBranchTypes;
      expect(TreeifierNodeParser.branchTypes).toHaveLength(fixtureBranchTypes.length);
      expect(TreeifierNodeParser.isLeafNode(TreeifierNodeTypes.boolean)).toBeFalse();
      expect(TreeifierNodeParser.isLeaf(true)).toBeFalse();
      expect(TreeifierNodeParser.isBranchNode(TreeifierNodeTypes.boolean)).toBeTrue();
      expect(TreeifierNodeParser.isBranch(true)).toBeTrue();
    });
  });

} );
