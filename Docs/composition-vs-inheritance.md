
React具有强大的组合模型，
我们建议使用组合而不是继承来重用组件之间的代码。

React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

在本节中，我们将考虑一些React新手常遇到的开发继承的问题，
并展示如何使用组合来解决它们。

In this section, we will consider a few problems where developers new to React often reach for inheritance, and show how we can solve them with composition.

## Containment
## 遏制

一些组件不提前知道他们的children。
这对于像    Sidebar 或   Dialog  这样的代表通用“框”的组件是特别常见的。

Some components don't know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic "boxes".

我们建议这样的组件使用特殊的`children` prop
将子元素直接传递到它们的输出：

We recommend that such components use the special `children` prop to pass children elements directly into their output:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

This lets other components pass arbitrary children to them by nesting the JSX:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/ozqNOV?editors=0010)

Anything inside the `<FancyBorder>` JSX tag gets passed into the `FancyBorder` component as a `children` prop. Since `FancyBorder` renders `{props.children}` inside a `<div>`, the passed elements appear in the final output.

While this is less common, sometimes you might need multiple "holes" in a component. In such cases you may come up with your own convention instead of using `children`:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/gwZOJp?editors=0010)

像`<Contacts />` 和 `<Chat />`之类的react仅是对象，故，可像其他数据那样作为props传递给他们。

React elements like `<Contacts />` and `<Chat />` are just objects, so you can pass them as props like any other data.

## Specialization

Sometimes we think about components as being "special cases" of other components. 例如：, we might say that a `WelcomeDialog` is a special case of `Dialog`.

In React, this is also achieved by composition, where a more "specific" component renders a more "generic" one and configures it with props:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Composition works equally well for components defined as classes:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[在CodePen上试验.](http://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## So What About Inheritance?

在Facebook，我们使用React在数千个组件，我们没有发现任何用例，我们建议创建组件继承层次结构。

At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies.

道具和组合给你所有的灵活性，你需要以一个明确和安全的方式自定义组件的外观和行为。 
请记住，组件可以接受任意道具，包括原始值，React元素或函数。

Props and composition give you all the flexibility you need to customize a component's look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.

如果要在组件之间重用非UI功能，建议您将其提取到单独的JavaScript模块中。 
组件可以导入它并使用该函数，对象或类，而不扩展它。

If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. The components may import it and use that function, object, or a class, without extending it.
