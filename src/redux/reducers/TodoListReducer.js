import { GET_TASK_API } from "../constants/TodoListConst";

const initialState = {
  todoList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_API:
      state.todoList = action.todoList;
      return { ...state };

    default:
      return state;
  }
};
