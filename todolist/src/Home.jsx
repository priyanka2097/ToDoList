import React, { useEffect, useState } from "react";
import Create from "./Create";
import { BsCheck2Circle, BsCircle, BsFillTrashFill } from "react-icons/bs";
import axios from 'axios';

function Home() {
  const localhost = 'http://localhost:3001/';
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(`${localhost}get`)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddTask = (newTask) => {
    setTodos([...todos, newTask]);
  };

  const handleEdit = (id, done) => {
    axios.put(`${localhost}update/${id}`)
      .then(result => {
        setTodos(todos.map(item => (item._id === id ? { ...item, done: !done } : item)));
      })
      .catch(err => console.log(err));
  }
  

  const handleDelete = (id) => {
    axios.delete(`${localhost}delete/${id}`)
      .then(result => {
        setTodos(todos.filter(item => item._id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="home">
      <h1>ToDo List</h1>
      <Create onTaskAdded={handleAddTask} />
      <br />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className={todo.done ? "done" : "undone"}>
            <div className="task">
              <div className="checkbox" onClick={() => handleEdit(todo._id, todo.done)}>
                {todo.done ? <BsCheck2Circle className="icon" /> : <BsCircle className="icon" />}
              </div>
              <p>{todo.task}</p>
              <div className="delete" onClick={() => handleDelete(todo._id)}>
                <span><BsFillTrashFill className="icon" /></span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;