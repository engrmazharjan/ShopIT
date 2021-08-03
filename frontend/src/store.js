import { applyMiddleware, combineReducers, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer } from "./reducers/productReducers";
import thunk from "redux-thunk";

const reducer = combineReducers({
  products: productsReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
