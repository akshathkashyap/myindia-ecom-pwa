import { combineReducers } from 'redux';
import pageReducer from './slices/page.slice';


const rootReducer = combineReducers({
  page: pageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
