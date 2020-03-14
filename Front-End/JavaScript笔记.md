# JS学习笔记

## 基本概念
一个完整的JavaScript实现应该由三个不同的部分组成：核心（ECMAScript）、文档对象模型（DOM）、浏览器对象模型（BOM）

包含在`<script>`元素内部的JavaScript代码将被从上至下依次解释。为了避免延迟浏览器出现空白，现代Web应用程序一般都把全部JavaScript引用放在`<body>`元素中页面内容的后面

一般认为最好的做法还是尽可能使用外部文件来包含 JavaScript代码。可维护性，可缓存，适应未来

## 基础语法

ECMAScript中的一切（变量、函数名和操作符）都区分大小写。标识符第一个字符必须是一个字母、下划线（_）或一个美元符号（$）；其他字符可以是字母、下划线、美元符号或数字。

## 变量

### var来声明

ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。

`var message`像这样只是声明一个变量，并没有初始化，它的值将是undefined

变量声明具有hoisting机制，JavaScript引擎在执行的时候，会把所有变量的声明都提升到当前作用域的最前面。

### let来声明

let声明的变量只在其所在代码块内有效（意味着ES6支持块级作用域了），并且不会发生“变量提升“现象

### const来声明

一旦声明，常量的值就不能改变。const的作用域与let命令相同：只在声明所在的块级作用域内有效；不存在“变量提升“现象，只能在声明的位置后面使用；也不可重复声明。

var和function声明的全局变量，属于全局对象的属性（浏览器中`windows.`可以调用）；let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。

## 数据类型

5种基础数据类型：Undefined、Null、Boolean、Number和String；1种复杂数据类型Object（无序键值对）；还有ES6引入了一种新的基本数据类型Symbol。可用`typeof`进行检查（typeof是一个操作符而不是函数）

### Undefined

Undefined类型只有一个值，即特殊的undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined

### Null
Null类型也只有一个值。null 值表示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回”object”的原因。undefined值是派生自null值的，null == undefined将会返回true。

### Bollean
任何类型都可以调用Boolean()函数，返回对应的true or false

### Number
isNaN()函数参数可以是任何类型，确定这个参数是否“不是数值”。

isFinite()函数，确定一个数值是不是有穷的。

有3个函数可以把非数值转换为数值：Number()、parseInt()（支持输入进制数）和parseFloat()（可以在字符串前加+将其转为数字，如+'10'）

### String
单引号和双引号都可以。数值、布尔值、对象和字符串值都有`toString()`方法

### Symbol

它是一种类似于字符串的数据类型，Symbol 生成一个全局唯一的值

### Object
`var o = new Object();`

每个Object都有以下方法：
* Constructor 构造函数
* hasOwnProperty(propertyName) 检查属性是否存在
* isPrototypeOf(object)：用于检查传入的对象是否是另一个对象的原型
* propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in语句来枚举。
* toLocaleString()：返回对象的字符串表示，与执行环境的地区对应
* toString()：返回对象的字符串表示
* valueOf()：分返回对象的字符串、数值或布尔值表示

## 操作符
js中操作符通常可以对各种数据类型进行操作，其中会涉及到类型的转换。

### 一元操作符
`++, --, +, -`，能够适用于很多值，例如字符串、数字值、布尔值，甚至对象。在应用于对象时，相应的操作符通常都会调用对象的valueOf()和（或）toString()方法。

### 位操作符
`~,&,|,^,<<,>>,>>>`，其中`>>`和`>>>`的区别是前者补的是符号位，后者固定补0

### 布尔操作符
`!,&&,||`

### 乘性操作符
`*,/,%`

### 加性操作符
`+,-`

### 关系操作符
`>,<,>=,<=`

### 相等操作符
`===,!==,==,!=`

相等和不相等——先转换再比较，全等和不全等——仅比较而不转换

### 条件操作符
`boolean_expression?true_value:false_value`

### 逗号操作符
`,`返回最后一个元素

### 赋值操作符
`=, *=, +=`

解构赋值：`var [a, b, c] = [1, 2, 3];` 或 `var { bar, foo } = { foo: "aaa", bar: "bbb" };//bar = "bbb", foo = "aaa"`。`	let { log, sin, cos } = Math;`

字符串也可以解构赋值。`const [a, b, c, d, e] = 'hello';//a = "h", b = "e", c = "l", d = "l", e = "o"`，`let {length : len} = 'hello'; //len = 5`

解构赋值可以用在：swap两个变量的值，函数返回多个值，函数参数传入，提取json解构数据，函数参数默认值，遍历Map()结构，输入模块的指定方法（如：`const { SourceMapConsumer, SourceNode } = require("source-map");`）

## 语句

和java语法类似有`if, do-while,while,for,label,break,continue,switch`。其中`label`语句经常和`break continue`一起出现。

### for-in

可用于枚举对象属性。`for index in array`遍历的是下标。

### with

用以将对象的属性作为局部变量。不推荐大量使用。

### for-of

一个数据结构只要部署了Symbol.iterator方法，就被视为具有Iterable接口，就可以用for…of循环遍历它的成员。for…of循环可以使用的范围包括数组、Set和Map结构及其entries,values,keys方法返回的对象、某些类似数组的对象。

for…in循环，只能获得对象的键名，不能直接获取键值。`for(var x of Object.keys(window))`。

## 函数

实参和形参个数可以不对应，可以在函数体内通过`arguments`进行访问。js中没有函数重载。

## 箭头函数

箭头`=>`函数类似其他语法中的lambda表达式。`(param1, param2, paramN) => { statements }`。

## Generator函数

Generator函数是一个普通函数，但是有两个特征。一是，function命令与函数名之间有一个星号；二是，函数体内部使用yield语句，定义遍历器的每个成员，即不同的内部状态

调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个Iterator对象。必须调用Iterator对象的next方法。调用Generator函数，返回一个实现了Iterator接口的对象，用来操作内部指针

yield语句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。

可以使用`for-of`语句进行遍历。

该函数可以在函数体外抛出错误，然后在函数体内捕获。

### `yield*`语句

`yield*`不过是for…of的一种简写形式，完全可以用后者替代前者。

### Generator作为对象属性
```javascript
let obj = {
  * myGeneratorMethod() { // 等价于 myGeneratorMethod: function* ()
    ···
  }
};
```

### Generator函数推导

`let squared = ( for (n of generator()) n * n );` 等价于`let squared = Array.from(generator()).map(n => n * n);`。

## 模块

### 模块的引用
ES6允许将独立的JS文件作为模块，export命令，一种输出方式是只需要在原有声明变量、函数、类语句前加export，另一种方式是在export后使用大括号指定需要输出的变量、函数、类，并且中间用逗号分隔。eg：`export var year = 1958;` or `export {name, year};`

import命令，使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块。eg：`import {name, year} from './profile';`

module命令，module命令可以取代import语句，达到整体输入模块的作用。eg:`module circle from 'circle';`。

export default命令，为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。eg：`export default function ()`，`import customName from './export-default';`。

### 模块的继承

`export * from 'circle';`表示输出circle模块的所有属性和方法

## 错误处理

### try-catch语句

```javascript
try{
// 可能会导致错误的代码
} catch(error){
// 在错误发生时怎么处理
} finally {
//...
}
```

内置使用内置的Error对象具有两个标准属性name和message。ECMA-262 定义了下列 7 种错误类型: Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError

## Reference
[JavaScript 基本语法](http://howiefh.github.io/2015/08/28/javascript-grammar/)