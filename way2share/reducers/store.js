import { combineReducers, createStore } from 'redux';
import dataReducer from './dataReducer.js';
import RNFS from 'react-native-fs';

const reducers = combineReducers({
 	data: dataReducer
});

export const store = createStore(reducers);