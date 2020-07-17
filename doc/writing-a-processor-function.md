# writing a "processor" function

back to [main project page][mainpage]

## introduction

*treeifier* is just an engine parsing an input object and transfering the information in an internal node structure. Generally speaking, it rely on the client application to provide a **processor function** responsible of **rendering** the parsed information i.e. the node structure.

A *default renderer* i.e. a **default processor** function is provided by treeifier for convenience. The result of the rendering is a *tree-like representation* of the input object. this representation is *textual* i.e. it is made of ascii chars.

In order **to adapt the representation** to its needs, the client application should **implement its own processor** function.

## function implementation details

### signature

The **function signature** of a processor should match the following:

```javascript
// typescript signature (an import is required for "TreeifierNode". see the example apps provided in the repository)
function myTypescriptProcessor( node: TreeifierNode ): any { ... }

// javascript signature
function myJavascriptProcessor ( node ) { ... }
```

- INPUT: a TreeifierNode currently beeing processed by the treeifier engine/parser: the *current node*.
- OUTPUT: a fully fledged representation of the *current* node.

Please note that the output can be of any type. Usually:

- a *string* for a textual representation e.g. to display the representation in a shell/console...
- an *object structure* e.g. made of structured DOM elements to display the representation in a web page...

### schema / structure

The **function structure** should (though facultativ, depending on the intended output) differentiate between "**branch** nodes" and "**leaf** nodes". The reason being: the internal structure of *treeifier* is tree-based. Each node of the tree will be passed to the processor function in *order of its position in the tree*, though *always starting from the leafs* and moving down the branches to the root.

If the intended representation should reflect a tree structure, then it should match the following **schema** (anyhow, it's up to the client app to construct the *correct* representation).

```javascript
function myTypescriptProcessor( node: TreeifierNode ): any {

  // 1st step : generate the representation of the current node (so to stay: the "name sticker" on the current node's "lunch box")
  //            here, it generally doesn't matter if the node is a branch or a leaf. This representation should match for both.
  let nodeRepresentation = node.key + node.toString();

  // 2nd step : check if the node is a branch. if so, proceed to enrich the representation with
  //            information/representations of its children nodes
  if ( node.isBranch && node.children.length()>0 ) {

    // retrieve the representation of each child nodes...
    let subNodeRepresentation = [];
    node.children.forEach( (childNode: TreeifierNode): any => {
      subNodeRepresentation.push( childNode.processResult );
    } ;)

    // 3rd step : integrate the children representation into the node representation to complement the current node representation.
    //            (so to say: fill the "content" of the current node's "lunch box")
    nodeRepresentation += subNodeRepresentation.join('\n');
  }

  // last step : always (!) return the representation of the current node (i.e. the complete "lunch box")
  return nodeRepresentation;
}
```

Notes:

1. the use case `node.isLeaf` doesn't need to be handled specifically here since the initial representation (in "1st step" above) is already i.e. automatically covering it. That's smart, isn't it? :-)
1. the above schema is making use of (i.e. is relying on) the `toString()` object method as provided by the TreeifierNode object to display the node value. The client application may prefer to **acces the node value** directly instead, e.g. to format it differently. *The automatically generated and filled object property `node.value` is intended for that purpose*! it contains the original value as found in the processed input object.

### IMPORTANT: function result

The processor function should return the representation (of any type) of the current node!

This is meant as "the **complete** *representation of the node*", eventually including the representation of its children, if any = kind of a [matroska](https://en.wikipedia.org/wiki/Matroska) principle ;-)

This representation is **internally stored** in (and can be retrieved from) the **property** of the current node called `processResult`:

```javascript

let currentNode: TreeifierNode;
...

// set the representation of this node
currentNode.processResult = 'the node key is ' + currentNode.key;

// get the representation of this node 
console.log( currentNode.processResult );
```

The processor may use the representation of any "reachable" TreeifierNode (e.g. the representation of child nodes. see examples above and below) to compute the representation of the current node.

## examples

### textual representation (tree structure)

```javascript
private static textualProcessor( node: TreeifierNode ): string {
  let result = node.prefix + node.joint + node.key + ( node.isLeaf ? ' : ' + node.toString() : '' );
  if ( node.isBranch ) {
    node.children.forEach( ( child: TreeifierNode ): void => {
      child.processResult && ( result = result + '\n' + child.processResult )
    } );
  }
  return result;
}
```

Note: the properties `node.prefix` and `node.joint` are provided i.e. computed automatically for your *convenience*. They help to construct the shape of a tree.

### objectual representation (DOM elements)

This basic example generates a DOM structure made out of `<ul> ... </ul>` and `<li> ... </li>`. The style of the DOM elements could be adapted using class names generated depending on the node type, depth, value etc.

```javascript
const objectualProcessor = function ( node ) {
  const nodeKey = ( node.parent?.nodeType === TreeifierNodeTypes.arrayofobjects ) ? '' : `<span class="key">${node.key}</span>`;
  const nodeValue = node.isLeaf ? `: <span class="value">${node.toString()}</span>` : '';
  let currentNodeElement;
  if ( node.parent ) { // this is a "leaf" i.e. a list item (having a parent)
    currentNodeElement = document.createElement( 'li' );
    currentNodeElement.innerHTML = `${nodeKey}${nodeValue}`;
  } else { // this is the root node (no parent) !! Here represented as a <div>
    currentNodeElement = document.createElement( 'div' );
    currentNodeElement.innerHTML = nodeKey;
  }
  currentNodeElement.setAttribute( 'class', `leaf` );
  if ( node.isBranch ) { 
    let list = document.createElement( 'ul' );
    list.setAttribute( 'class', `branch` );
    node.children.forEach( ( child ) => {
      list.appendChild( child.processResult ); //attach/append the DOM elements !
    } );
    currentNodeElement.appendChild( list ); // bind the leafs of the current node to its DOM elemtent
  }
  return currentNodeElement; // retrun the DOM element corresponding to the current node
}
```

See the [API documentation](./api.md) to get details on the available **properties of the TreeifierNode** object and have a look at the **project test files** or at the **example applications** provided.

## screenshots

textual representation | objectual representation
---|---
![textual](./screenshot-colored-ascii-tree.png) |![objectual](./screenshot-treeifier-example-web-application.png)

[mainpage]: ../README.md
