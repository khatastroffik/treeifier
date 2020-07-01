/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-array-constructor */
/**
 * @khatastroffik/treeifier :: Treeifier (parser) :: Tests
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import 'jest-extended';
import { Treeifier, NodeProcessorFunction } from "../src/treeifier";
import { TreeifierNode } from '../src/treeifier-node';
import { TreeifierNodeTypes } from '../src/treeifier-node-parser';
import { TreeifierUtils } from '../src/treeifier-utils';
import chalk from 'chalk';

let standardProcessorFixture: NodeProcessorFunction;
let filteringProcessorFixture: NodeProcessorFunction;

describe( 'treeifier', () => {

  beforeAll( function () {

    standardProcessorFixture = ( node: TreeifierNode ): any => {
      const circular = node.isCircular ? ' -> ' + node.circularRefNode?.key ?? '?' : '';
      // (node.depth>1) && (node.prefix = node.prefix + '   ');
      // (node.depth>0) && (node.joint = node.joint.trim() + '──  ');
      let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' ) + circular;
      if ( node.isBranch ) {
        node.children.forEach( ( child: TreeifierNode ): void => {
          child.processResult && ( result = result + '\n' + child.processResult )
        } );
      }
      return result;
    }

    filteringProcessorFixture = ( node: TreeifierNode ): any => {
      if ( [TreeifierNodeTypes.function, TreeifierNodeTypes.symbol].includes( node.nodeType ) ) return null;
      let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' );
      if ( node.isBranch ) {
        node.children.forEach( ( child: TreeifierNode ): void => {
          child.processResult && ( result = result + '\n' + child.processResult )
        } );
      }
      return result;
    }
  } );

  beforeEach(function() {
    TreeifierUtils.CircularColor = chalk.redBright;
  });
  

  it( 'should process all node types', () => {
    const tree = new Treeifier();
    const item = {
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
        "k": (): boolean => { return true },
        "l": [
          {
            "first": "Elvis has just left the building",
            "second": ["a", "b", "c"],
            "third": true,
            "fourth": Symbol( "atari" )
          },
          {
            "Min": -123,
            "max": Infinity
          }
        ]
      }
    };
    const expected = 'root\n├─ a : Chuck Norris was here\n├─ b\n│  ├─ c : 123\n│  └─ d : NaN\n├─ e : [1, 2, 3]\n└─ f\n   ├─ g : 1.1.2020\n   ├─ h '
      + ': a string\n   ├─ i : null\n   ├─ j : undefined\n   ├─ k : function\n   └─ l\n      ├─ 0\n      │  ├─ first : Elvis has just '
      + 'left the building\n      │  ├─ second : [a, b, c]\n      │  ├─ third : true\n      │  └─ fourth : Symbol(atari)\n      └─ '
      + '1\n         ├─ Min : -123\n         └─ max : Infinity';
    expect( tree.process( item, '', standardProcessorFixture ) ).toBe( expected );
  } );

  it( 'should process an array of objects', () => {
    const tree = new Treeifier();
    const item = [{ a: 1 }, { b: 2, c: { d: 3, e: 4, f: [1, 2, 3], g: { h: 'a', j: 'b', k: 'c' } } }];
    const expected = 'root\n├─ 0\n│  └─ a : 1\n└─ 1\n   ├─ b : 2\n   └─ c\n      ├─ d : 3\n      ├─ e : 4\n      ├─ f : [1, 2, 3]\n      └─ g\n         ├─ h : a\n         ├─ j : b\n         └─ k : c';

    expect( tree.process( item, '', standardProcessorFixture ) ).toBe( expected );
  } );

  it( 'should process a standard object', () => {
    const tree = new Treeifier();
    const item = { a: 1, b: { c: '#', someparent: new Object() }, f: (): number => { return 1 }, g: { h: { i: { j: 987, k: 'test' } }, l: ["a", "b", "c"] }, m: 3 };
    const expected = 'root\n├─ a : 1\n├─ b\n│  ├─ c : #\n│  └─ someparent : {}\n├─ f : function\n├─ g\n│  ├─ h\n│  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test\n│  └─ l : [a, b, c]\n└─ m : 3';

    expect( tree.process( item, '', standardProcessorFixture ) ).toBe( expected );
  } );

  it( 'should process an object containing circular refs', () => {
    const tree = new Treeifier();
    const item = { a: 1, b: { c: '#', someparent: new Object() }, f: (): number => { return 1 }, g: { h: { i: { j: 987, k: 'test' } }, l: ["a", "b", "c"] }, m: 3 };
    item.b.someparent = item; // setup a circular reference
    const expected = 'root\n├─ a : 1\n├─ b\n│  ├─ c : #\n│  └─ someparent : circular ref. -> root\n├─ f : function\n├─ g\n│  ├─ h\n│  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test\n│  └─ l : [a, b, c]\n└─ m : 3';
    expect( tree.process( item, '', standardProcessorFixture ) ).toBe( expected );
  } );

  it( 'should use the provided root label', () => {
    const tree = new Treeifier();
    const item = { a: 1 };
    const rootLabel = 'my root label';
    const expected = 'my root label\n└─ a : 1';
    expect( tree.process( item, rootLabel, standardProcessorFixture ) ).toBe( expected );
  } );

  it( 'should use a filtering processor function', () => {
    const tree = new Treeifier();
    const item = { a: 1, b: new Function(), c: Symbol( 'test symbol' ), d: 'd' };
    const expected = 'root\n├─ a : 1\n└─ d : d';
    expect( tree.process( item, '', filteringProcessorFixture ) ).toBe( expected );
  } );

  it( 'should not throw when the processor function is missing', () => {
    const tree = new Treeifier();
    const item = { a: 1, d: 'd' };
    const dummyProcessorFunction: any = null;
    expect( () => { tree.process( item, '', dummyProcessorFunction ) } ).not.toThrow( );
    expect( () => { tree.process( item ) } ).not.toThrow( );
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
    // console.log(new Treeifier().process( person, 'person', TreeifierUtils.defaultHTMLProcessor ));   
    // console.log(new Treeifier().process( person, 'person', TreeifierUtils.defaultColoredProcessor ));   
    // console.log(TreeifierUtils.debug(person));

    // ======== test debugging an object with circular reference ========
    // const item = { a: 1, b: { c: '#', xtra: { alpha: [9, "z", 8, "y"], beta: "maximum", delta: 4711 } }, f: (): number => { return 1 }, g: { h: { i: { j: 987, k: 'test' } }, l: ["a", "b", "c"] }, m: 3, n: { someparent: new Object() } };
    // item.n.someparent = item; // setup a circular reference
    // console.log(TreeifierUtils.debug(item));

    expect( person.age ).toBe(30);
  } );


} );
