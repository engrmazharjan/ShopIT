import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer, updateProfileReducer } from "./reducers/authReducers";
import {
  productDetailsReducer,
  productsReducer,
} from "./reducers/productReducers";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  updateProfile: updateProfileReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
