import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

fetch('/assets/css/main.css').then(function (response) {
  if (response.ok) {
    return response.text();
  }
  throw new Error('File is not loaded /assets/css/main.css');
}).then((text) => {
  ReactDOM.render(<App cssSource={text}/>, document.getElementById('root'));
}).catch((e) => {
  console.error('error', e);
});


registerServiceWorker();
