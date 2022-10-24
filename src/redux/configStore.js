import { combineReducers, createStore } from "redux";
import TodoListReducer from "./reducers/TodoListReducer";

const rootReducer = combineReducers({
  TodoListReducer,
});

const store = createStore(rootReducer);

export default store;
