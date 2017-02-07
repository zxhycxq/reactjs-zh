/**
 * Created by JieYi on 2017/1/19.
 * 一月
 */
import React from  'react';
import {render} from 'react-dom';
import MyComponent from './MyComponent';

var myElement=<MyComponent somePropert={true}/>;
render(myElement,document.body);

