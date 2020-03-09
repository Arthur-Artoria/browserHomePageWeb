import React from 'react';
import { render } from 'react-dom';
import './assets/css/reset.scss';
import './assets/css/layout.scss';
import BasicRouter from './router.jsx';

render(<BasicRouter />, document.getElementById('root'));
