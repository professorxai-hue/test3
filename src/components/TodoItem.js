import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { canModifyTodo } = useAuth;
  const { updateTodo, deleteTodo, toggleTodo } = useTodos;

  const handleUpdate =  => {
    if (editText.trim) {
      updateTodo(todo.id, { text: editText.trim });
      setIsEditing(false);
    }
  };

  const handleToggle =  => {
    if (canModifyTodo(todo, 'update')) {
      toggleTodo(todo.id);
    }
  };

  const canUpdate = canModifyTodo(todo, 'update');
  const canDelete = canModifyTodo(todo, 'delete');

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : }`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={!canUpdate}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyPress={(e) => e.key === 'Enter' && handleUpdate}
            autoFocus
          />
        ) : (
          <span className="todo-text">
            {todo.text}
            <span className="todo-owner">by {todo.userName}</span>
          </span>
        )}
      </div>
      <div className="todo-actions">
        {canUpdate && !isEditing && (
          <button className="edit-btn" onClick={ => setIsEditing(true)}>
            Edit
          </button>
        )}
        {canDelete && (
          <button className="delete-btn" onClick={ => deleteTodo(todo.id)}>
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;