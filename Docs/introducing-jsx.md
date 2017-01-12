
考虑到这个变量声明
```js
const element = <h1>Hello, world!</h1>;
```
这个奇怪的语法标签不是string也不是HTML。
他叫做JSX,是js的语法扩展
我们建议使用它描述UI应该呈现的样子。
 We recommend using it with React to describe what the UI should look like. 
 JSX may remind you of a template language,
  but it comes with the full power of JavaScript.

JSX produces React "elements". We will explore rendering them to the DOM in the [next section](/react/docs/rendering-elements.html). Below, you can find the basics of JSX necessary to get you started.
在本页下面，你可以找到JSX必需的基础知识开启你的旅程。

###在JSX中植入表达式
###Embedding Expressions in JSX
你可以在 JSX 中植入任何js表达式，通过将其包裹在花括号内。 
You can embed any [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) in JSX by wrapping it in curly braces.

例如， `2 + 2`, `user.name`, 和 `formatName(user)` 都是有效的表达式。


```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Try it on CodePen.](http://codepen.io/gaearon/pen/PGEjdG?editors=0010)
为了可读性，我们将jsx分割成了多行。
然而这并不是强制性的，当这样做的时候，我们推荐在圆括号内包裹他，避免进入js的ASI机制陷阱（自动分号插入）。
【译者注】[ASI介绍](http://justjavac.iteye.com/blog/1852405)

We split JSX over multiple lines for readability.
 While it isn't mandatory, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of [automatic semicolon insertion](http://stackoverflow.com/q/2846283).
### JSX 也是一种表达式
### JSX is an Expression Too
编译之后，jsx表达式变成了普通的js对象。
这意味着你可以在if 声明和for循环内使用jsx，将其分配给变量，接受其作为数组，从函数返回。

After compilation, JSX expressions become regular JavaScript objects.

This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
### jsx属性说明
### Specifying Attributes with JSX
你必须用引号声明string字面量作为属性

You may use quotes to specify string literals as attributes:

```js
const element = <div tabIndex="0"></div>;
```
你也可使用大括号在属性中嵌入js表达式
You may also use curly braces to embed a JavaScript expression in an attribute:

```js
const element = <img src={user.avatarUrl}></img>;
```
### jsx 子标签声明
### Specifying Children with JSX
如果标签是空的，你可以马上用`/>`使其闭合，就像XML一样。
If a tag is empty, you may close it immediately with `/>`, like XML:

```js
const element = <img src={user.avatarUrl} />;
```
JSX 标签也可包含子标签
JSX tags may contain children:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

>**Caveat:警告**
> 
>因为jsx更接近于js而不是html，React DOM  使用`驼峰命名` 属性名约定而非HTML属性名
>
>Since JSX is closer to JavaScript than HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names.
>
> 例如，在jsx中，class变为className，tabindex变为tabIndex。
>
>For example, `class` becomes [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX, and `tabindex` becomes [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### JSX 防止注入攻击
### JSX Prevents Injection Attacks
在jsx中插入用户输入是安全的。

It is safe to embed user input in JSX:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
默认，react dom 在渲染他们之前会在jsx中编码任何嵌入的值。

By default, React DOM [escapes](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.
这确保你不会被缩写 的应用中不明确的部分所注入。
这有助于防止XSS攻击。
### JSX Represents Objects
### JSX 对象表现
Babel 编译jsx为  `React.createElement()` 调用.
Babel compiles JSX down to `React.createElement()` calls.

这两个例子是完全相同的：

These two examples are identical:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
`React.createElement()`执行一些检查帮助你写无bug，但是本质上像创建对象的代码：

`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```js
// 笔记: 这是一个精简的结构
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```
这些对象叫做‘react 元素’，你可以描述为你希望在屏幕上看到的。
react 阅读这些对象，用他们去构建DOM，并保持他们最新

These objects are called "React elements". You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

在下一部分，我们将探索渲染react 元素到DOM。

We will explore rendering React elements to the DOM in the next section.

>**Tip:**
>
>我们推荐为你的编辑器搜索babel语法主题，以便es6和jsx代码能够高亮

>We recommend searching for a "Babel" syntax scheme for your editor of choice so that both ES6 and JSX code is properly highlighted.
