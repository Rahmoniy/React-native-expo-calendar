import {combineReducers} from '@reduxjs/toolkit';
import {main} from '../slices';
import { LOGOUT } from '../actionTypes'

// const rootReducer = combineReducers({
//   main: main.reducer,
// });
//
// export default (state, action) => rootReducer(state, action);

const appReducer = combineReducers({
  main: main.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
