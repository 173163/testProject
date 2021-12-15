import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import  createSagaMiddleware  from 'redux-saga'
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const middlewares = [thunkMiddleware, sagaMiddeware];
const sagaMiddeware = createSagaMiddleware();


middlewares.push(require("redux-logger").createLogger());

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default function configStore () {
    const store = createStore(rootReducer, enhancer);
    return store;
}
export default configStore()
sagaMiddeware.run()
