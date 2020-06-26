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
import { TreeifierNode } from '../src/TreeifierNode';
import { TreeifierNodeTypes } from '../src/TreeifierNodeParser';

let sequentialProcessor: NodeProcessorFunction;
let sequentialFilteringProcessor: NodeProcessorFunction;
let sequentialResult: string;

describe( 'treeifier process', () => {
  describe( 'called with a sequencial processor', () => {
    beforeAll( function () {
      sequentialProcessor = ( node: TreeifierNode ): void => {
        const circular = node.isCircular ? ' -> ' + node.circularRefNode?.key ?? '?' : '';
        // (node.depth>1) && (node.prefix = node.prefix + '   ');
        // (node.depth>0) && (node.joint = node.joint.trim() + '──  ');
        sequentialResult += node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' ) + circular + '\n';
      }
      sequentialFilteringProcessor = ( node: TreeifierNode ): void => {
        if ( [TreeifierNodeTypes.function, TreeifierNodeTypes.symbol].includes( node.nodeType ) ) return;
        sequentialResult += node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' ) + '\n';
      }
    } );

    beforeEach( function () {
      sequentialResult = '';
    } );

    it( 'should work with all node types', () => {
      const tree = new Treeifier();
      const item = {
        "a": "Chuck Norris was here",
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
          "k": (): boolean => { return true },
          "l": [
            {
              "first": "Elvis has just left the building",
              "second": ["a", "b", "c"],
              "third": true,
              "fourth": Symbol("atari")
            },
            {
              "Min": -123,
              "max": Infinity
            }
          ]
        }        
      };
      const expected = 'root\n├─ a : Chuck Norris was here\n├─ b\n│  ├─ c : 123\n│  └─ d : NaN\n├─ e : [1, 2, 3]\n└─ f\n   ├─ g : 26.6.2020\n   ├─ h '
      + ': a string\n   ├─ i : null\n   ├─ j : undefined\n   ├─ k : function\n   └─ l\n      ├─ 0\n      │  ├─ first : Elvis has just '
      + 'left the building\n      │  ├─ second : [a, b, c]\n      │  ├─ third : true\n      │  └─ fourth : Symbol(atari)\n      └─ '
      + '1\n         ├─ Min : -123\n         └─ max : Infinity\n';
      tree.process( item, '', sequentialProcessor );
      expect( sequentialResult ).toBe( expected );
    } );

    it( 'should work with an array of objects', () => {
      const tree = new Treeifier();
      const item = [{ a: 1 }, { b: 2, c: { d: 3, e: 4, f: [1, 2, 3], g: { h: 'a', j: 'b', k: 'c' } } }];
      const expected = 'root\n├─ 0\n│  └─ a : 1\n└─ 1\n   ├─ b : 2\n   └─ c\n      ├─ d : 3\n      ├─ e : 4\n      ├─ f : [1, 2, 3]\n      └─ g\n         ├─ h : a\n         ├─ j : b\n         └─ k : c\n';
      tree.process( item, '', sequentialProcessor );
      expect( sequentialResult ).toBe( expected );
    } );

    it( 'should work with a standard object', () => {
      const tree = new Treeifier();
      const item = { a: 1, b: { c: '#', someparent: new Object() }, f: (): number => { return 1 }, g: { h: { i: { j: 987, k: 'test' } }, l: ["a", "b", "c"] }, m: 3 };
      const expected = 'root\n├─ a : 1\n├─ b\n│  ├─ c : #\n│  └─ someparent : {}\n├─ f : function\n├─ g\n│  ├─ h\n│  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test\n│  └─ l : [a, b, c]\n└─ m : 3\n';
      tree.process( item, '', sequentialProcessor );
      expect( sequentialResult ).toBe( expected );
    } );

    it( 'should work with an object containing circular refs', () => {
      const tree = new Treeifier();
      const item = { a: 1, b: { c: '#', someparent: new Object() }, f: (): number => { return 1 }, g: { h: { i: { j: 987, k: 'test' } }, l: ["a", "b", "c"] }, m: 3 };
      item.b.someparent = item; // setup a circular reference
      const expected = 'root\n├─ a : 1\n├─ b\n│  ├─ c : #\n│  └─ someparent : circular ref. -> root\n├─ f : function\n├─ g\n│  ├─ h\n│  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test\n│  └─ l : [a, b, c]\n└─ m : 3\n';
      tree.process( item, '', sequentialProcessor );
      expect( sequentialResult ).toBe( expected );
    } );

    it( 'should use the provided root label', () => {
      const tree = new Treeifier();
      const item = { a: 1 };
      const rootLabel = 'my root label';
      const expected = 'my root label\n└─ a : 1\n';
      tree.process( item, rootLabel, sequentialProcessor );
      expect( sequentialResult ).toBe( expected );
    } );

    it( 'should use filter using the processor function', () => {
      const tree = new Treeifier();
      const item = { a: 1, b: new Function(), c: Symbol( 'test symbol' ), d: 'd' };
      const expected = 'root\n├─ a : 1\n└─ d : d\n';
      tree.process( item, '', sequentialFilteringProcessor );
      expect( sequentialResult ).toBe( expected );
    } );

    it( '++++ DEBUG ++++', () => {
      const tree = new Treeifier();
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
      tree.process( person, '', sequentialProcessor );
      // console.log( sequentialResult, person.greeting() );
      expect( true ).toBeTrue();
    } );

  } );
} );
