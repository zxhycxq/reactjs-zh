---
id: hello-world
title: Hello World
permalink: docs/hello-world.html
prev: installation.html
next: introducing-jsx.html
redirect_from:
  - "docs/index.html"
  - "docs/getting-started.html"
  - "docs/getting-started-ko-KR.html"
  - "docs/getting-started-zh-CN.html"
---

The easiest way to get started with React is to use [this Hello World example code on CodePen](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010). You don't need to install anything; you can just open it in another tab and follow along as we go through examples. If you'd rather use a local development environment, check out the [Installation](/react/docs/installation.html) page.

The smallest React example looks like this:

```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

It renders a header saying "Hello, world!" on the page.

The next few sections will gradually introduce you to using React. We will examine the building blocks of React apps: elements and components. Once you master them, you can create complex apps from small reusable pieces.

## A Note on JavaScript

React 是一个JS库,所以要求你有一定的js语言基础。如果你不是非常自信，我们建议你重新看下js知识。那样你就能够轻易地和我们一路走下去。
  [refreshing your JavaScript knowledge](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) 
  
我们在一些例子中也是用了es6 语法。
We also use some of the ES6 syntax in the examples. We try to use it sparingly because it's still relatively new, but we encourage you to get familiar with [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) statements. You can use <a href="http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact&experimental=false&loose=false&spec=false&code=const%20element%20%3D%20%3Ch1%3EHello%2C%20world!%3C%2Fh1%3E%3B%0Aconst%20container%20%3D%20document.getElementById('root')%3B%0AReactDOM.render(element%2C%20container)%3B%0A">Babel REPL</a> to check what ES6 code compiles to.
你可以使用babel 检查你的es6 代码编译。
