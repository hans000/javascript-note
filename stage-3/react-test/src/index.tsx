import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <textarea className='textarea' placeholder='请输入'></textarea>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);