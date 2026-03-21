import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState();

  const handleSubmit = (e) => {
    e.preventDefault;
    if (!value.trim) return;
    addTodo(value);
    setValue();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-button">Add</button>
    </form>
  );
}

export default TodoForm;