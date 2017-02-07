
This reference guide documents the `SyntheticEvent` wrapper that forms part of React's Event System. See the [Handling Events](/react/docs/handling-events.html) guide to learn more.

## Overview

Your event handlers will be passed instances of `SyntheticEvent`, a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers.

If you find that you need the underlying browser event for some reason, simply use the `nativeEvent` attribute to get it. Every `SyntheticEvent` object has the following attributes:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

> Note:
>
> As of v0.14, returning `false` from an event handler will no longer stop event propagation. Instead, `e.stopPropagation()` or `e.preventDefault()` should be triggered manually, as appropriate.

### Event Pooling

The `SyntheticEvent` is pooled. This means that the `SyntheticEvent` object will be reused and all properties will be nullified after the event callback has been invoked.
This is for performance reasons.
As such, you cannot access the event in an asynchronous way.

```javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> Note:
>
> If you want to access the event properties in an asynchronous way, you should call `event.persist()` on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.

## Supported Events
## 事件支持

React normalizes events so that they have consistent properties across different browsers.

The event handlers below are triggered by an event in the bubbling phase. To register an event handler for the capture phase, append `Capture` to the event name; for example, instead of using `onClick`, you would use `onClickCapture` to handle the click event in the capture phase.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Mouse Events](#mouse-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [图片 Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)

* * *

## Reference
## 参考

### Clipboard Events
### 剪切板事件

事件名称:

```
onCopy onCut onPaste
```

属性:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Composition Events

事件名称:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

属性:

```javascript
string data

```

* * *

###键盘 Events

事件名称:

```
onKeyDown onKeyPress onKeyUp
```

属性:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

* * *

### Focus Events

事件名称:

```
onFocus onBlur
```

These focus events work on all elements in the React DOM, not just form elements.

属性:

```javascript
DOMEventTarget relatedTarget
```

* * *

### Form Events

事件名称:

```
onChange onInput onSubmit
```

For more information about the onChange event, see [Forms](/react/docs/forms.html).

* * *

### Mouse Events

事件名称:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

The `onMouseEnter` and `onMouseLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

属性:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### 选择 Events

事件名称:

```
onSelect
```

* * *

### 触摸 Events

事件名称:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

属性:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### UI Events

事件名称:

```
onScroll
```

属性:

```javascript
number detail
DOMAbstractView view
```

* * *

### Wheel Events

事件名称:

```
onWheel
```

属性:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Media Events

事件名称:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted 
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay 
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend 
onTimeUpdate onVolumeChange onWaiting
```

* * *

### 图片 Events

事件名称:

```
onLoad onError
```

* * *

### Animation Events

事件名称:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

属性:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Transition Events

事件名称:

```
onTransitionEnd
```

属性:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```
