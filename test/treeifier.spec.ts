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
import { Treeifier } from "../src/treeifier";

describe( 'treeifier', () => {
  it( 'should not parse non exisiting objects', () => {
    const treeifier = new Treeifier();
    const z: any = null;
    expect( () => treeifier.parse( z ) ).toThrow( 'Cannot parse non exisiting object.' );
  } );

  describe( 'parser', () => {

    const testobject1 = {
      "a": "Walker was here",
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

    // const testobject2 = JSON.parse(`
    // {
    //   "name": "@khatastroffik/treeifier",
    //   "version": "1.0.0",
    //   "description": "A Typescript/JavaScript library generating a tree representation of an object",
    //   "main": "dist/treeifier",
    //   "node": "dist/treeifier.js",
    //   "publishConfig": {
    //     "registry": "https://registry.npmjs.org/",
    //     "access": "public"
    //   },
    //   "repository": {
    //     "url": "https://github.com/khatastroffik/treeifier.git",
    //     "type": "git"
    //   },
    //   "bugs": {
    //     "url": "https://github.com/khatastroffik/treeifier/issues"
    //   },
    //   "scripts": {
    //     "test": "jest",
    //     "coverage": "jest --coverage",
    //     "lint": "eslint -f pretty src",
    //     "build": "tsc",
    //     "dev:test": "jest --watch --verbose",
    //     "dev:build": "tsc --watch",
    //     "prepublishOnly": "npm run prod",
    //     "prod": "npm run prod:clean && npm run prod:lint && npm run prod:test && npm run prod:build && npm run prod:copy",
    //     "prod:build": "npm run build",
    //     "prod:test": "jest --silent --all",
    //     "prod:lint": "eslint --quiet src",
    //     "prod:clean": "npm run clean",
    //     "prod:copy": "npm run copy:typescripts",
    //     "clean": "rimraf ./dist ./types ./coverage",
    //     "copy:typescripts": "copyfiles -u 1 src/**/* dist/",
    //     "changelog": "npx generate-changelog"
    //   },
    //   "keywords": [
    //     "Typescript",
    //     "Tree",
    //     "Treeify",
    //     "Treeifier"
    //   ],
    //   "author": {
    //     "name": "Loïs Bégué",
    //     "url": "https://www.khatastroffik.net"
    //   },
    //   "homepage": "https://www.khatastroffik.net",
    //   "license": "MIT",
    //   "engines": {
    //     "node": ">=13.x",
    //     "npm": ">=6.x"
    //   },
    //   "files": [
    //     "/dist",
    //     "/types"
    //   ],
    //   "directories": {
    //     "doc": "doc"
    //   },
    //   "devDependencies": {
    //     "@types/jest": "^26.0.0",
    //     "@types/node": "^14.0.13",
    //     "@typescript-eslint/eslint-plugin": "^3.3.0",
    //     "@typescript-eslint/parser": "^3.3.0",
    //     "copyfiles": "^2.3.0",
    //     "eslint": "^7.3.0",
    //     "eslint-formatter-pretty": "^4.0.0",
    //     "eslint-plugin-deprecation": "^1.1.0",
    //     "eslint-plugin-jest": "^23.16.0",
    //     "eslint-plugin-notice": "^0.9.10",
    //     "jest": "^26.0.1",
    //     "jest-extended": "^0.11.5",
    //     "rimraf": "^3.0.2",
    //     "ts-jest": "^26.1.0",
    //     "ts-node": "^8.10.2",
    //     "typescript": "^3.9.5"
    //   },
    //   "dependencies": {
    //     "tslib": "^2.0.0"
    //   }
    // }    
    // `);
    
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
