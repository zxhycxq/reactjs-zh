

[Components](/react/docs/components-and-props.html) let you split the UI into independent, reusable pieces, and think about each piece in isolation. `React.Component` is provided by [`React`](/react/docs/react-api.html).

## Overview

`React.Component` 是一个抽象的基础类，。至少定义一个render（）方法。

`React.Component` is an abstract base class, so it rarely makes sense to refer to `React.Component` directly. Instead, you will typically subclass it, and define at least a [`render()`](#render) method.

Normally you would define a React component as a plain [JavaScript class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

If you don't use ES6 yet, you may use the [`React.createClass`](/react/docs/react-api.html#createclass) helper instead. Take a look at [Using React without ES6](/react/docs/react-without-es6.html) to learn more.

### The Component Lifecycle
### 组件生命周期

Each component has several "lifecycle methods" that you can override to run code at particular times in the process. Methods prefixed with **`will`** are called right before something happens, and methods prefixed with **`did`** are called right after something happens.

#### Mounting

These methods are called when an instance of a component is being created and inserted into the DOM:

- [`constructor()`](#constructor)
- [`componentWillMount()`](#componentwillmount)
- [`render()`](#render)
- [`componentDidMount()`](#componentdidmount)

#### Updating
#### 更新

An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

- [`componentWillReceiveProps()`](#componentwillreceiveprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [`componentWillUpdate()`](#componentwillupdate)
- [`render()`](#render)
- [`componentDidUpdate()`](#componentdidupdate)

#### Unmounting

This method is called when a component is being removed from the DOM:

- [`componentWillUnmount()`](#componentwillunmount)

### Other APIs

Each component also provides some other APIs:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### Class Properties

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)
  - [`propTypes`](#proptypes)

### Instance Properties

  - [`props`](#props)
  - [`state`](#state)

* * *

## Reference

### `render()`

```javascript
render()
```

The `render()` method is required. 必需

当被调用 的时候，它将检查this.props和this.state 返回单个的react元素。这个元素可以是原生DOM组件的代表，如`<div />`，也可是另一个你自定义的复杂组件。

When called, it should examine `this.props` and `this.state` and return a single React element. This element can be either a representation of a native DOM component, such as `<div />`, or another composite component that you've defined yourself.

You can also return `null` or `false` to indicate that you don't want anything rendered. When returning `null` or `false`, `ReactDOM.findDOMNode(this)` will return `null`.

你也可以返回 null或者 false，表明你不想渲染任何元素。当返回null或false的时候，reactdom.findDOMNode(this)将返回null

`render()` 函数应该是原生的,意味着他不修改组件状态
每次调用，他返回统一的结果 。如果你需要和浏览器交互，用`componentDidMount() `或其他生命周期方法替代，完成你的工作。
保持用`render()` 会使组件更容易思考。

The `render()` function should be pure, meaning that it does not modify component state, it returns the same result each time it's invoked, and it does not directly interact with the browser. If you need to interact with the browser, perform your work in `componentDidMount()` or the other lifecycle methods instead. Keeping `render()` pure makes components easier to think about.

> Note
>
> `render()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

> 如果 [`shouldComponentUpdate()`](#shouldcomponentupdate) 返回false`render()` 将不会被调用。

* * *

### `constructor()`

```javascript
constructor(props)
```

The constructor for a React component is called before it is mounted. When implementing the constructor for a `React.Component` subclass, you should call `super(props)` before any other statement. Otherwise, `this.props` will be undefined in the constructor, which can lead to bugs.

The constructor is the right place to initialize state. If you don't initialize state and you don't bind methods, you don't need to implement a constructor for your React component.

It's okay to initialize state based on props if you know what you're doing. Here's an example of a valid `React.Component` subclass constructor:

```js
constructor(props) {
  super(props);
  this.state = {
    color: props.initialColor
  };
}  
```

Beware of this pattern, as it effectively "forks" the props and can lead to bugs. Instead of syncing props to state, you often want to [lift the state up](/react/docs/lifting-state-up.html).

If you "fork" props by using them for state, you might also want to implement [`componentWillReceiveProps(nextProps)`](#componentwillreceiveprops) to keep the state up-to-date with them. But lifting state up is often easier and less bug-prone.

* * *

### `componentWillMount()`

```javascript
componentWillMount()
```

`componentWillMount()` is invoked immediately before mounting occurs. It is called before `render()`, therefore setting state in this method will not trigger a re-rendering. Avoid introducing any side-effects or subscriptions in this method.

`componentWillMount()` is invoked immediately before mounting occurs. 他在 `render()`之前被调用, therefore setting state in this method will not trigger a re-rendering. Avoid introducing any side-effects or subscriptions in this method.

这是在服务器渲染期间唯一的生命周期钩子，通常来说，我们建议用 `constructor()`替代。

This is the only lifecycle hook called on server rendering. Generally, we recommend using the `constructor()` instead.

* * *

### `componentDidMount()`

```javascript
componentDidMount()
```

`componentDidMount()` is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.

* * *

### `componentWillReceiveProps()`

```javascript
componentWillReceiveProps(nextProps)
```

`componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Note that React may call this method even if the props have not changed, so make sure to compare the current and next values if you only want to handle changes. This may occur when the parent component causes your component to re-render.

React doesn't call `componentWillReceiveProps` with initial props during [mounting](#mounting). It only calls this method if some of component's props may update. Calling `this.setState` generally doesn't trigger `componentWillReceiveProps`.

* * *

### `shouldComponentUpdate()`

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Use `shouldComponentUpdate()` to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received. Defaults to `true`. This method is not called for the initial render or when `forceUpdate()` is used.

Returning `false` does not prevent child components from re-rendering when *their* state changes.

Currently, if `shouldComponentUpdate()` returns `false`, then [`componentWillUpdate()`](#componentwillupdate), [`render()`](#render), and [`componentDidUpdate()`](#componentdidupdate) will not be invoked. Note that in the future React may treat `shouldComponentUpdate()` as a hint rather than a strict directive, and returning `false` may still result in a re-rendering of the component.

If you determine a specific component is slow after profiling, you may change it to inherit from [`React.PureComponent`](/react/docs/react-api.html#react.purecomponent) which implements `shouldComponentUpdate()` with a shallow prop and state comparison. If you are confident you want to write it by hand, you may compare `this.props` with `nextProps` and `this.state` with `nextState` and return `false` to tell React the update can be skipped.

* * *

### `componentWillUpdate()`

```javascript
componentWillUpdate(nextProps, nextState)
```

`componentWillUpdate()` is invoked immediately before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call `this.setState()` here. If you need to update state in response to a prop change, use `componentWillReceiveProps()` instead.

> Note
> `componentWillUpdate()` 将不会被唤起，如果 [`shouldComponentUpdate()`](#shouldcomponentupdate)返回false.

> `componentWillUpdate()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

* * *

### `componentDidUpdate()`

```javascript
componentDidUpdate(prevProps, prevState)
```

componentDidUpdate（）在更新发生后立即被调用。
初始渲染不调用此方法。

`componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

当组件已更新时，使用此操作作为DOM操作的机会。
这也是一个好的地方做网络请求，只要你比较当前props与以前的props
（例如，如果props没有改变，可能不需要网络请求）。

Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

> Note
>
> `componentDidUpdate()` 将不会被唤起，如果 [`shouldComponentUpdate()`](#shouldcomponentupdate)返回false.

> `componentDidUpdate()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

* * *

### `componentWillUnmount()`

```javascript
componentWillUnmount()
```

`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any DOM elements that were created in `componentDidMount`

* * *

### `setState()`

```javascript
setState(nextState, callback)
```
执行nextState到当前状态的浅合并。 
这是用于从事件处理程序和服务器请求回调中触发UI更新的主要方法。

Performs a shallow merge of nextState into current state. This is the primary method you use to trigger UI updates from event handlers and server request callbacks.

The first argument can be an object (containing zero or more keys to update) or a function (of state and props) that returns an object containing keys to update.

第一个参数可以是一个对象（包含零个或多个要更新的键）或一个返回包含要更新的键的对象的函数（状态和props）。
这里是简单的对象用法：

Here is the simple object usage:

```javascript
this.setState({mykey: 'my new value'});
```
它也可以传递一个带有签名函数（state，props）=> newState的函数。 这会将原子更新排入队列，在设置任何值之前，先查询state和props的先前值。 
例如，假设我们想要通过props.step增加一个状态值：

It's also possible to pass a function with the signature `function(state, props) => newState`. This enqueues an atomic update that consults the previous value of state and props before setting any values. For instance, suppose we wanted to increment a value in state by `props.step`:

```javascript
this.setState((prevState, props) => {
  return {myInteger: prevState.myInteger + props.step};
});
```
第二个参数是一个可选的回调函数，一旦setState完成并且组件被重新渲染，它将被执行。
 通常我们建议使用componentDidUpdate（）代替这样的逻辑。

The second parameter is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

setState（）不会立即改变this.state，但会创建一个挂起状态转换。
 在调用此方法后访问this.state可能会返回现有值。

`setState()` does not immediately mutate `this.state` but creates a pending state transition. Accessing `this.state` after calling this method can potentially return the existing value.

不能保证对setState的调用的同步操作，
并且调用可以批处理以提高性能。

There is no guarantee of synchronous operation of calls to `setState` and calls may be batched for performance gains.

setState（）将总是导致重新渲染，除非shouldComponentUpdate（）返回false。
如果正在使用可变对象，并且无法在shouldComponentUpdate（）中实现条件渲染逻辑，
则只有当新状态与先前状态不同时调用setState（）才能避免不必要的重新渲染。

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

* * *

### `forceUpdate()`

```javascript
component.forceUpdate(callback)
```

默认情况下，当你的组件state或者props改变时，如果你的render()方法依赖于一些其他数据，
你可以告诉react，组件需要通过调用     `forceUpdate（）`重新渲染

By default, when your component's state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

调用forceUpdate（）会导致在组件上调用render（），跳过shouldComponentUpdate（）。
这将触发子组件的正常生命周期方法，包括每个子组件的shouldComponentUpdate（）方法。 
如果标记更改，React仍将只更新DOM。

Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

通常你应该尽量避免forceUpdate（）的所有使用，
并且只能从render（）中的this.props和this.state中读取。

Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.

* * *

## Class Properties
## 类属性

### `defaultProps`

`defaultProps` can be defined as a property on the component class itself, to set the default props for the class. This is used for undefined props, but not for null props. For example:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

如果 `props.color` 未提供，将被设为默认的`'blue'`:

If `props.color` is not provided, it will be set by default to `'blue'`:

```js
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

If `props.color` is set to null, it will remain null:

如果 `props.color` 设置为null, 它将被保留为 null:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

* * *

### `displayName`

 `displayName`字符串在debug信息中使用。jsx自动设置其值

The `displayName` string is used in debugging messages. JSX sets this value automatically; see [JSX in Depth](/react/docs/jsx-in-depth.html).

* * *

### `propTypes`

`propTypes` 可以定义为组件类本身上的一个属性，以定义prop应该是什么类型。 
它应该是从prop名称到React.PropTypes中定义的类型的映射。
 在开发模式下，当为prop提供无效值时，将在JavaScript控制台中显示警告。 
 在生产模式下，为了提高效率，会跳过propTypes检查。

`propTypes` can be defined as a property on the component class itself, to define what types the props should be. It should be a map from prop names to types as defined in [`React.PropTypes`](/react/docs/react-api.html#react.proptypes). In development mode, when an invalid value is provided for a prop, a warning will be shown in the JavaScript console. In production mode, `propTypes` checks are skipped for efficiency.

For example, this code ensures that the `color` prop is a string:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.propTypes = {
  color: React.PropTypes.string
};
```

We recommend using [Flow](https://flowtype.org/) when possible, to get compile-time typechecking instead of runtime typechecking. [Flow has built-in support for React](https://flowtype.org/docs/react.html) so it's easy to run static analysis on a React app.

* * *

## 实例属性

### `props`

`this.props`包含由此组件的调用者定义的props。 
查看 [Components and Props](/react/docs/components-and-props.html) for an introduction to props.

`this.props` contains the props that were defined by the caller of this component. See [Components and Props](/react/docs/components-and-props.html) for an introduction to props.

特别的，`this.props.children` 是一个特殊的prop,被jsx中的子标签定义，而非标签自身。

In particular, `this.props.children` is a special prop, typically defined by the child tags in the JSX expression rather than in the tag itself.

### `state`

state 包含特定于此组件的数据，可能随时间更改。
state是用户定义的，它应该是纯JavaScript对象。

如果你不在render（）中使用它，它不应该在状态。
 例如，您可以将定时器ID直接放在实例上。

If you don't use it in `render()`, it shouldn't be on the state. For example, you can put timer IDs directly on the instance.

See [State and Lifecycle](/react/docs/state-and-lifecycle.html) for more information about the state.

永远不要直接改变this.state，因为调用setState（）之后可以替换你所做的突变。 
把this.state看作是不可变的。

Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.
