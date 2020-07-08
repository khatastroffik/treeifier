<!-- markdownlint-disable MD033 MD005 -->
# debugging

You may like to debug the analyze done by Treeifier. For this purpose, you can use the `debug` function provided in the [treeifier-utils][treeifier-utils] library. This function will provide a **textual representation of the generated TreeifierNode structure** i.e. it will show the details of the generated (internal) nodes.

Note: the `debug` function itself is based on the simple treeifier functionality, only providing a suitable "processor" to generate the *debug representation*. In other words, *treeifier is debugging treeifier*! Kind of a recursion here... ;-)

[write-processor]: ./writing-a-processor-function.md
[treeifier-utils]: https://github.com/khatastroffik/treeifier-utils
[API-documentation]: ./api.md
