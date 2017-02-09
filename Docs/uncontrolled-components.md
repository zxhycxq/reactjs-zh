在大多数场景下，我们建议使用 [controlled components](/react/docs/forms.html)  实现表单。 
在控制组件中，表单数据被一个react组件处理。可供使用的是未控制的组件，表单数据被dom自身处理。

In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

要写未控制的组件，而非为每次state更细写事件处理，你可以用ref从dom中得到值。

To write an uncontrolled component, instead of writing an event handler for every state update, you can [use a ref](/react/docs/refs-and-the-dom.html) to get form values from the DOM.

例如，这段代码在未控制组件中接收了一个name。

例如：, this code accepts a single name in an uncontrolled component:

```javascript{8,17}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[在CodePen上试验.](https://codepen.io/gaearon/pen/WooRWa?editors=0010)

Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.

If it's still not clear which type of component you should use for a particular situation, you might find [this article on controlled versus uncontrolled inputs](http://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) to be helpful.

### Default Values
### 默认值

在React渲染生命周期中，表单元素的value属性将覆盖DOM中的值。 
对于不受控制的组件，您通常希望React指定初始值，但不要控制后续更新。 要处理这种情况，可以指定defaultValue属性，而不是value。

In the React rendering lifecycle, the `value` attribute on form elements will override the value in the DOM. With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a `defaultValue` attribute instead of `value`.

```javascript{7}
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Likewise, `<input type="checkbox">` and `<input type="radio">` support `defaultChecked`, and `<select>` supports `defaultValue`.
