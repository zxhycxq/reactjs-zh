元素是构建react app的最小砌块

Elements are the smallest building blocks of React apps.

一个元素描述你希望在屏幕上看到的内容。

An element describes what you want to see on the screen:

```js
const element = <h1>Hello, world</h1>;
```
不像浏览器dom元素，react元素是简单对象，可简单创造。
react dom 关心DOM 匹配react 元素 的更新。

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

>**Note:**
>
>可能被组件原则所困惑，我们将在下一部分介绍。 We will introduce components in the [next section](/react/docs/components-and-props.html). Elements are what components are "made of", and we encourage you to read this section before jumping ahead.

>One might confuse elements with a more widely known concept of "components". We will introduce components in the [next section](/react/docs/components-and-props.html). Elements are what components are "made of", and we encourage you to read this section before jumping ahead.

## 渲染元素到DOM
## Rendering an Element into the DOM
比方说，在你的html文件中有一个`</div>`元素。

Let's say there is a `<div>` somewhere in your HTML file:

```html
<div id="root"></div>
```
我们把它叫做DOM跟节点。因为里面所有的内容将被react dom 管理。

We call this a "root" DOM node because everything inside it will be managed by React DOM.

仅用react构建的应用通常有一个DOM根节点，如果你要集成react到一个已有的app中，
你可以根据你的喜好分离你的dom节点。

Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like.

为dom根节点渲染一个react元素，传递给`ReactDOM.render()`:

To render a React element into a root DOM node, pass both to `ReactDOM.render()`:

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[Try it on CodePen.](http://codepen.io/gaearon/pen/rrpgNB?editors=1010)


It displays "Hello, world" on the page.

## 更新渲染节点
## Updating the Rendered Element
React 元素是不变的，一旦创建，你不能呢过改变他的子元素或者属性。
React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object). Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

元素像电影中的单个场景：他代表当前时间点的UI。

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `ReactDOM.render()`.

用我们所知道的，更新UI唯一的方式是创建一个新元素，传递给 `ReactDOM.render()`.

看下这个时钟示例：

Consider this ticking clock example:

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[Try it on CodePen.](http://codepen.io/gaearon/pen/gwoJZk?editors=0010)

从回调函数中每隔一秒调用 `ReactDOM.render()` 

It calls `ReactDOM.render()` every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.

>**Note:**
>
>在实践中大多数react app紧调用`ReactDOM.render()`一次.
 In the next sections we will learn how such code gets encapsulated into [stateful components](/react/docs/state-and-lifecycle.html).

>In practice, most React apps only call `ReactDOM.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/react/docs/state-and-lifecycle.html).
>
>We recommend that you don't skip topics because they build on each other.

## React仅更新必须的
## React Only Updates What's Necessary
React DOM将元素及其子元素与上一元素进行比较，并仅应用DOM更新以使DOM达到所需状态 

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

您可以通过使用浏览器工具检查最后一个示例来验证：

You can verify by inspecting the [last example](https://facebook.github.io/react/img/docs/granular-dom-updates.gif) with the browser tools:

![DOM inspector showing granular updates](/react/img/docs/granular-dom-updates.gif)

Even though we create an element describing the whole UI tree on every tick, only the text node whose contents has changed gets updated by React DOM.

即使我们在每个tick上创建一个描述整个UI树的元素，只有内容发生改变的文本节点才被React DOM更新。



在我们的经验中，思考UI应该如何看待任何给定的时刻，而不是如何改变它随着时间的消除一个整体的错误。

In our experience, thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class of bugs.
