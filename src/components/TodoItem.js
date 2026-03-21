import React from 'react';
import { useAuth } from '../context/AuthContext';

const TodoItem = ({
  todo,
  editingId,
  editText,
  setEditText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) => {
  const { hasPermission } = useAuth;
  const isEditing = editingId === todo.id;

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : }`}>
      {hasPermission('canUpdate') && (
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={ => onToggle(todo.id)}
        />
      )}
      
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ flex: 1, padding: '8px', marginRight: '10px' }}
          />
          <button
            onClick={ => onSaveEdit(todo.id)}
            style={{ background: '#2ed573', color: 'white', marginRight: '5px' }}
          >
            Save
          </button>
          <button
            onClick={onCancelEdit}
            style={{ background: '#888', color: 'white' }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          {hasPermission('canUpdate') && (
            <button
              className="btn-edit"
              onClick={ => onStartEdit(todo.id, todo.text)}
            >
              Edit
            </button>
          )}
          {hasPermission('canDelete') && (
            <button
              className="btn-delete"
              onClick={ => onDelete(todo.id)}
            >
              Delete
            </button>
          )}
        </>
      )}
    </li>
  );
};

export default TodoItem;