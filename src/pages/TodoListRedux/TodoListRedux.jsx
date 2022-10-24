import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import images from "../../assets/images";
import {
  addTaskApi,
  checkDoneTaskApi,
  deleteTaskApi,
  getTodoListApi,
  rejectTaskApi,
} from "../../redux/actions/TodoListAction";

function TodoListRedux() {
  //Lấy state từ redux về
  const { todoList } = useSelector((state) => state.TodoListReducer);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    value: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const getListTodo = () => {
    dispatch(getTodoListApi());
  };

  useEffect(() => {
    getListTodo();
  }, []);

  //Hàm xử lý xóa task
  const deleteTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };

  //Xử lý done task
  const checkDoneTask = (taskName) => {
    dispatch(checkDoneTaskApi(taskName));
  };

  //Xử lý reject task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  const renderTaskToDo = () => {
    return todoList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  checkDoneTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  const renderTaskToDoDone = () => {
    return todoList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  const handleOnchange = (e) => {
    let { value, name } = e.target;

    let newValues = { ...input.value };
    newValues = {
      ...newValues,
      [name]: value,
    };

    let newErrors = { ...input.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + "invalid!";
    } else {
      newErrors[name] = "";
    }

    setInput({
      ...input,
      value: newValues,
      errors: newErrors,
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    //Xử lí nhận dữ liệu từ người dùng nhập => gọi action addTaskApi
    dispatch(addTaskApi(input.value.taskName));

    setInput({
      ...input,
      value: {
        taskName: "",
      },
    });
  };

  return (
    <div className="card">
      <div className="card__header">
        <img src={images.bg} />
      </div>
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>October 24,2022</p>
          </div>
          <div className="card__add">
            <input
              id="newTask"
              name="taskName"
              type="text"
              placeholder="Enter an activity..."
              value={input.value.taskName}
              onChange={handleOnchange}
            />
            <button id="addItem" type="submit" onClick={addTask}>
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskToDoDone()}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoListRedux;
