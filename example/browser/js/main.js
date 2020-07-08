/**
* @khatastroffik/treeifier :: TREEIFIER SAMPLE ESM (BROWSER) APP
*
* License: MIT
* Copyright (c) 2020, Loïs Bégué
*
**/

// since the app is using ESM, "import" is available
import { Treeifier } from '/js/treeifier.js';
import { TreeifierNodeTypes } from '/js/treeifier-node-parser.js';

// example object
const inputObject = {
  "headline": "Chuck Norris was here",
  name: {
    firstName: 'Bobby',
    lastName: 'Brown'
  },
  "numberarray": [1, 2, 3],
  "something": {
    "adate": new Date( 2020, 0, 1 ),
    "astring": "a string",
    "shouldbenull": null,
    "shouldbeundefined": undefined,
    "nicefunction": () => { return 42 },
    "list-of-objects": [
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
// add a circular reference. Just for fun ;-)
inputObject.something['list-of-objects'].push( { reference: inputObject } );

// create DOM node elements representing the TreeifierNode structure
// nodeKey, nodeValue ... could be improved i.e. using DOM elements instead of strings.
const domNodesProcessor = function ( node ) {
  const circularKey = node.circularRefNode?.key ?? '?';
  const circularPath = node.circularRefNode?.path ?? '';
  const circularLink = node.isCircular ? `<a href="#list@${circularPath}">${circularKey}</a>` : circularKey;
  const circularReference = node.isCircular ? `<span class="circularlink">${circularLink}</span>` : '';
  const nodeTypeClass = `nt_${TreeifierNodeTypes[node.nodeType]}`;
  const nodeKey = ( node.parent?.nodeType === TreeifierNodeTypes.arrayofobjects ) ? '' : `<span class="key">${node.key}</span>`;
  const nodeValue = node.isLeaf ? `: <span class="value${node.isCircular ? ' circular' : ''}">${node.toString()}</span> ${circularReference}` : '';

  // Any node should be represented by a DOM element!
  let currentNodeElement;

  if ( node.parent ) {
    // this is a "leaf" (having a parent) -> list item
    currentNodeElement = document.createElement( 'li' );
    currentNodeElement.innerHTML = `${nodeKey}${nodeValue}`;
  } else {
    // this is the root node (no parent) -> div (or whatever)
    currentNodeElement = document.createElement( 'div' );
    currentNodeElement.innerHTML = nodeKey;
  }
  // add a class to recognise the type of the value fo this node. Could be done directly on the value element ("nodeValue") instead... 
  currentNodeElement.setAttribute( 'class', `leaf ${nodeTypeClass}` );

  // if the current node itself is a branch then build its leaf/sub-nodes structure 
  if ( node.isBranch ) {
    let list;
    // use a numbered list if the branch is an array of objects, otherwise, use a standard list
    if ( node.nodeType === TreeifierNodeTypes.arrayofobjects ) {
      list = document.createElement( 'ol' );
      list.setAttribute( 'start', '0' );
    } else {
      list = document.createElement( 'ul' );
    }
    // set an ID to be used as anchor target in case of any circular ref on the node
    list.setAttribute( 'id', `list@${node.path}` );
    list.setAttribute( 'class', `branch ${nodeTypeClass}` );
    // iterate through child list to attach/append the DOM elements
    node.children.forEach( ( child ) => {
      list.appendChild( child.processResult );
    } );
    // bind the leafs/sub-branches of the current node the the DOM elemtent
    currentNodeElement.appendChild( list );
  }
  // retrun the DOM element corresponding to the current node
  return currentNodeElement;
}

const t = new Treeifier();
let domNodesRepresentation = t.process( inputObject, 'input-object', domNodesProcessor );
document.getElementById( 'representation' ).appendChild( domNodesRepresentation );
