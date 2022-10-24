import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import TodoListReducer from "./reducers/TodoListReducer";

const rootReducer = combineReducers({
  TodoListReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;
