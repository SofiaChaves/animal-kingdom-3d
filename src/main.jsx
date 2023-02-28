import ASScroll from '@ashthornton/asscroll';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const asscroll = new ASScroll();

window.addEventListener('load', () => {
    asscroll.enable();
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
