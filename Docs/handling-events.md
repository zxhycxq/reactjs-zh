使用react元素进行事件处理和用DOM元素事件处理是非常类似的，下面是一些不同点：

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

* React 事件以驼峰命名，而非小写
* 使用JSX传递一个函数作为事件处理程序，而不是一个字符串。


* React events are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

例如，在html中

For example, the HTML:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
在react中是稍微有些不同的：

is slightly different in React:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
在react中，另一个不同是，你不能返回false去阻止默认行为。
你必须调明确地用preventDefault。
例如：使用纯HTML，为了防止打开新页面的默认链接行为，您可以这样写：

Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default link behavior of opening a new page, you can write:

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

在React中，用下面的替代

In React, this could instead be:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();     //写这个！！
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
这里，`e` 是个合成事件，react根据W3C定义这些合成事件。
所以，你不用担心跨浏览器兼容性问题。
在[`SyntheticEvent`](/react/docs/events.html)  指南学习更多。

Here, `e` is a synthetic event. React defines these synthetic events according to the [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), so you don't need to worry about cross-browser compatibility. See the [`SyntheticEvent`](/react/docs/events.html) reference guide to learn more.

当使用react的时候，你通常不需要调用addEventListener为创建后的dom元素增加监听器。
相反，当元素初始化渲染的时候，仅提供一个监听器就可以了。

When using React you should generally not need to call `addEventListener` to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.

当您使用ES6类定义组件时，常见的模式是将事件处理程序作为class上的方法。
例如，此Toggle组件呈现一个按钮，让用户在“ON”和“OFF”状态之间切换：

When you define a component using an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), a common pattern is for an event handler to be a method on the class. For example, this `Toggle` component renders a button that lets the user toggle between "ON" and "OFF" states:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    //这个绑定必须的，以确保`this`在回调函数中正常运行。
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/xEmzGg?editors=0010)

你必须密切关注this在jsx回调函数中的意思。
在js中，class方法默认不绑定，如果你忘记绑定this.handleClick并将其传递给onClick，
那么在函数实际调用的时候，this是未定义的。

You have to be careful about the meaning of `this` in JSX callbacks. In JavaScript, class methods are not [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) by default. If you forget to bind `this.handleClick` and pass it to `onClick`, `this` will be `undefined` when the function is actually called.

这并非react特殊的行为，这是函数如何在js中运行的一部分。
通常来说，如果你在这之后没有（）去引用一个方法，
如onClick = {this.handleClick}，你应该绑定该方法。

This is not React-specific behavior; it is a part of [how functions work in JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}`, you should bind that method.

如果调用bind会使你烦恼，有两种方法可以解决这个问题。
如果您使用的是实验 属性初始值设定语法，
您可以使用属性初始值设定工具来正确绑定回调：

If calling `bind` annoys you, there are two ways you can get around this. If you are using the experimental [property initializer syntax](https://babeljs.io/docs/plugins/transform-class-properties/), you can use property initializers to correctly bind callbacks:

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // 这个语法确保this在handleClick里面绑定
  // Warning: this is *experimental* syntax.
  //警告：this是实验性的语法
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

This syntax is enabled by default in [Create React App](https://github.com/facebookincubator/create-react-app).

这个语法在 [Create React App](https://github.com/facebookincubator/create-react-app).中默认启用。

If you aren't using property initializer syntax, you can use an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in the callback:

你也可在回调函数中用箭头函数。

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>//关键地方
        Click me
      </button>
    );
  }
}
```

此语法的问题是，每次LoggingButton呈现时都会创建不同的回调。
在大多数情况下，这是良好的。
 然而，如果这个回调作为一个prop传递给较低的组件，
 这些组件可能会做额外的重新渲染。 
我们一般建议在构造函数中绑定以避免这种性能问题。

The problem with this syntax is that a different callback is created each time the `LoggingButton` renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor to avoid this sort of performance problem.
