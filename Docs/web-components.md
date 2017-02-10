React 和[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 被用来解决不同的问题。
web组件为可重用组件提供了强大的封装，而React提供了一个声明库，使DOM与您的数据保持同步。 这两个目标是互补的。 作为开发人员，
您可以在您的Web组件中使用React，或者在React中使用Web组件，或者两者兼有。

React and [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) are built to solve different problems.  Web Components provide strong encapsulation for reusable components, while React provides a declarative library that keeps the DOM in sync with your data. The two goals are complementary. As a developer, you are free to use React in your Web Components, or to use Web Components in React, or both.

大多数使用React的人不使用Web组件，但是您可能希望使用，
特别是如果您使用的是使用Web组件编写的第三方UI组件。

Most people who use React don't use Web Components, but you may want to, especially if you are using third-party UI components that are written using Web Components.

## Using Web Components in React
## 在React中使用web组件

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

> Note:
>
>Web组件经常暴露一个命令式API。

> Web Components often expose an imperative API.例如, a `video` Web Component might expose `play()` and `pause()` functions. To access the imperative APIs of a Web Component, you will need to use a ref to interact with the DOM node directly. If you are using third-party Web Components, the best solution is to write a React component that behaves as a wrapper for your Web Component.
>
> Events emitted by a Web Component may not properly propagate through a React render tree.
> You will need to manually attach event handlers to handle these events within your React components.

一个常见的困惑是web组件使用class而非className。

One common confusion is that Web Components use "class" instead of "className".

```javascript
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
```

## Using React in your Web Components
## 在web组件中使用 React 

```javascript
const proto = Object.create(HTMLElement.prototype, {
  attachedCallback: {
    value: function() {
      const mountPoint = document.createElement('span');
      this.createShadowRoot().appendChild(mountPoint);

      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
});
document.registerElement('x-search', {prototype: proto});
```

你也可在[complete Web Components example on GitHub](https://github.com/facebook/react/tree/master/examples/webcomponents).中查看
