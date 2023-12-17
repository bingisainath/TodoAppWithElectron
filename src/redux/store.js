import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
//   import chatReducer from "../reducer/chats";
import authReducer from "../redux/reducers/auth";

export default function configureStore() {
  const middlewares = [thunk];

  const store = createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(...middlewares)
  );

  return store;
}
