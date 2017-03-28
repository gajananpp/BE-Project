import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import AppRoutes from './AppRoutes.jsx';
import store from './store.js';


ReactDOM.render(
	<Provider store={store}>
		<AppRoutes />
	</Provider>
	, document.getElementById('content'));
