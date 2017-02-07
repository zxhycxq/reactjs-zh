
随着app的改进，你会捕获一些类型错误。你可以使用像flow或者typescript之类的js表达式去检查你的应用。
但是，即使你不使用他们，react也会有内置的类型检查能力。
在props上为一个组件进行类型检查，你可以分配一个专用的 `propType`属性：

As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like [Flow](https://flowtype.org/) or [TypeScript](https://www.typescriptlang.org/) to typecheck your whole application. But even if you don't use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special `propTypes` property:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: React.PropTypes.string
};
```
`React.PropTypes`  导出一系列验证器，可用于确保接收的数据有效。 
在这个例子中，我们使用`React.PropTypes.string`，
 当为prop提供无效值时，JavaScript控制台中将显示警告。
 出于性能原因，`propTypes`仅在开发模式下检查propTypes。
 
`React.PropTypes` exports a range of validators that can be used to make sure the data you receive is valid. In this example, we're using `React.PropTypes.string`. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, `propTypes` is only checked in development mode.

### React.PropTypes

下面是一个示例，其中提供了不同的验证器：

Here is an example documenting the different validators provided:

```javascript
MyComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // 但默认他们都是可选的
  optionalArray: React.PropTypes.array,
  optionalBool: React.PropTypes.bool,
  optionalFunc: React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string,
  optionalSymbol: React.PropTypes.symbol,

  // 任何东西都会被渲染: numbers, strings, elements 或 一个 array
  // (或者片段) containing these types.
  optionalNode: React.PropTypes.node,

  // 一个React 元素.
  optionalElement: React.PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: React.PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: React.PropTypes.shape({
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: React.PropTypes.func.isRequired,

  // 任何数据类型值 A value of any data type
  requiredAny: React.PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

### Requiring Single Children

使用 `React.PropTypes.element`你可以指定只有一个孩子可以作为孩子传递给组件。

With `React.PropTypes.element` you can specify that only a single child can be passed to a component as children.

```javascript
class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: React.PropTypes.element.isRequired
};
```

### Default Prop Values
### 默认 Prop 值

你可以通过注册专门的`defaultProps`属性 为你的prop定义默认值。

You can define default values for your `props` by assigning to the special `defaultProps` property:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

 `defaultProps` 将用于确保 this.props.name 将有一个值，
 如果它没有被父组件指定。 propTypes 类型检查发生在 defaultProps 解析之后，
 因此类型检查也将应用于defaultProps。

The `defaultProps` will be used to ensure that `this.props.name` will have a value if it was not specified by the parent component. The `propTypes` typechecking happens after `defaultProps` are resolved, so typechecking will also apply to the `defaultProps`.
