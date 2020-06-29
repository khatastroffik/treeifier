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
import { TreeifierNode } from "../src/treeifier-node";
import { TreeifierNodeTypes } from "../src/treeifier-node-parser";

describe( 'treeifier node', () => {

  it( 'should initialize a string node correctly', () => {
    const aValue = 'a value';
    const node = new TreeifierNode( 'root', aValue, 0, null );
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
    const nodeFactory = ( value: any ): TreeifierNode => { return new TreeifierNode( 'root', value, 0, null ) };
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
    expect( nodeFactory( [1, 2, 3] ).toString() ).toBe( '[1, 2, 3]' );
    expect( nodeFactory( [{}, {}, {}] ).toString() ).toBe( 'array of objects' );
    expect( nodeFactory( { a: 1 } ).toString() ).toBe( 'object' );
    expect( nodeFactory( Symbol( 'a symbol' ) ).toString() ).toBe( 'Symbol(a symbol)' );
    // expect( nodeFactory( XXXX ).toString() ).toBe( 'xxx' );
  } );
  it( 'should add child nodes', () => {

    const parentNode = new TreeifierNode( 'parentnode', {}, 0, null );
    const childNode = new TreeifierNode( 'childnode', {}, 0, parentNode );
    const grandchild = new TreeifierNode( 'grandchildnode', {}, 0, childNode );
    expect( childNode.parent ).toBe( parentNode );
    expect( parentNode.children ).toHaveLength( 1 );
    expect( parentNode.children[0] ).toBe( childNode );
    expect( childNode.children ).toHaveLength( 1 );
    expect( childNode.children[0] ).toBe( grandchild );
    expect( childNode.children[0].key ).toBe( 'grandchildnode' );
  } );
  it( 'should generate node paths', () => {
    const parentNode = new TreeifierNode( 'parentnode.ext', {}, 0, null );
    const childNode = new TreeifierNode( 'childnode.ext', {}, 0, parentNode );
    const grandchild = new TreeifierNode( 'grandchildnode', {}, 0, childNode );
    expect( parentNode.path ).toBe( 'parentnode.ext' );
    expect( childNode.path ).toBe( 'parentnode.ext.childnode.ext' );
    expect( grandchild.path ).toBe( 'parentnode.ext.childnode.ext.grandchildnode' );
  } );
} );
