import { createStore } from 'redux';
import wsnApp from './reducers/wsnApp.js'

let store = createStore(wsnApp);
export default store;