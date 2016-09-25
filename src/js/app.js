
// react
import React from 'react';
import { render } from 'react-dom';

// Provider
import { Provider } from 'react-redux';

//components
import App from "./components/App";

// store
import store from "./store";

const url = "http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4";

// define the provider/router
const provider = (
	<Provider store={store}>
		<App url={url} />
	</Provider>
);


// render
render(provider, document.getElementById('root'));
