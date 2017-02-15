顶级API

若你用 React 作为script 标签,这些顶级 APIs are 在 `ReactDOM`全局可使用.若你通过npm用ES6，你可以写 `import ReactDOM from 'react-dom'`. 若你通过npm用 ES5,你可写 `var ReactDOM = require('react-dom')`.

If you use React as a script tag, these top-level APIs are available on the `ReactDOM` global. If you use ES6 with npm, you can write `import ReactDOM from 'react-dom'`. If you use ES5 with npm, you can write `var ReactDOM = require('react-dom')`.

## Overview
## 综述

`react-dom` 包提供了特殊DOM方法，可以被用在你的app当中。
并作为一个逃生舱口，以超出React模型，如果你需要的话。
你的大多数组件都需要这些模块。

The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside of the React model if you need to. Most of your components should not need to use this module.

- [`render()`](#render)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)

### Browser Support
### 浏览器支持

IE9以上

React supports all popular browsers, including Internet Explorer 9 and above.

> Note
>
>我们不支持那些不支持es5 方法的浏览器。可用es5-shim等

> We don't support older browsers that don't support ES5 methods, but you may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page. You're on your own if you choose to take this path.

* * *

## Reference
## 参考

### `render()`

```javascript
ReactDOM.render(
  element,
  container,
  [callback]
)
```

Render a React element into the DOM in the supplied `container` and return a [reference](/react/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/react/docs/components-and-props.html#functional-and-class-components)).

如果 React 元素已经在container中渲染过了，他将更新，仅改变必要的DOM影响最新的react元素。

If the React element was previously rendered into `container`, this will perform an update on it and only mutate the DOM as necessary to reflect the latest React element.

如果回调函数已经提供了，他将在组件被渲染或更新后被执行。

If the optional callback is provided, it will be executed after the component is rendered or updated.

> Note:
>
> `ReactDOM.render()` 控制你传递的内容controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `ReactDOM.render()` 不修改内容节点does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/react/docs/more-about-refs.html#the-ref-callback-attribute) to the root element.

* * *

### `unmountComponentAtNode()`

```javascript
ReactDOM.unmountComponentAtNode(container)
```
从dom上移除一个已安装的react组件并且清理他的事件处理和状态。如果container上面没有注册组件，调用这个函数，但什么也不做。
如果组件是卸载的然会true，无组件可卸载返回false。

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.

* * *

### `findDOMNode()`

```javascript
ReactDOM.findDOMNode(component)
```
如果这个组件在dom中已经装载，他返回相应的浏览器原生dom元素。这个方法用于读值 （来自dom）

If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements. **In most cases, you can attach a ref to the DOM node and avoid using `findDOMNode` at all.** When `render` returns `null` or `false`, `findDOMNode` returns `null`.

> Note:
>
> `findDOMNode` is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction.
>
> `findDOMNode` only works on mounted components (that is, components that have been placed in the DOM). If you try to call this on a component that has not been mounted yet (like calling `findDOMNode()` in `render()` on a component that has yet to be created) an exception will be thrown.
>
> `findDOMNode` 不可悲用在函数性组件上

> `findDOMNode` cannot be used on functional components.
