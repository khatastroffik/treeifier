/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-array-constructor */
/**
 * @khatastroffik/treeifier :: Treeifier Utils :: Tests
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import 'jest-extended';
import { Treeifier, NodeProcessorFunction } from "../src/treeifier";
import { TreeifierNode } from '../src/treeifier-node';
import { TreeifierUtils } from '../src/treeifier-utils';
import chalk from 'chalk';

let standardProcessorFixture: NodeProcessorFunction;

describe('treeifier utils', () => {

  beforeAll( function () {

    standardProcessorFixture = ( node: TreeifierNode ): any => {
      const circular = node.isCircular ? ' -> ' + node.circularRefNode?.key ?? '?' : '';
      let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' ) + circular;
      if ( node.isBranch ) {
        node.children.forEach( ( child: TreeifierNode ): void => {
          child.processResult && ( result = result + '\n' + child.processResult )
        } );
      }
      return result;
    }

  } );

  beforeEach( function () {
    TreeifierUtils.CircularColor = chalk.redBright;
  } );

  it( 'should debug Treeifier result node, adapting color of the output', () => {
    const tree = new Treeifier();
    const item = { a: 1, b: new Function(), c: Symbol( 'test symbol' ), d: 'd' };
    const expected1 = 'processResult';
    const expected2 = 'Symbol(test symbol)';
    const processResultNode = tree.parse( item );
    TreeifierUtils.CircularColor = chalk.magenta;
    const debugResult = TreeifierUtils.debugResultNode( processResultNode, tree );
    expect( debugResult ).toContain( expected1 );
    expect( debugResult ).toContain( expected2 );
  } );

  it( 'should debug an object containing circular refs directly', () => {
    const item = { a: 1, b: { c: '#', xtra: { alpha: [9, "z", 8, "y"], beta: "maximum", delta: 4711 } }, f: (): number => { return 1 }, g: { h: { i: { j: 987, k: 'test' } }, l: ["a", "b", "c"] }, m: 3, n: { someparent: new Object() } };
    item.n.someparent = item; // setup a circular reference
    const debugResult = TreeifierUtils.debug( item, 'shouldmakeit', standardProcessorFixture );
    const expected1 = '└─ n\\n   └─ someparent : circular ref. -> shouldmakeit';
    const expected2 = 'shouldmakeit.g.h.i.j';
    expect( debugResult ).toContain( expected1 );
    expect( debugResult ).toContain( expected2 );
  } );

  it( 'should debug an object directly, adapting the color of the output', () => {
    const item = { a: 1, b: new Function(), c: Symbol( 'test symbol' ), d: 'd' };
    const expected1 = 'processResult';
    const expected2 = 'root\\n├─ a : 1\\n├─ b : function\\n├─ c : Symbol(test symbol)\\n└─ d : d';
    TreeifierUtils.CircularColor = chalk.yellow;
    const debugResult = TreeifierUtils.debug( item, '', standardProcessorFixture );
    expect( debugResult ).toContain( expected1 );
    expect( debugResult ).toContain( expected2 );
  } );

  it( '++++ DEBUG ++++', () => {
    const person = {
      name: {
        firstName: 'Bobby',
        lastName: 'Brown'
      },
      age: 30,
      gender: 'male',
      dateOfBirth: new Date( 1990, 11, 11 ), // => 11.12.1990
      interests: ['music', 'skiing'],
      bio: function (): void {
        alert( this.name.firstName + ' ' + this.name.lastName +
          ' is ' + this.age + ' years old. He likes ' +
          this.interests[0] + ' and ' + this.interests[1] + '.' );
      },
      greeting: function (): string {
        return 'Hi! I\'m ' + this.name.firstName + '.';
      }
    };

    // ======== test processing and debugging the object "person" ========
    // console.log( new Treeifier().process( person, 'person', TreeifierUtils.defaultHTMLProcessor ) );
    // console.log( new Treeifier().process( person, 'person', TreeifierUtils.defaultColoredValuesProcessor ) );
    // console.log( new Treeifier().process( person, 'person', TreeifierUtils.defaultColoredTypesProcessor ) );
    // console.log( TreeifierUtils.debug( person ) );

    // ======== test debugging an object with circular reference ========
    // const item = { a: 1, b: { c: '#', xtra: { alpha: [9, "z", 8, "y"], beta: "maximum", delta: 4711 } }, f: (): number => { return 1 }, g: { h: { i: { j: 987, k: 'test' } }, l: ["a", "b", "c"] }, m: 3, n: { someparent: new Object() } };
    // item.n.someparent = item; // setup a circular reference
    // console.log( TreeifierUtils.debug( item ) );

    expect( person.age ).toBe( 30 );
  } );


});
