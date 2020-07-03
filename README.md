<!-- markdownlint-disable MD033 MD005 -->
# treeifier

A (dependency-free) Typescript/JavaScript library generating a **structured (tree) representation** (textual or objectual) of any object.

**treeifier** should make your "valuables" visible!

## screenshots

Examples of object representation/output as generated using the integrated `defaultProcessor` (no need to specify it explicitly) and the `defaultColoredValuesProcessor` provided in the [treeifier-utils][treeifier-utils] library:

|default ASCII tree (string)<br>using *treeifier*|colored ASCII tree (string)<br>using *treeifier-utils* library|
|:---:|:---:|
| ![ASCII tree representation](./doc/screenshot-default-ascii-tree.png) | ![ASCII tree representation](./doc/screenshot-colored-ascii-tree.png) |
|`myTreeifier.process( aPerson )`|`myTreeifier.process( aPerson, 'person', TreeifierUtils.defaultColoredValuesProcessor )`|

Note:

- not all available output formats are demonstrated here. See the additional library package [treeifier-utils][treeifier-utils] for more *predefined formats*.

## introduction

Treeifier is able to process any kind of javascript input e.g. objects (structured or not), arrays etc.

- Treeifier evaluates the types of the contained property values (empty, string, number, date, function, symbol, array, array of objects, non empty objects) and adapt the output/representation accordingly.
- A *client application* may adapt the representation as needed in its own representation *processor*, using the analysis performed i.e the information ascertained by Treeifier. e.g. to generate a DOM elements structure (objectual representation) or an alternative output string format (textual representation).
- Treeifier can be integrated in multiple kind of applications: the library can be used as a TS (typescript), CJS (nodejs) or ESM (browser) module.

> What's the structure of my object instance, array, variable ...? What's its content, what's inside?

This are questions **treeifier** aims to answer in a very pragmatic way i.e. in form of a **tree representation** of the actually observed "valuable" (the *intransparent* object of your attention).

> How to...? Is treeifier eaysy to use?

Indeed!

## installation and first-step

Install the treeifier library in your (typescript/javascript) project as a **development dependency** (example below) or **standard dependency** (replace *--save-dev* with *--save* ) depending on your project's requirements:

```shell
> npm install --save-dev @khatastroffik/treeifier
```

and then use it as in

```javascript
import { Treeifier } from "treeifier";

// output as ascii tree using default processor
console.log( new Treeifier().process( myObject ) );
```

or

```javascript
// output as ascii tree using default processor
const treeifier = new Treeifier();
const tree: string = treeifier.process( myObject );
console.log( tree );
```

That's it!

## use cases

Among others:

- **transformation**: transform an input object into an alternative representation like XML, HTML etc.
- **debugging and logging**: display the current state of an object in console, stream, file...
- **documentation**: visuallize the structure of an object, including the type of its properties
- **data simplification**: deep copy the "values" from a complex class instance into a (simple) data object e.g. a DTO
- **user friendly visualization**: visualize the content of folders or "structured data" as a tree...

Note: the *transformation* use case could aim at displaying data on the UI directly i.e. per DOM element creation.

## usage

Below are example demonstrating some of the use cases as defined above:

### display a tree representation of an object instance in the console

This example makes use of the standard processor (integrated in the Treeifier instance).

```javascript
import { Treeifier } from "treeifier";

console.log( new Treeifier().process( myObjectInstance ) );
```

### treeify an object instance using your own processor

This example makes use of of a processor as provided by the client application.

```javascript
import { Treeifier } from "treeifier";

function myProcessor ( node: TreeifierNode ): any => {
  ...
  // generate the representation of the current node
  ...
  return representation_of_the_current_node;
}

const treeifier = new Treeifier();
console.log( treeifier.process( myObjectInstance, '', myProcessor) );

```

To learn how to write your own processor function, see the documentation on [Writing a "processor" function][write-processor].

## treeifier principles

### INPUT

your object instance / your variable. It can be of **any (unknown) shape**.

e.g. (simplified for demonstration purpose. Usually, a class definition and an instance of this class would have been used)

```javascript
const person = {
  name: {
    firstName: 'Bobby',
    lastName: 'Brown'
  },
  age: 30,
  dateOfBirth: new Date( 1990, 11, 11 ), // => 11.12.1990
  interests: ['music', 'skiing'],
  greeting: function (): string {
    return 'Hi! I\'m ' + this.name.firstName + '.';
  }
};
```

### PROCESSOR

a single function used to **shape the tree** i.e. shape the branches and leafs exposed by the process result:

- **defaults**: use one of the default processors as provided in the [treeifier-utils][treeifier-utils] module
- **BYOP**: bring your own processor function
  - **sort-as-you-need**: organize the output as required (some example "sort" functions are included)
  - **filter-as-you-need**: select the branches and leafs you'd like to output
  - **shape-as-you-want**: generate the "processResult" as needed i.e. as a specifically formated string or object.

Note the resulting **tree** may be a simple list i.e. it doesn't need to be structured at all, depending on your implementation goals.

See the documentation on [Writing a "processor" function][write-processor]

### OUTPUT

a textual or objectual representation of the treeified input, according to the utilized processor.

- textual: as ascii-ed tree, as html or xml source code, as CSV, as ...
- objectual: as object structure mapping the input structure i.e. DOM elements, HTML or XML node structure etc.

#### textual output

example of ascii-ed tree representation using the default processor provided by Treeifier as per `new Treeifier().process( person, 'person' )`:

```ascii
  person
  ├─ name
  │  ├─ firstName : Bobby
  │  └─ lastName : Brown
  ├─ age : 30
  ├─ gender : male
  ├─ dateOfBirth : 11.12.1990
  ├─ interests : [music, skiing]
  └─ greeting : function
```

#### objectual output

The processor may return "objects" instead of "strings" back up to the Treeifier.process function result. The result of the processing will then be the "root" as generated by the processor, hence the processor should account to generate/provide a root object.

e.g. `const XMLStructureRootObject = new Treeifier().process( person, 'person', My_XML_Object_Structure_Processor )`.

See the documentation on [Writing a "processor" function][write-processor]

## API

### Treeifier class

This class is the main class of the *treeifier* library. It allows to analyze and render the input object.

#### constructor

e.g. `const treeifier = new Treeifier(myProcessor);`

| parameters | types | optional | description |
|---|---|---|---|
| nodeProcessorCallback | NodeProcessorFunction | yes | the function that generate the representation of each node (default to standard processor)|

Important:

if the `nodeProcessorCallback` parameter is not provided in the constructor, a **standard (default) processor** will be used when `process(..)`or `parse()` methods are called, unless a processor is specified in the call.

&nbsp; | case | behavior
---|---|---
1 | no processor defined in the constructor<br>no processor specified in the methods parameters | &rightarrow; default processor will be used
2 | no processor defined in the constructor<br>a processor is specified in the methods parameters | &rightarrow; processor of the method will be used (e.g. *process( myObject, 'root', myProcessor)* )
3 | processor defined in the constructor<br>no processor specified in the methods parameters | &rightarrow; processor of the constructor will be used
4 | processor defined in the constructor<br>a processor is specified in the methods parameters | &rightarrow; processor of the method will be used

#### process(...)

This function is giving the representation (according to the processor function) corresponding to the input object back.
This is the **primary method** you'd probably use all the time.

e.g. `mytreeifier.process(myObject,'root-object');`

| parameters | types | optional | description |
|---|---|---|---|
| root | any | no | the input object to be analyzed |
| label | string | yes | the "name" of the input object (default to "root")|
| nodeProcessorCallback | NodeProcessorFunction | yes | the function that generate the representation of each node (default to standard processor) |

#### parse(...)

This function is analyzing the input object and giving the corresponding TreeifierNode structure back. This method is provided for your conveniance e.g. for debugging purposes.

e.g. `mytreeifier.parse(myObject,'root-object', myProcessor);`

| parameters | types | optional | description |
|---|---|---|---|
| root | any | no | the input object to be analyzed |
| label | string | yes | the "name" of the input object (default to "root") |
| nodeProcessorCallback | NodeProcessorFunction | yes | the function that generate the representation of each node (default to standard processor)|

### TreeifierNode class

This class is the basic element of the internal representation of the input object as generated by *treeifier*. The **internal representation** is a *tree of TreeifierNode*.

One `TreeifierNode` instance corresponds to a "*property / value / treeifier analysis*" combination **for each property of the input object** or its sub-properties (recursive).

- you may use the class *members/properties* and the *toString()* method while **developing your own processor** function. These information help to generate appropriate representations, depending on the node.
- You should hardly have to instanciate this class on your own: treeifier is doing the job for you when parsing the input object and use the internaly generated tree to output the final representation.

#### members / properties

| member | type | restriction | description |
|---|---|---|---|
**key** | string | ro | the **property** of the input object
**value** | any | ro | the **original value** of the object property
**processResult** | any | rw | the **representation** of the node as generated by the *processor* function. Used by Treeifier.process(..) to output the representation.
**path** | string | ro | path to the analyzed property within the original input object e.g. `myObject.name.firstname`
index | number | ro | the index of the **property in the object** (e.g. as per Object.keys(...))
parent | TreeifierNode or null | ro | the **parent TreeifierNode** (if any, depending on the inpüut object)
nodeType | TreeifierNodeTypes | ro | the **type of the value** as analyzed by Treeifier (see the **node types section** below)
**isLeaf** | boolean | ro | is this node a **leaf** of the structure? Depends on the node type and the setup (see the **node types section** below)
**isBranch** | boolean | ro | is this node a **branch** of the structure? Depends on the node type and the setup (see the **node types section** below)
isValue | boolean | ro | may the *value* directly be **interpreted**/rendered? Depends on the node type and the setup (see the **node types section** below)
depth | number | ro | how deep in the tree representation is this node situated (starting at depth level 0 = root node)
ancestors | Array<TreeifierNode> | ro | all nodes up to the root of the structure
maxIndex | number | ro | amount of **siblings** to the current node
isCircular | boolean | ro | the value is referencing an object which is in the ancestors list i.e. it's a **circular reference**
prefix | string | rw | the prefixing "tree structure" (branch parts) as rendered in `prefix + joint + key + value`. Automatically generated at the node creation time.
joint | string | rw |  the "joint" between a leaf and its branch as rendered in `prefix + joint + key + value`. Automatically generated at the node creation time.
**children** | Array<TreeifierNode> | ro | list of child nodes (branches or leafs)

#### methods

method | description
---|---
constructor(key: string, value: any, index: number, parent: TreeifierNode or null) | see class description above
**toString**(): string; | this function is providing a **default representation of the property value** as analyzed by treeifier, depending on the value type (see the **node types section** below)

## debugging

You may like to debug the analyze done by Treeifier. For this purpose, you can use the `debug` function provided in the [treeifier-utils][treeifier-utils] library. This function will provide a **textual representation of the generated TreeifierNode structure** i.e. it will show the details of the generated (internal) nodes.

Note:

the `debug` function itself is based on the simple treeifier functionality, only providing a suitable "processor" to generate the *debug representation*. In other words, *treeifier is debugging treeifier*! Kind of a recursion here... ;-)

[write-processor]: ./docs/writing-a-processor-function.md
[treeifier-utils]: https://github.com/khatastroffik/treeifier-utils
