import Axios from "axios";
import { GET_TASK_API } from "../constants/TodoListConst";

/** 
- Action có 2 loại
- Action thực thi ngay làm thay đổi reducer (action 1)
- Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action)
- Đối với action async phải cài thư viện redux-thunk 
  --> để có thể dispatch được những action async đó
- async là hàm có tham số dispatch
*/

export const getTodoListApi = () => {
  //Tiền xử lý dữ liệu => xử lý function

  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/GetAllTask`,
      method: "GET",
    });

    promise.then((result) => {
      console.log(result.data);

      dispatch({
        type: GET_TASK_API,
        todoList: result.data,
      });

      console.log("Thành công");
    });

    promise.catch((err) => {
      console.log("Thất bại");
      console.log(err.response.data);
    });
  };
};

export const addTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/AddTask`,
      method: "POST",
      data: { taskName: taskName },
    });

    promise.then(() => {
      dispatch(getTodoListApi());
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};

export const deleteTaskApi = (taskName) => {
  //function do redux-thunk trả ra cho mình
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      //Sau khi thực hiện call Api gọi phương thức dispatchAction
      //getTodoListApi để load lại task list
      dispatch(getTodoListApi());
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

export const checkDoneTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((res) => {
      dispatch(getTodoListApi());
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((res) => {
      dispatch(getTodoListApi());
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};


