/**
 *  2017/1/19.
 * 一月
 */
import React, { Component } from 'react';
import { render } from 'react-dom';

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    handleClick(e) {
        this.setState({ liked: !this.state.liked });
    }

    render() {
        const text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={this.handleClick.bind(this)}>
                /*注意要显式调用 bind(this) 将事件函数上下文绑定要组件实例上，这也是 React 推崇的原则：没有黑科技，
                尽量使用显式的容易理解的 JavaScript 代码。*/
                You {text} this. Click to toggle.
            </p>
        );
    }
}

render(
    <LikeButton />,
    document.getElementById('example')
);
