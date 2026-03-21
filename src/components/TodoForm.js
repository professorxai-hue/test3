import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../context/TodoContext';

const TodoForm =  => {
  const [text, setText] = useState();
  const { user, hasPermission } = useAuth;
  const { addTodo } = useTodos;

  const handleSubmit = (e) => {
    e.preventDefault;
    if (text.trim && hasPermission('canCreate')) {
      addTodo(text.trim, user.role);
      setText();
    }
  };

  if (!hasPermission('canCreate')) {
    return (
      <div className="todo-input-section">
        <p className="no-permission">You don't have permission to create todos.</p>
      </div>
    );
  }

  return (
    <div className="todo-input-section">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit" className="add-btn" disabled={!text.trim}>
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;