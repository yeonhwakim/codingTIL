import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducers';
import { initialState } from './reducers';
const socketMiddleware = (store) => (dispatch) => (action) => {
  if (action.type && action.type === 'socket') {
    window.socket.emit(action.emit, action.data);
  }
  return dispatch(action)
}

const thunkMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  console.log(action)
  console.log('initialState', initialState)
  return dispatch(action);
};


const enhancer = compose(applyMiddleware(
  socketMiddleware,
  thunkMiddleware,
))

const store = createStore(reducer, enhancer);

export default store;
