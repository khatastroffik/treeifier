/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-array-constructor */
/**
 * @khatastroffik/treeifier :: Treeifier Node :: Tests
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
import 'jest-extended';
import { TreeifierNode } from "../src/TreeifierNode";
import { TreeifierNodeTypes } from "../src/TreeifierNodeParser";

describe( 'treeifier node', () => {

  it( 'should initialize a string node correctly', () => {
    const aValue = 'a value';
    const node = new TreeifierNode( aValue, null, null, [] );
    expect( node ).toBeInstanceOf( TreeifierNode );
    expect( node.isValue ).toBeTrue();
    expect( node.isLeaf ).toBeTrue();
    expect( node.isBranch ).toBeFalse();
    expect( node.nodeType ).toBe( TreeifierNodeTypes.string );
    expect( node.value ).toBe( aValue );
    expect( node.toString() ).toBe( aValue );
  } );

  it( 'toString() should output correctly ', () => {
    const aDate = new Date();
    const nodeFactory = ( value: any ): TreeifierNode => { return new TreeifierNode( value, null, null, [] ) };
    expect( nodeFactory( '#' ).toString() ).toBe( '#' );
    expect( nodeFactory( 123 ).toString() ).toBe( '123' );
    expect( nodeFactory( NaN ).toString() ).toBe( 'NaN' );
    expect( nodeFactory( true ).toString() ).toBe( 'true' );
    expect( nodeFactory( false ).toString() ).toBe( 'false' );
    expect( nodeFactory( null ).toString() ).toBe( 'null' );
    expect( nodeFactory( undefined ).toString() ).toBe( 'undefined' );
    expect( nodeFactory( {} ).toString() ).toBe( '{}' );
    expect( nodeFactory( aDate ).toString() ).toBe( aDate.toLocaleDateString() );
    expect( nodeFactory( () => { return } ).toString() ).toBe( 'function' );
    expect( nodeFactory( [] ).toString() ).toBe( '[]' );
    expect( nodeFactory( [1,2,3] ).toString() ).toBe( '[1, 2, 3]' );
    expect( nodeFactory( [{},{},{}] ).toString() ).toBe( 'array of objects' );
    expect( nodeFactory( {a:1} ).toString() ).toBe( 'object' );
    expect( nodeFactory( Symbol('a symbol') ).toString() ).toBe( 'Symbol(a symbol)' );
    // expect( nodeFactory( XXXX ).toString() ).toBe( 'xxx' );

  } );
} );
