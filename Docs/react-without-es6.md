一般情况下，你应该定义一个react组件作为js 类

Normally you would define a React component as a plain JavaScript class:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
如果不用es6 ，也可用`React.createClass` 替代

If you don't use ES6 yet, you may use the `React.createClass` helper instead:


```javascript
var Greeting = React.createClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

ES6类的API类似于React.createClass，有一些例外

The API of ES6 classes is similar to `React.createClass` with a few exceptions.

## 声明Prop类型和默认 Props

使用函数和ES6类，`propTypes` and `defaultProps` 作为组件自身的属性：

With functions and ES6 classes, `propTypes` and `defaultProps` are defined as properties on the components themselves:

```javascript
class Greeting extends React.Component {
  // ...
}

Greeting.propTypes = {
  name: React.PropTypes.string
};

Greeting.defaultProps = {
  name: 'Mary'
};
```
用`React.createClass()`，则需要定义propTypes作为传递对象的属性，以及getDefaultProps()作为函数。

With `React.createClass()`, you need to define `propTypes` as a property on the passed object, and `getDefaultProps()` as a function on it:

```javascript
var Greeting = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },

  // ...

});
```

## 设置初始状态
## Setting the Initial State

在es6 class，可在控制器中注册 this.state定义初始状态

In ES6 classes, you can define the initial state by assigning `this.state` in the constructor:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

使用`React.createClass()`，必须提供一个 getInitialState 方法返回初始状态

With `React.createClass()`, you have to provide a separate `getInitialState` method that returns the initial state:

```javascript
var Counter = React.createClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## Autobinding
##自动绑定

In React components declared as ES6 classes, methods follow the same semantics as regular ES6 classes. This means that they don't automatically bind `this` to the instance. You'll have to explicitly use `.bind(this)` in the constructor:

在 React 组件中声明ES6类， 方法遵循与常规ES6类相同的语义，
这意味着他们不自动绑定到实例，
你必须在控制器明确地使用  .bind(this)

```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // 重要！！！
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // 因为 `this.handleClick` 已经绑定, 我们可使用它作为事件处理器
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

用`React.createClass()`, ，则不必了。

With `React.createClass()`, this is not necessary because it binds all methods:

```javascript
var SayHello = React.createClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  
  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```

这意味着编写ES6类有一些更多的样板代码用于事件处理程序，但是在大型应用程序中上行性能略好。

This means writing ES6 classes comes with a little more boilerplate code for event handlers, but the upside is slightly better performance in large applications.

如果样板代码太不吸引人，您可以使用Babel启用实验性类属性语法建议：

If the boilerplate code is too unattractive to you, you may enable the **experimental** [Class Properties](https://babeljs.io/docs/plugins/transform-class-properties/) syntax proposal with Babel:


```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // 警告: this syntax is experimental!
  // Using an arrow here binds the method:
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

实验性质的！！或将改变

Please note that the syntax above is **experimental** and the syntax may change, or the proposal might not make it into the language.

If you'd rather play it safe, you have a few options:

* 在构造函数中绑定方法
* 用箭头函数, e.g. `onClick={(e) => this.handleClick(e)}`.
* 继续使用 `React.createClass()`.

## Mixins

>**Note:**
>
>ES6 launched without any mixin support. 故, there is no support for mixins when you use React with ES6 classes.
>
>**We also found numerous issues in codebases using mixins, [and don't recommend using them in the new code](/react/blog/2016/07/13/mixins-considered-harmful.html).**
>
>This section exists only for the reference.

Sometimes very different components may share some common functionality. These are sometimes called [cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern). [`React.createClass`](/react/docs/top-level-api.html#react.createclass) lets you use a legacy `mixins` system for that.

横切关注点

One common use case is a component wanting to update itself on a time interval. It's easy to use `setInterval()`, but it's important to cancel your interval when you don't need it anymore to save memory. React provides [lifecycle methods](/react/docs/working-with-the-browser.html#component-lifecycle) that let you know when a component is about to be created or destroyed. Let's create a simple mixin that uses these methods to provide an easy `setInterval()` function that will automatically get cleaned up when your component is destroyed.

```javascript
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // 用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.
[已经]
