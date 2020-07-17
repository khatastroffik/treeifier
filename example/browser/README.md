# treeifier ESM (Browser) Sample application

back to [examples page][examples] back to [main project page][mainpage]

## purpose

Demonstrate the use of the **treeifier** library in a browser. The example is also showing how to use your own (custom) "processor" function.

## installation and start

1. open a command line and ensure that the the current directory is set to the root folder of this sample app
1. there's nothing (!) to install here. Package.json is only provided to call/run the application.
1. run the application (starting a http-server without any installation) using the npm script

```shell
> cd example/browser
> npm start
```

## Explanatory notes

Since the *treeifier-utils* library is dependent from the "chalk" library, it is not possible to use it directly here.

To solve this, using a *bundler* application like webpack, rollup, browserify etc... would be required. Though it is not the purpose of this sample app to demonstrate the usage of bundlers.

Basically, this sample app aims to demonstrate the direct usage of a TS &rightarrow; ESM converted library. The *treeifier* library generates the **ESM files** in the `browser` sub-directory of the `dist` folder. The sample app is holding a **copy** of those files in its `js` folder instead of linking directly to them: this is to ease the deployment using the `http-server` package called when `npm start` is executed.

Note: An installation of the `http-server` package is not required, since it is called using `npx`, which is taking care of downloading the package on demand if its not available/installed prior the call.

## screenshot

![web app](../../doc/screenshot-treeifier-example-web-application.png)

[mainpage]: ../../README.md
[examples]: ../README.md
