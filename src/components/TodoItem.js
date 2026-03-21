import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { useAuth, PERMISSIONS } from '../context/AuthContext';

const TodoItem = ({ todo, users }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const { toggleTodo, deleteTodo, updateTodo, assignTodo } = useTodos;
  const { hasPermission, user } = useAuth;

  const canUpdate = hasPermission(PERMISSIONS.UPDATE_TODO) && 
    (todo.assignedTo === user?.id || hasPermission(PERMISSIONS.ASSIGN_TODOS));
  const canDelete = hasPermission(PERMISSIONS.DELETE_TODO);
  const canAssign = hasPermission(PERMISSIONS.ASSIGN_TODOS);

  const handleToggle =  => {
    const result = toggleTodo(todo.id);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleDelete =  => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      const result = deleteTodo(todo.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleSaveEdit =  => {
    const result = updateTodo(todo.id, { title: editTitle, priority: editPriority });
    if (result.success) {
      setIsEditing(false);
    } else {
      alert(result.error);
    }
  };

  const handleAssign = (e) => {
    const userId = parseInt(e.target.value);
    assignTodo(todo.id, userId);
  };

  const assignedUser = users.find(u => u.id === todo.assignedTo);
  const createdByUser = users.find(u => u.id === todo.createdBy);

  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#22c55e'
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : }`}>
      <div className="todo-main">
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={!canUpdate}
          />
        </div>
        
        <div className="todo-content">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-input"
              />
              <select 
                value={editPriority} 
                onChange={(e) => setEditPriority(e.target.value)}
                className="priority-select"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button onClick={handleSaveEdit} className="btn btn-small btn-success">Save</button>
              <button onClick={ => setIsEditing(false)} className="btn btn-small">Cancel</button>
            </div>
          ) : (
            <>
              <span className="todo-title">{todo.title}</span>
              <div className="todo-meta">
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: priorityColors[todo.priority] }}
                >
                  {todo.priority}
                </span>
                {assignedUser && (
                  <span className="assigned-to">
                    Assigned: {assignedUser.name}
                  </span>
                )}
                {createdByUser && (
                  <span className="created-by">
                    Created by: {createdByUser.name}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="todo-actions">
        {canAssign && !isEditing && (
          <select 
            value={todo.assignedTo || } 
            onChange={handleAssign}
            className="assign-select"
          >
            <option value=>Unassigned</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        )}
        {canUpdate && !isEditing && (
          <button onClick={ => setIsEditing(true)} className="btn btn-small btn-edit">
            Edit
          </button>
        )}
        {canDelete && (
          <button onClick={handleDelete} className="btn btn-small btn-danger">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
