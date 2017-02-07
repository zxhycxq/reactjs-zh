``
//已经
``    

在我看来，react是使用js构建大型、快速web应用的首要方式。
他已经在facebook和instagram得到了大规模应用

React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram.

One of the many great parts of React is how it makes you think about apps as you build them. In this document, we'll walk you through the thought process of building a searchable product data table using React.

React中众多伟大的一部分是让你思考怎么建立你的应用。
在这片文章，我将带领你思考一个利用React来创建一个可搜索的产品数据表。
## Start With A Mock
## 从一个模型开始

 假设现在我们有一个JSON API和相关的实例 ，看起来像这样：

Imagine that we already have a JSON API and a mock from our designer. The mock looks like this:

![Mockup](https://facebook.github.io/react/img/blog/thinking-in-react-mock.png)

JSON API 返回如下数据：

Our JSON API returns some data that looks like this:

```
//类别、就爱钱、采购、名称
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Step 1: Break The UI Into A Component Hierarchy
## 第一步：把实例的UI拆分成具有层次感的组件

The first thing you'll want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names. If you're working with a designer, they may have already done this, so go talk to them! Their Photoshop layer names may end up being the names of your React components!
 
首先在实例建立一个盒子来包容所有的组件和子组件，并且给这些组件命名。
如果你和一名设计师一起工作，你就得通知他。他的Photoshop构建的层的命名也可能应用你的命名。
 
But how do you know what should be its own component? Just use the same techniques for deciding if you should create a new function or object. One such technique is the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

但是你怎么知道什么时候这部分代码应该有自己的组件呢？
根据是否要创建一个新的函数或者对象的原理，也适用于React构建组件。这些原理中的一种叫做单一责任原则，也就是一种组件只做一件事情。如果它最终增长，它就应该拆分成更小的组件。
 
Since you're often displaying a JSON data model to a user, you'll find that if your model was built correctly, your UI (and therefore your component structure) will map nicely. That's because UI and data models tend to adhere to the same *information architecture*, which means the work of separating your UI into components is often trivial. Just break it up into components that represent exactly one piece of your data model.
  
如果你经常给用户演示一个JSON数据模型，你会发现如果你的UI模型构建的很好，
模型将能够很好的映射出数据。这是因为用户界面和数据模型倾向于应用同一种信息架构，相比下来拆分UI组件的工作就显得微不足道。只是要把它拆分成能够精确描述你的一种数据模型的组件。

![Component diagram](https://facebook.github.io/react/img/blog/thinking-in-react-components.png)

如上图，看到在我们的简单的应用中分离出了五个组件。用斜体标示除了每个组件代表的数据。

  1. FilterableProductTable (橙色)：最大的父组件，来包含其他所有组件。
  2. SearchBar (蓝色): 接受用户输入的数据
  3. ProductTable (绿色):根据用户输入来过滤数据
  4.  ProductCategoryRow (青色): 产品 目录
  5.  ProductRow (红色): 每一种 产品 的列表


You'll see here that we have five components in our simple app. We've italicized the data each component represents.

  1. **`FilterableProductTable` (orange):** contains the entirety of the example
  2. **`SearchBar` (blue):** receives all *user input*
  3. **`ProductTable` (green):** displays and filters the *data collection* based on *user input*
  4. **`ProductCategoryRow` (turquoise):** displays a heading for each *category*
  5. **`ProductRow` (red):** displays a row for each *product*

 如果查看 ProductTable 会发现表头（包含“Name”和“Price”文本）并没有自己的组件。
 这是一种个人的偏好，无论哪种拆分方式都存在着争议。
 在这个例子中，我把这个表头作为  ProductTable 的一部分，是因为它也是 ProductTable 负责渲染的数据集合中的一部分。
 但是，如果表头比较复杂的时候（比如增加排序）它当然也要自己的 ProductTableHeader组件。
 
If you look at `ProductTable`, you'll see that the table header (containing the "Name" and "Price" labels) isn't its own component. This is a matter of preference, and there's an argument to be made either way. For this example, we left it as part of `ProductTable` because it is part of rendering the *data collection* which is `ProductTable`'s responsibility. However, if this header grows to be complex (i.e. if we were to add affordances for sorting), it would certainly make sense to make this its own `ProductTableHeader` component.

 我们已经在上边的例子中规划好了组件，现在就需要来构建结构树了。同样简单的是，如果一个组件被包含在里一个组件中，那么在结构树中应该作为子节点：

Now that we've identified the components in our mock, let's arrange them into a hierarchy. This is easy. Components that appear within another component in the mock should appear as a child in the hierarchy:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Step 2:建立一个静态版本

[代码](http://codepen.io/lacker/pen/vXpAgj)

 现在我们知道组件结构，下边开始要实现你的应用了。
 最简单的方法是建立一个把你的数据渲染到UI 但是组件之间没有交互的版本（静态版本）。
 解耦这些程序很简单，因为一个静态版本需要的仅仅是无思考的打字，但是如果添加交互的话，就需要很多的思考、很少的代码量。
 来看看为什么：

Now that you have your component hierarchy, it's time to implement your app. The easiest way is to build a version that takes your data model and renders the UI but has no interactivity. It's best to decouple these processes because building a static version requires a lot of typing and no thinking, and adding interactivity requires a lot of thinking and not a lot of typing. We'll see why.

建立一个静态版本，去渲染你的数据模型的时候，你想在建立的模型中使用 props 关键字来重用其它组件和传递数据。
props 是将父组件的数据传递给子组件的一种方法。
如果你熟悉state 使用原则--不要使用 state 来建立静态版本。
state 仅用来服务交互性，也就是state绑定的数据每时每刻都在改变。
建立一个静态版本你不需要用到它。

To build a static version of your app that renders your data model, you'll want to build components that reuse other components and pass data using *props*. *props* are a way of passing data from parent to child. If you're familiar with the concept of *state*, **don't use state at all** to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don't need it.

你构建应用的时候，可以从顶层到底层，也可以从底层到顶层。
也就是你可以先构建结构树中顶层的父组件（FilterableProductTable）或者从底层的子组件（ProcuctRow）。
<p style="color:red;">在简单的应用中，通常从顶层开始更简单。但是相对大点的应用，从底层开始更容易测试。</p>

You can build top-down or bottom-up. That is, you can either start with building the components higher up in the hierarchy (i.e. starting with `FilterableProductTable`) or with the ones lower in it (`ProductRow`). In simpler examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom-up and write tests as you build.

 到了这一步,你会拥有一个可重用的组件库来渲染你的数据模型。
 静态版本的这些组件仅仅拥有render（）方法。
 结构树中顶层的组件（FilterableProductTable）把你的数据初始成为props。
如果你在数据模型中更新数据，前端UI就会再次更新。很容易看到你的UI更新并且是什么原因导致的更新，
React的单项数据流动(也叫做单项绑定)使得一切模块化和速度化。

At the end of this step, you'll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. If you make a change to your underlying data model and call `ReactDOM.render()` again, the UI will be updated. It's easy to see how your UI is updated and where to make changes since there's nothing complicated going on. React's **one-way data flow** (also called *one-way binding*) keeps everything modular and fast.
 
  这一步如果你还有什么不懂，可以简单阅读下React docs

Simply refer to the [React docs](/react/docs/) if you need help executing this step.

### A Brief Interlude: Props vs State
### 一个简单小插曲：props vs state

  在React中模型化的数据有两种形式：props和state。理解这两个关键字的差异很重要。有什么不清楚的可以阅读 the official React docs。

There are two types of "model" data in React: props and state. It's important to understand the distinction between the two; skim [the official React docs](/react/docs/interactivity-and-dynamic-uis.html) if you aren't sure what the difference is.

## Step 3: Identify The Minimal (but complete) Representation Of UI State
## Step 3: 确定你的UI状态符合最小限度但是完整原则

 为了使你的UI界面具有交互性你需要使相关的数据能够触发变化。
 React通过 state将这些变得简单。

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React makes this easy with **state**.

为了正确建立你的应用，你需要考虑应用需要的易变状态的最小集合。
关键就是DRY--即避免重复。找出那些应用需要和计算需求变化时的状态的绝对最小表示。
比如，你构建一个TODO列表，只需要关注TODO的items数组，不要关注数组长度的变化；
相反的，当你想统计TODO时就只需要关注items数组长度即可。

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is DRY: *Don't Repeat Yourself*. Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, just keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, simply take the length of the TODO items array.

思考我们的例子中的数据组成：
    
  * 原始的产品列表
  * 用户可以输入的搜素框
  * 复选框的值
  * 过滤后的产品列表

Think of all of the pieces of data in our example application. We have:

  * The original list of products
  * The search text the user has entered
  * The value of the checkbox
  * The filtered list of products

下边我们就一一对应这些数据，看那些是应该用state绑定的。
对每一个数据我们需要简单问三个问题：

1. 是否是从一个父组件用props传递过来的？如果是，它就不能用state
2. 数据是否会随时可能变化？如果不是，它也不能用state
3. 在你的组件中是否可以根据其它state或props绑定的数据来计算这个数据，如果能，它也不能用state

Let's go through each one and figure out which one is state. Simply ask three questions about each piece of data:

  1. Is it passed in from a parent via props? If so, it probably isn't state.
  2. Does it remain unchanged over time? If so, it probably isn't state.
  3. Can you compute it based on any other state or props in your component? If so, it isn't state.
  
  没有经过过滤的产品列表时通过props传递过来的，所以它不能用state；
  可输入的搜索框和复选框的值看起来是可以state的，因为它们随时可能改变并且不会被其它数据影响；
  最后，过滤后的产品列表不能用state，因为它可以根据原始的产品列表和过滤条件计算出来；

The original list of products is passed in as props, so that's not state. The search text and the checkbox seem to be state since they change over time and can't be computed from anything. And finally, the filtered list of products isn't state because it can be computed by combining the original list of products with the search text and value of the checkbox.

 所以最后确定可以使用state的是：
 1. 用户输入的搜索框的值；
 2. 复选框的值；

So finally, our state is:

  * The search text the user has entered
  * The value of the checkbox

## Step 4: Identify Where Your State Should Live
## Step 4: 确定你应该在哪里用state绑定数据
[代码](http://codepen.io/lacker/pen/ORzEkG)

OK,我们已经确定了应用状态的最小集合。下一步我们需要确定哪些组件发生改变，或者拥有这些状态。

OK, so we've identified what the minimal set of app state is. Next, we need to identify which component mutates, or *owns*, this state.

谨记：React是全部应用的单项数据流动的组件结构（初始化的交互数据都在父组件，然后通过props传递）。
有可能我们不能够直接弄清楚哪些组件应该用state绑定数据。这也是初学者经常遇到的挑战，所以可以根据下边的步骤来区分：

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. **This is often the most challenging part for newcomers to understand,** so follow these steps to figure it out:

对于你应用中的每一个state：

1. 确定每一个组件都使用了state绑定的数据渲染了些东西；
2. 找到一个共同的父组件（一个单独的在所有组件之上的父组件，注意这些组件是应该有交互性的，就是说需要用到state来绑定数据的）；
3. 这个共同的父组件或者另一个高层次的组件应该使用state；
4. 如果你还不能找到哪个组件应该使用state，就创建一个新的组件来hold住state，然后把这个组件作为那个共同的组件的父组件（即将其添加在共同父组件的层次结构之上）；

For each piece of state in your application:

  * Identify every component that renders something based on that state.
  * Find a common owner component (a single component above all the components that need the state in the hierarchy).
  * Either the common owner or another component higher up in the hierarchy should own the state.
  * If you can't find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

让我们使用以上原则来思考我们的例子：
 1. ProductTable 需要依据state绑定的数据来过滤产品列表，而 SearchBar 需要展示出搜索文本和选中状态；
2. 共同的父组件为 FilterableProductTable；
3. 所以从概念上看，state绑定的过滤条件和选中状态的值应该在 FilterableProductTable中；

Let's run through this strategy for our application:

  * `ProductTable` needs to filter the product list based on state and `SearchBar` needs to display the search text and checked state.
  * The common owner component is `FilterableProductTable`.
  * It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

我们已经确定在FilterableProductTable使用state了。
首先，在FilterableProductTable中添加一个方法getInitialState()并返回{filterText: '', inStockOnly: false}来初始化你的应用状态。然
后分别在ProductTable和SearchBar中用props传递数据filterText和inStockOnly。
最后，使用传递过来的数据来过滤ProductTable的产品列表，同时在SearchBar设置表单字段的值（同上都是用来初始化表单字段的值）。


Cool, so we've decided that our state lives in `FilterableProductTable`. First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterableProductTable`'s `constructor` to reflect the initial state of your application. Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop. Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

你可以开始看看你的应用程序的行为：将filterText设置为“ball”并刷新你的应用程序。 您将看到数据表已正确更新。

You can start seeing how your application will behave: set `filterText` to `"ball"` and refresh your app. You'll see that the data table is updated correctly.

## Step 5: Add Inverse Data Flow
## Step 5: 添加反向数据流（就是将改变从子组件通知给父组件）

到目前为止，我们已经将数据流动和用props传递的回调函数正确的渲染到了应用中。现在就需要将子组件的改变反馈到父组件，然后父组件再通知给其它子组件：即将子组件SearchBar的改变通知给FilterableProductTable更新state。

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

 React使数据流动更加清晰，以方便你了解你的应用的工作流程，但是它的确相比双向数据流动需要稍多一点的码字。
 React也提供了一个叫 ReactLink的扩展，来支持双向绑定，这里就不再赘述。

React makes this data flow explicit to make it easy to understand how your program works, but it does require a little more typing than traditional two-way data binding.

  如果你在当前示例的这个版本尝试输入或是选中按钮，你会发现React忽略了你的输入。
  这是故意的，因为我们已经将input的属性value等于从父组件FilterableProductTable用state绑定的数据（通过调用回调函数实现）。

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

我们来思考是怎么实现的。我们想要确定当用户更改输入，页面数据会更新来体现用户的输入。
由于组件应该只更新自己的state，所以FilterableProductTable会传递一个回调函数给SearchBar，这样当改变时就会调用回调函数然后更改state绑定的数据。
可以使用onChange事件绑定这个回调函数，来监听输入的改变。回调函数最终传递给FilterableProductTable，然后激活setState()方法，最后是应用更新。
 
虽然看起来很多情况下真的要多些代码。但是它的确清晰的表达出你的应用的数据流动。

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass a callback to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. And the callback passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

Though this sounds complex, it's really just a few lines of code. And it's really explicit how your data is flowing throughout the app.

## 就这样

希望，这给了你如何使用React来构建组件和应用程序的想法。
 虽然它可能比你常用的更多的打字，记住代码读得远远超过它的书面，这是非常容易阅读这个模块化，显式代码。
  当你开始构建大型的组件库时，你会欣赏这种明确性和模块性，并且使用代码重用，你的代码行将开始收缩。 

Hopefully, this gives you an idea of how to think about building components and applications with React. While it may be a little more typing than you're used to, remember that code is read far more than it's written, and it's extremely easy to read this modular, explicit code. As you start to build large libraries of components, you'll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink. :)
