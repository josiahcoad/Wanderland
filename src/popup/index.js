// this is the js code for the little page that opens when you click on the extension icon
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './views/popup';
import './images/popup-icon.png';
import './popup.html'

ReactDOM.render(<Popup />, document.getElementById('root'));
