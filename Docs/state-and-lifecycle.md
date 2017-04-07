

Consider the ticking clock example from [one of the previous sections](/react/docs/rendering-elements.html#updating-the-rendered-element).

到目前为止，只有一种更新UI的方法



We call `ReactDOM.render()` to change the rendered output:

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

[在CodePen上试验.](http://codepen.io/gaearon/pen/gwoJZk?editors=0010)

在本节中，我们将学习如何使Clock组件真正可重用和封装。它将设置自己的计时器并每秒更新一次。

我们可以从封装时钟的外观开始：


```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/dpdoYR?editors=0010)

然而，它错过了一个关键的要求：
设置一个定时器的时钟和每秒更新UI的事实应该是时钟的实现细节。

However, it misses a crucial requirement: the fact that the `Clock` sets up a timer and updates the UI every second should be an implementation detail of the `Clock`.

理想情况下，我们要只写这一次，并使时钟自己更新：


```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

要实现这一点，我们需要添加“状态”到时钟组件。

状态类似于 props，但它是私有的，完全由组件控制。

我们之前提到，定义为类的组件有一些额外的特性。 本地状态就是：一个只有类可用的功能。

State is similar to props, but it is private and fully controlled by the component.

We [mentioned before](/react/docs/components-and-props.html#functional-and-class-components) that components defined as classes have some additional features. Local state is exactly that: a feature available only to classes.

## 函数转变为类
## Converting a Function to a Class

You can convert a functional component like `Clock` to a class in five steps:

您可以通过五个步骤将功能组件（如Clock）转换为类：

创建一个与扩展React.Component相同名称的ES6类。

为它添加一个单一的空方法render（）。

将函数的主体移动到render（）方法中。

在render（）主体中用this.props替换props。

删除剩余的空函数声明。

1. Create an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) with the same name that extends `React.Component`.

2. Add a single empty method to it called `render()`.

3. Move the body of the function into the `render()` method.

4. Replace `props` with `this.props` in the `render()` body.

5. Delete the remaining empty function declaration.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock`  现在被定义为一个类而不是函数。

这使我们可以使用额外的功能，
如局部状态和生命周期钩子。

## 为类增加局部状态
## Adding Local State to a Class

三步走，从props中移动`数据`到state


1) Replace `this.props.date` with `this.state.date` in the `render()` method:
1)  用 `this.state.date` 替换`this.props.date`在 `render()`方法中:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Add a [class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) that assigns the initial `this.state`:

2)增加一个 [class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) that assigns the initial `this.state`:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Note how we pass `props` to the base constructor:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Class components should always call the base constructor with `props`.

组件类应该总是使用 props 调用基础构造函数。

3) 从`<Clock />` 元素移除 `date` prop :

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

We will later add the timer code back to the component itself.

The result looks like this:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/KgQpJd?editors=0010)

Next, we'll make the `Clock` set up its own timer and update itself every second.

##为类增加生命周期方法


In applications with many components, it's very important to free up resources taken by the components when they are destroyed.

We want to [set up a timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) whenever the `Clock` is rendered to the DOM for the first time. This is called "mounting" in React.

We also want to [clear that timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) whenever the DOM produced by the `Clock` is removed. This is called "unmounting" in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts:

在具有许多组件的应用程序中，释放组件在销毁时占用的资源非常重要。

我们想要在第一次将时钟渲染到DOM时设置一个计时器。 这在React中称为“装载”。

我们还想清除定时器，当时钟产生的DOM被删除。 这在React中称为“卸载”。

我们可以在组件类上声明特殊方法，以便在组件装入和卸载时运行一些代码：

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

这些方法叫做：生命周期钩子


`componentDidMount()` 钩子在组件输出后运行

The `componentDidMount()` hook runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Note how we save the timer ID right on `this`.

While `this.props` is set up by React itself and `this.state` 有特殊的含义, you are free to add additional fields to the class manually if you need to store something that is not used for the visual output.

If you don't use something in `render()`, it shouldn't be in the state.

We will tear down the timer in the `componentWillUnmount()` lifecycle hook:

虽然this.props是由React本身设置的，并且this.state有一个特殊的含义，如果你需要存储不用于视觉输出的东西，你可以手动地添加额外的字段到类中。

如果你不使用render（）中的东西，它不应该处于状态。

我们将拆除componentWillUnmount（）生命周期钩子中的计时器：

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Finally, we will implement the `tick()` method that runs every second.

It will use `this.setState()` to schedule updates to the component local state:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/amqdNA?editors=0010)

Now the clock ticks every second.

Let's quickly recap what's going on and the order in which the methods are called:

1) 当 `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.

2) React 唤起 `Clock` 组件的 `render()` 方法. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`'s render output.

3) 当 `Clock` 输出在DOM中插入。 React 调用 `componentDidMount()` lifecycle hook. Inside it, the `Clock` component asks the browser to set up a timer to call `tick()` 每秒一次.

4) 每秒浏览器调用 `tick()` 方法. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

5) 如果 `Clock` 组件 从 DOM 中移除, React 唤起 `componentWillUnmount()` 生命周期钩子，timer 停止.

## 正确使用 state
## Using State Correctly

There are three things you should know about `setState()`.

###不要直接修改state

例如，这将不会重新渲染一个组件


```js
// Wrong
this.state.comment = 'Hello';
```

相反，使用`setState()`:


```js
// Correct
this.setState({comment: 'Hello'});
```
唯一可分配 `this.state`的地方是在构造函数中


### 状态更新可能异步
### State Updates May Be Asynchronous

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` 和 `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

例如：, this code may fail to update the counter:

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

上面我们使用了箭头函数 [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，
但他也会在常规函数中运行。

```js
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

### 状态更新已合并
### State Updates are Merged

当你唤起 `setState()`, React merges the object you provide into the current state.

例如, 你的状态可能包含了几个独立变量。

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Then you can update them independently with separate `setState()` calls:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

## The Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn't care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

This also works for user-defined components:

```js
<FormattedDate date={this.state.date} />
```

The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand:

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/zKRqNB?editors=0010)

This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an `App` component that renders three `<Clock>`s:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Each `Clock` sets up its own timer and updates independently.

In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.

每个时钟设置自己的定时器并独立更新。

在React应用程序中，组件是有状态的还是无状态的，被认为是可能随时间改变的组件的实现细节。 您可以在有状态组件内使用无状态组件，反之亦然。
