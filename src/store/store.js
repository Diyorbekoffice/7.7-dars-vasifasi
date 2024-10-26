// store.js

import { createStore, combineReducers } from 'redux';
import counterReducer from './counterReducer';
import languageReducer from './languageReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  usersData: counterReducer,
  languageData: languageReducer,
  themeData: themeReducer,
});

const store = createStore(rootReducer);

export default store;
