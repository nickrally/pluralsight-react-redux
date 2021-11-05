import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
//if we accidentally mutate state in redux store this middleware will warn us
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENTSION_COMPOSE__ || compose; //support for redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
