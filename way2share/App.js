import React, { Component } from 'react';
import Navigator from './components/Navigator.js';
import { store } from './reducers/store.js';
import { Provider } from 'react-redux';

export default class App extends Component {
	
  	render() {
    	return <Provider store={store}>
      		<Navigator />
    	</Provider>
  	}
}

