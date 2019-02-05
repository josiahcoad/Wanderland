/**
 * This is the root js file that runs when that little popup page opens
 * as you click on the extension icon. It will see
 * that "Popup" is being included and look in that file next to see what code
 * needs to be included.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
import './images/icon16.png';
import './images/icon48.png';
import './images/icon128.png';
import './popup.html';

ReactDOM.render(<Popup />, document.getElementById('root'));
