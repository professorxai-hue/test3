import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={ => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={ => deleteTodo(todo.id)}
        className="delete-button"
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;