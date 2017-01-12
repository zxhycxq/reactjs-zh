Components 让你的ui独立起来。
Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

## 函数和class组件
## Functional and Class Components

定义一个组件最简单的方法就是写一个js函数

The simplest way to define a component is to write a JavaScript function:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
这个函数是一个无效的react组件，因为他通过数据接受了一个‘props’对象数组，返回了一个react 元素。
我们把这些组件叫做功能性，因为他们看起来就是js函数

This function is a valid React component because it accepts a single "props" object argument with data and returns a React element. We call such components "functional" because they are literally JavaScript functions.

你也可用es6 定义一个组件。

You can also use an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) to define a component:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
相等

The above two components are equivalent from React's point of view.

Classes have some additional features that we will discuss in the [next sections](/react/docs/state-and-lifecycle.html). Until then, we will use functional components for their conciseness.

## 渲染一个组件
## Rendering a Component

先前，我们仅遇到react元素代表dom 标签

Previously, we only encountered React elements that represent DOM tags:

```js
const element = <div />;
```
然而，元素也可被自定义标签代表。

However, elements can also represent user-defined components:

```js
const element = <Welcome name="Sara" />;
```

它将JSX属性作为单个对象传递给此组件。 我们称这个对象为“props”

When React sees an element representing a user-defined component, it passes JSX attributes to this component as a single object. We call this object "props".

For example, this code renders "Hello, Sara" on the page:

```js{1,5}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Try it on CodePen.](http://codepen.io/gaearon/pen/YGYmEG?editors=0010)

简要叙述下例子中发生了什么

Let's recap what happens in this example:

1. We call `ReactDOM.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.

>**Caveat:**
>
>组件名称总是大写字母

>Always start component names with a capital letter.
>
>For example, `<div />` represents a DOM tag, but `<Welcome />` represents a component and requires `Welcome` to be in scope.

>例如，`<div />`表示一个DOM标签，但 ` <Welcome />`表示一个组件，并要求 Welcome 在范围内。

## 组件构成
## Composing Components
组件可以引用其输出中的其他组件。 
这允许我们对任何级别的细节使用相同的组件抽象。
一个按钮，一个表单，一个对话框，一个屏幕：
在React应用程序中，所有这些通常表示为组件。

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

For example, we can create an `App` component that renders `Welcome` many times:

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[Try it on CodePen.](http://codepen.io/gaearon/pen/KgQKPr?editors=0010)

通常，新的React应用程序在顶部有一个单独的App组件。 但是，如果您将React集成到现有应用程序中，则可以使用Button这样的小组件自下而上开始逐步向上到达视图层次结构的顶部。

Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

>**Caveat:**
>
>组件必须返回单个根元素。 这就是为什么我们添加一个`<div>`来包含所有`<Welcome />`元素。

>Components must return a single root element. This is why we added a `<div>` to contain all the `<Welcome />` elements.

## 提取组件
## Extracting Components

Don't be afraid to split components into smaller components.

For example, consider this `Comment` component:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[Try it on CodePen.](http://codepen.io/gaearon/pen/VKQwEo?editors=0010)

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.

这个组件可能很难改变，
因为所有的嵌套，它也很难重用其中的单个部分。
 让我们从中提取几个组件。

This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. Let's extract a few components from it.

First, we will extract `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

 `Avatar` 不需要知道它是在评论内部呈现的。 这就是为什么我们给它的prop一个更通用的名称：用户而不是作者

The `Avatar` doesn't need to know that it is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

我们建议从组件自己的角度来命名 props，而不是使用它的上下文。

We recommend naming props from the component's own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Next, we will extract a `UserInfo` component that renders an `Avatar` next to user's name:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

This lets us simplify `Comment` even further:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[Try it on CodePen.](http://codepen.io/gaearon/pen/rrJNJY?editors=0010)

提取组件起初可能看起来像枯燥乏味的工作，
但是有一个可重用组件的调色板在较大的应用程序中支付。
 一个好的经验法则是，如果您的UI的一部分被使用了几次（按钮，面板，头像），
 或者自己复杂（App，FeedStory，评论），
 它是一个很好的候选人是一个可重用的组件 。

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable component.

## Props 是只读的
## Props are Read-Only

无论你声明一个组件作为函数还是class，
 props。 考虑这个 sum 函数：

Whether you declare a component [as a function or a class](#functional-and-class-components), it must never modify its own props. Consider this `sum` function:

```js
function sum(a, b) {
  return a + b;
}
```
[纯函数] (什么叫pure function（纯函数） - hongweigg的专栏 - 博客频道 - CSDN.NET  http://blog.csdn.net/hongweigg/article/details/44035283)

因为它们不尝试改变它们的输入，
并且对于相同的输入总是返回相同的结果。

Such functions are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

相反，这个函数是不纯的，因为它改变自己的输入：

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React非常灵活，但它有一个严格的规则：

React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

**所有React组件必须像它们的props的纯函数一样运行。**

当然，应用程序UI是动态的，随时间变化。 在下一节中，我们将介绍一个“状态”的新概念。 状态允许React组件响应用户操作，网络响应和其他任何内容随时间更改其输出，而不违反此规则。

Of course, application UIs are dynamic and change over time. In the [next section](/react/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
