# treeifier ESM (Browser) Sample application

## purpose

Demonstrate the use of the **treeifier** library in a browser. The example is also showing how to use your own (custom) "processor" function.

## installation and start

1. open a command line and ensure that the the current directory is set to the root folder of this sample app
1. there's nothing (!) to install here. Package.json is only provided to call/run the application...
1. run the application (starting a http-server without any installation)

```shell
> cd example/browser
> npm start
```

## Explanatory notes

Since the *treeifier-utils* library is dependent from the "chalk" library, it is not possible to use it directly here.

To solve this, using a *bundler* application like webpack, rollup, browserify etc... would be required. Though it is not the purpose of this sample app to demonstrate the usage of bundlers.

Basically, this sample app aims to demonstrate the direct usage of a TS &rightarrow; ESM converted library.
