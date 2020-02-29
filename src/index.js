import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import User from './utils/memoryUtil'
import Store from './utils/storeUtil'

User.user = Store.getUser()

ReactDOM.render(<App />, document.getElementById('root'));

