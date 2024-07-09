import { combineReducers } from 'redux';
import cartReducer from './slices/cart.slice';
import pageReducer from './slices/page.slice';
import searchReducer from './slices/search.slice';

const rootReducer = combineReducers({
  cart: cartReducer,
  page: pageReducer,
  search: searchReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
