import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { hasPermission } = useAuth;
  const { updateTodo, deleteTodo, toggleTodo } = useTodos;

  const handleUpdate =  => {
    if (editText.trim && hasPermission('canUpdate')) {
      updateTodo(todo.id, { text: editText.trim });
      setIsEditing(false);
    }
  };

  const handleDelete =  => {
    if (hasPermission('canDelete')) {
      deleteTodo(todo.id);
    }
  };

  const handleToggle =  => {
    if (hasPermission('canUpdate')) {
      toggleTodo(todo.id);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : }`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={!hasPermission('canUpdate')}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate}
          autoFocus
          style={{ flex: 1, padding: '5px' }}
        />
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}
      <small style={{ color: '#999' }}>by {todo.createdBy}</small>
      <div className="todo-actions">
        {hasPermission('canUpdate') && (
          <button
            className="edit-btn"
            onClick={ => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        )}
        {hasPermission('canDelete') && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;