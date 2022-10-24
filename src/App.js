import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import TodoListFun from "./pages/TodoListFun/TodoListFun";
import TodoListRedux from "./pages/TodoListRedux/TodoListRedux";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/todolistfun" element={<TodoListFun />} />
        <Route exact path="/" element={<TodoListFun />} />
        <Route exact path="/todolistredux" element={<TodoListRedux />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
