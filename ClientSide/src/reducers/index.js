import { combineReducers } from 'redux';
import userReducer from './userReducer'
import systemReducer from './systemReducer';
import { mainReducer } from './mainReducer';

const rootReducer = combineReducers({
  system: systemReducer,
  main: mainReducer,
  user: userReducer
})

export default rootReducer;