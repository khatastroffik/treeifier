# debug result sample for "*should debug an object containing circular refs directly*"

using the `debugProcessor` function provided in the `treeifier-utils.ts` file.

## Object tree

<!-- markdownlint-disable MD033 MD005 -->
<pre style="line-height:1.3em; font-family: 'Courier New', Courier, monospace;">
   shouldmakeit
    ├─ key shouldmakeit
    ├─ value
    │  ├─ a 1
    │  ├─ b
    │  │  ├─ c #
    │  │  └─ xtra
    │  │     ├─ alpha [9, z, 8, y]
    │  │     ├─ beta maximum
    │  │     └─ delta 4711
    │  ├─ f function
    │  ├─ g
    │  │  ├─ h
    │  │  │  └─ i
    │  │  │     ├─ j 987
    │  │  │     └─ k test
    │  │  └─ l [a, b, c]
    │  ├─ m 3
    │  └─ n
    │     └─ someparent circular ref. value
    ├─ index 0
    ├─ parent null
    ├─ nodeType nonEmptyObject
    ├─ ancestors [shouldmakeit]
    ├─ circularRefIndex -1
    ├─ isCircular false
    ├─ circularRefNode null
    ├─ isLeaf false
    ├─ isBranch true
    ├─ isValue false
    ├─ depth 0
    ├─ maxIndex 0
    ├─ prefix
    ├─ joint
    ├─ children
    │  ├─ 0
    │  │  ├─ key a
    │  │  ├─ value 1
    │  │  ├─ index 0
    │  │  ├─ parent circular ref. shouldmakeit
    │  │  ├─ nodeType number
    │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.0]
    │  │  ├─ circularRefIndex -1
    │  │  ├─ isCircular false
    │  │  ├─ circularRefNode null
    │  │  ├─ isLeaf true
    │  │  ├─ isBranch false
    │  │  ├─ isValue true
    │  │  ├─ depth 1
    │  │  ├─ maxIndex 5
    │  │  ├─ prefix
    │  │  ├─ joint ├─
    │  │  ├─ children []
    │  │  ├─ path shouldmakeit.a
    │  │  └─ processResult ├─ a : 1
    │  ├─ 1
    │  │  ├─ key b
    │  │  ├─ value
    │  │  │  ├─ c #
    │  │  │  └─ xtra
    │  │  │     ├─ alpha [9, z, 8, y]
    │  │  │     ├─ beta maximum
    │  │  │     └─ delta 4711
    │  │  ├─ index 1
    │  │  ├─ parent circular ref. shouldmakeit
    │  │  ├─ nodeType nonEmptyObject
    │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.1]
    │  │  ├─ circularRefIndex -1
    │  │  ├─ isCircular false
    │  │  ├─ circularRefNode null
    │  │  ├─ isLeaf false
    │  │  ├─ isBranch true
    │  │  ├─ isValue false
    │  │  ├─ depth 1
    │  │  ├─ maxIndex 5
    │  │  ├─ prefix
    │  │  ├─ joint ├─
    │  │  ├─ children
    │  │  │  ├─ 0
    │  │  │  │  ├─ key c
    │  │  │  │  ├─ value #
    │  │  │  │  ├─ index 0
    │  │  │  │  ├─ parent circular ref. 1
    │  │  │  │  ├─ nodeType string
    │  │  │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.1, shouldmakeit.children.1.children, shouldmakeit.children.1.children.0]
    │  │  │  │  ├─ circularRefIndex -1
    │  │  │  │  ├─ isCircular false
    │  │  │  │  ├─ circularRefNode null
    │  │  │  │  ├─ isLeaf true
    │  │  │  │  ├─ isBranch false
    │  │  │  │  ├─ isValue true
    │  │  │  │  ├─ depth 2
    │  │  │  │  ├─ maxIndex 1
    │  │  │  │  ├─ prefix │  
    │  │  │  │  ├─ joint ├─
    │  │  │  │  ├─ children []
    │  │  │  │  ├─ path shouldmakeit.b.c
    │  │  │  │  └─ processResult │  ├─ c : #
    │  │  │  └─ 1
    │  │  │     ├─ key xtra
    │  │  │     ├─ value
    │  │  │     │  ├─ alpha [9, z, 8, y]
    │  │  │     │  ├─ beta maximum
    │  │  │     │  └─ delta 4711
    │  │  │     ├─ index 1
    │  │  │     ├─ parent circular ref. 1
    │  │  │     ├─ nodeType nonEmptyObject
    │  │  │     ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.1, shouldmakeit.children.1.children, shouldmakeit.children.1.children.1]
    │  │  │     ├─ circularRefIndex -1
    │  │  │     ├─ isCircular false
    │  │  │     ├─ circularRefNode null
    │  │  │     ├─ isLeaf false
    │  │  │     ├─ isBranch true
    │  │  │     ├─ isValue false
    │  │  │     ├─ depth 2
    │  │  │     ├─ maxIndex 1
    │  │  │     ├─ prefix │  
    │  │  │     ├─ joint └─
    │  │  │     ├─ children
    │  │  │     │  ├─ 0
    │  │  │     │  │  ├─ key alpha
    │  │  │     │  │  ├─ value [9, z, 8, y]
    │  │  │     │  │  ├─ index 0
    │  │  │     │  │  ├─ parent circular ref. 1
    │  │  │     │  │  ├─ nodeType array
    │  │  │     │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.1, shouldmakeit.children.1.children, shouldmakeit.children.1.children.1, shouldmakeit.children.1.children.1.children, shouldmakeit.children.1.children.1.children.0]
    │  │  │     │  │  ├─ circularRefIndex -1
    │  │  │     │  │  ├─ isCircular false
    │  │  │     │  │  ├─ circularRefNode null
    │  │  │     │  │  ├─ isLeaf true
    │  │  │     │  │  ├─ isBranch false
    │  │  │     │  │  ├─ isValue false
    │  │  │     │  │  ├─ depth 3
    │  │  │     │  │  ├─ maxIndex 2
    │  │  │     │  │  ├─ prefix │
    │  │  │     │  │  ├─ joint ├─
    │  │  │     │  │  ├─ children []
    │  │  │     │  │  ├─ path shouldmakeit.b.xtra.alpha
    │  │  │     │  │  └─ processResult │     ├─ alpha : [9, z, 8, y]
    │  │  │     │  ├─ 1
    │  │  │     │  │  ├─ key beta
    │  │  │     │  │  ├─ value maximum
    │  │  │     │  │  ├─ index 1
    │  │  │     │  │  ├─ parent circular ref. 1
    │  │  │     │  │  ├─ nodeType string
    │  │  │     │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.1, shouldmakeit.children.1.children, shouldmakeit.children.1.children.1, shouldmakeit.children.1.children.1.children, shouldmakeit.children.1.children.1.children.1]
    │  │  │     │  │  ├─ circularRefIndex -1
    │  │  │     │  │  ├─ isCircular false
    │  │  │     │  │  ├─ circularRefNode null
    │  │  │     │  │  ├─ isLeaf true
    │  │  │     │  │  ├─ isBranch false
    │  │  │     │  │  ├─ isValue true
    │  │  │     │  │  ├─ depth 3
    │  │  │     │  │  ├─ maxIndex 2
    │  │  │     │  │  ├─ prefix │
    │  │  │     │  │  ├─ joint ├─
    │  │  │     │  │  ├─ children []
    │  │  │     │  │  ├─ path shouldmakeit.b.xtra.beta
    │  │  │     │  │  └─ processResult │     ├─ beta : maximum
    │  │  │     │  └─ 2
    │  │  │     │     ├─ key delta
    │  │  │     │     ├─ value 4711
    │  │  │     │     ├─ index 2
    │  │  │     │     ├─ parent circular ref. 1
    │  │  │     │     ├─ nodeType number
    │  │  │     │     ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.1, shouldmakeit.children.1.children, shouldmakeit.children.1.children.1, shouldmakeit.children.1.children.1.children, shouldmakeit.children.1.children.1.children.2]
    │  │  │     │     ├─ circularRefIndex -1
    │  │  │     │     ├─ isCircular false
    │  │  │     │     ├─ circularRefNode null
    │  │  │     │     ├─ isLeaf true
    │  │  │     │     ├─ isBranch false
    │  │  │     │     ├─ isValue true
    │  │  │     │     ├─ depth 3
    │  │  │     │     ├─ maxIndex 2
    │  │  │     │     ├─ prefix │
    │  │  │     │     ├─ joint └─
    │  │  │     │     ├─ children []
    │  │  │     │     ├─ path shouldmakeit.b.xtra.delta
    │  │  │     │     └─ processResult │     └─ delta : 4711
    │  │  │     ├─ path shouldmakeit.b.xtra
    │  │  │     └─ processResult │  └─ xtra\n│     ├─ alpha : [9, z, 8, y]\n│     ├─ beta : maximum\n│     └─ delta : 4711
    │  │  ├─ path shouldmakeit.b
    │  │  └─ processResult ├─ b\n│  ├─ c : #\n│  └─ xtra\n│     ├─ alpha : [9, z, 8, y]\n│     ├─ beta : maximum\n│     └─ delta : 4711
    │  ├─ 2
    │  │  ├─ key f
    │  │  ├─ value function
    │  │  ├─ index 2
    │  │  ├─ parent circular ref. shouldmakeit
    │  │  ├─ nodeType function
    │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.2]
    │  │  ├─ circularRefIndex -1
    │  │  ├─ isCircular false
    │  │  ├─ circularRefNode null
    │  │  ├─ isLeaf true
    │  │  ├─ isBranch false
    │  │  ├─ isValue true
    │  │  ├─ depth 1
    │  │  ├─ maxIndex 5
    │  │  ├─ prefix
    │  │  ├─ joint ├─
    │  │  ├─ children []
    │  │  ├─ path shouldmakeit.f
    │  │  └─ processResult ├─ f : function
    │  ├─ 3
    │  │  ├─ key g
    │  │  ├─ value
    │  │  │  ├─ h
    │  │  │  │  └─ i
    │  │  │  │     ├─ j 987
    │  │  │  │     └─ k test
    │  │  │  └─ l [a, b, c]
    │  │  ├─ index 3
    │  │  ├─ parent circular ref. shouldmakeit
    │  │  ├─ nodeType nonEmptyObject
    │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.3]
    │  │  ├─ circularRefIndex -1
    │  │  ├─ isCircular false
    │  │  ├─ circularRefNode null
    │  │  ├─ isLeaf false
    │  │  ├─ isBranch true
    │  │  ├─ isValue false
    │  │  ├─ depth 1
    │  │  ├─ maxIndex 5
    │  │  ├─ prefix
    │  │  ├─ joint ├─
    │  │  ├─ children
    │  │  │  ├─ 0
    │  │  │  │  ├─ key h
    │  │  │  │  ├─ value
    │  │  │  │  │  └─ i
    │  │  │  │  │     ├─ j 987
    │  │  │  │  │     └─ k test
    │  │  │  │  ├─ index 0
    │  │  │  │  ├─ parent circular ref. 3
    │  │  │  │  ├─ nodeType nonEmptyObject
    │  │  │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.3, shouldmakeit.children.3.children, shouldmakeit.children.3.children.0]
    │  │  │  │  ├─ circularRefIndex -1
    │  │  │  │  ├─ isCircular false
    │  │  │  │  ├─ circularRefNode null
    │  │  │  │  ├─ isLeaf false
    │  │  │  │  ├─ isBranch true
    │  │  │  │  ├─ isValue false
    │  │  │  │  ├─ depth 2
    │  │  │  │  ├─ maxIndex 1
    │  │  │  │  ├─ prefix │  
    │  │  │  │  ├─ joint ├─
    │  │  │  │  ├─ children
    │  │  │  │  │  └─ 0
    │  │  │  │  │     ├─ key i
    │  │  │  │  │     ├─ value
    │  │  │  │  │     │  ├─ j 987
    │  │  │  │  │     │  └─ k test
    │  │  │  │  │     ├─ index 0
    │  │  │  │  │     ├─ parent circular ref. 0
    │  │  │  │  │     ├─ nodeType nonEmptyObject
    │  │  │  │  │     ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.3, shouldmakeit.children.3.children, shouldmakeit.children.3.children.0, shouldmakeit.children.3.children.0.children, shouldmakeit.children.3.children.0.children.0]
    │  │  │  │  │     ├─ circularRefIndex -1
    │  │  │  │  │     ├─ isCircular false
    │  │  │  │  │     ├─ circularRefNode null
    │  │  │  │  │     ├─ isLeaf false
    │  │  │  │  │     ├─ isBranch true
    │  │  │  │  │     ├─ isValue false
    │  │  │  │  │     ├─ depth 3
    │  │  │  │  │     ├─ maxIndex 0
    │  │  │  │  │     ├─ prefix │  │  
    │  │  │  │  │     ├─ joint └─
    │  │  │  │  │     ├─ children
    │  │  │  │  │     │  ├─ 0
    │  │  │  │  │     │  │  ├─ key j
    │  │  │  │  │     │  │  ├─ value 987
    │  │  │  │  │     │  │  ├─ index 0
    │  │  │  │  │     │  │  ├─ parent circular ref. 0
    │  │  │  │  │     │  │  ├─ nodeType number
    │  │  │  │  │     │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.3, shouldmakeit.children.3.children, shouldmakeit.children.3.children.0, shouldmakeit.children.3.children.0.children, shouldmakeit.children.3.children.0.children.0, shouldmakeit.children.3.children.0.children.0.children, shouldmakeit.children.3.children.0.children.0.children.0]
    │  │  │  │  │     │  │  ├─ circularRefIndex -1
    │  │  │  │  │     │  │  ├─ isCircular false
    │  │  │  │  │     │  │  ├─ circularRefNode null
    │  │  │  │  │     │  │  ├─ isLeaf true
    │  │  │  │  │     │  │  ├─ isBranch false
    │  │  │  │  │     │  │  ├─ isValue true
    │  │  │  │  │     │  │  ├─ depth 4
    │  │  │  │  │     │  │  ├─ maxIndex 1
    │  │  │  │  │     │  │  ├─ prefix │  │
    │  │  │  │  │     │  │  ├─ joint ├─
    │  │  │  │  │     │  │  ├─ children []
    │  │  │  │  │     │  │  ├─ path shouldmakeit.g.h.i.j
    │  │  │  │  │     │  │  └─ processResult │  │     ├─ j : 987
    │  │  │  │  │     │  └─ 1
    │  │  │  │  │     │     ├─ key k
    │  │  │  │  │     │     ├─ value test
    │  │  │  │  │     │     ├─ index 1
    │  │  │  │  │     │     ├─ parent circular ref. 0
    │  │  │  │  │     │     ├─ nodeType string
    │  │  │  │  │     │     ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.3, shouldmakeit.children.3.children, shouldmakeit.children.3.children.0, shouldmakeit.children.3.children.0.children, shouldmakeit.children.3.children.0.children.0, shouldmakeit.children.3.children.0.children.0.children, shouldmakeit.children.3.children.0.children.0.children.1]
    │  │  │  │  │     │     ├─ circularRefIndex -1
    │  │  │  │  │     │     ├─ isCircular false
    │  │  │  │  │     │     ├─ circularRefNode null
    │  │  │  │  │     │     ├─ isLeaf true
    │  │  │  │  │     │     ├─ isBranch false
    │  │  │  │  │     │     ├─ isValue true
    │  │  │  │  │     │     ├─ depth 4
    │  │  │  │  │     │     ├─ maxIndex 1
    │  │  │  │  │     │     ├─ prefix │  │
    │  │  │  │  │     │     ├─ joint └─
    │  │  │  │  │     │     ├─ children []
    │  │  │  │  │     │     ├─ path shouldmakeit.g.h.i.k
    │  │  │  │  │     │     └─ processResult │  │     └─ k : test
    │  │  │  │  │     ├─ path shouldmakeit.g.h.i
    │  │  │  │  │     └─ processResult │  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test
    │  │  │  │  ├─ path shouldmakeit.g.h
    │  │  │  │  └─ processResult │  ├─ h\n│  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test
    │  │  │  └─ 1
    │  │  │     ├─ key l
    │  │  │     ├─ value [a, b, c]
    │  │  │     ├─ index 1
    │  │  │     ├─ parent circular ref. 3
    │  │  │     ├─ nodeType array
    │  │  │     ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.3, shouldmakeit.children.3.children, shouldmakeit.children.3.children.1]
    │  │  │     ├─ circularRefIndex -1
    │  │  │     ├─ isCircular false
    │  │  │     ├─ circularRefNode null
    │  │  │     ├─ isLeaf true
    │  │  │     ├─ isBranch false
    │  │  │     ├─ isValue false
    │  │  │     ├─ depth 2
    │  │  │     ├─ maxIndex 1
    │  │  │     ├─ prefix │  
    │  │  │     ├─ joint └─
    │  │  │     ├─ children []
    │  │  │     ├─ path shouldmakeit.g.l
    │  │  │     └─ processResult │  └─ l : [a, b, c]
    │  │  ├─ path shouldmakeit.g
    │  │  └─ processResult ├─ g\n│  ├─ h\n│  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test\n│  └─ l : [a, b, c]
    │  ├─ 4
    │  │  ├─ key m
    │  │  ├─ value 3
    │  │  ├─ index 4
    │  │  ├─ parent circular ref. shouldmakeit
    │  │  ├─ nodeType number
    │  │  ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.4]
    │  │  ├─ circularRefIndex -1
    │  │  ├─ isCircular false
    │  │  ├─ circularRefNode null
    │  │  ├─ isLeaf true
    │  │  ├─ isBranch false
    │  │  ├─ isValue true
    │  │  ├─ depth 1
    │  │  ├─ maxIndex 5
    │  │  ├─ prefix
    │  │  ├─ joint ├─
    │  │  ├─ children []
    │  │  ├─ path shouldmakeit.m
    │  │  └─ processResult ├─ m : 3
    │  └─ 5
    │     ├─ key n
    │     ├─ value
    │     │  └─ someparent
    │     │     ├─ a 1
    │     │     ├─ b
    │     │     │  ├─ c #
    │     │     │  └─ xtra
    │     │     │     ├─ alpha [9, z, 8, y]
    │     │     │     ├─ beta maximum
    │     │     │     └─ delta 4711
    │     │     ├─ f function
    │     │     ├─ g
    │     │     │  ├─ h
    │     │     │  │  └─ i
    │     │     │  │     ├─ j 987
    │     │     │  │     └─ k test
    │     │     │  └─ l [a, b, c]
    │     │     ├─ m 3
    │     │     └─ n circular ref. value
    │     ├─ index 5
    │     ├─ parent circular ref. shouldmakeit
    │     ├─ nodeType nonEmptyObject
    │     ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.5]
    │     ├─ circularRefIndex -1
    │     ├─ isCircular false
    │     ├─ circularRefNode null
    │     ├─ isLeaf false
    │     ├─ isBranch true
    │     ├─ isValue false
    │     ├─ depth 1
    │     ├─ maxIndex 5
    │     ├─ prefix
    │     ├─ joint └─
    │     ├─ children
    │     │  └─ 0
    │     │     ├─ key someparent
    │     │     ├─ value
    │     │     │  ├─ a 1
    │     │     │  ├─ b
    │     │     │  │  ├─ c #
    │     │     │  │  └─ xtra
    │     │     │  │     ├─ alpha [9, z, 8, y]
    │     │     │  │     ├─ beta maximum
    │     │     │  │     └─ delta 4711
    │     │     │  ├─ f function
    │     │     │  ├─ g
    │     │     │  │  ├─ h
    │     │     │  │  │  └─ i
    │     │     │  │  │     ├─ j 987
    │     │     │  │  │     └─ k test
    │     │     │  │  └─ l [a, b, c]
    │     │     │  ├─ m 3
    │     │     │  └─ n
    │     │     │     └─ someparent circular ref. value
    │     │     ├─ index 0
    │     │     ├─ parent circular ref. 5
    │     │     ├─ nodeType nonEmptyObject
    │     │     ├─ ancestors [shouldmakeit, shouldmakeit.children, shouldmakeit.children.5, shouldmakeit.children.5.children, shouldmakeit.children.5.children.0]
    │     │     ├─ circularRefIndex 0
    │     │     ├─ isCircular true
    │     │     ├─ circularRefNode circular ref. shouldmakeit
    │     │     ├─ isLeaf true
    │     │     ├─ isBranch false
    │     │     ├─ isValue false
    │     │     ├─ depth 2
    │     │     ├─ maxIndex 0
    │     │     ├─ prefix
    │     │     ├─ joint └─
    │     │     ├─ children []
    │     │     ├─ path shouldmakeit.n.someparent
    │     │     └─ processResult    └─ someparent : circular ref. -> shouldmakeit
    │     ├─ path shouldmakeit.n
    │     └─ processResult └─ n\n   └─ someparent : circular ref. -> shouldmakeit
    ├─ path shouldmakeit
    └─ processResult shouldmakeit\n├─ a : 1\n├─ b\n│  ├─ c : #\n│  └─ xtra\n│     ├─ alpha : [9, z, 8, y]\n│     ├─ beta : maximum\n│     └─ delta : 4711\n├─ f : function\n├─ g\n│  ├─ h\n│  │  └─ i\n│  │     ├─ j : 987\n│  │     └─ k : test\n│  └─ l : [a, b, c]\n├─ m : 3\n└─ n\n   └─ someparent : circular ref. -> shouldmakeit

</pre>
