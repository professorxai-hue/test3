import React, { useState } from 'react';
import { useAuth, PERMISSIONS } from '../context/AuthContext';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList =  => {
  const [newTodoText, setNewTodoText] = useState();
  const { currentUser, logout, hasPermission } = useAuth;
  const { todos, addTodo } = useTodos;

  const handleAddTodo = (e) => {
    e.preventDefault;
    if (newTodoText.trim && hasPermission(PERMISSIONS.CREATE_TODO)) {
      addTodo(newTodoText.trim);
      setNewTodoText();
    }
  };

  return (
    <div className="todo-container">
      <div className="user-info">
        <div className="user-badge">
          <span>Welcome, <strong>{currentUser.name}</strong></span>
          <span className={`role-badge ${currentUser.role}`}>{currentUser.role}</span>
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {hasPermission(PERMISSIONS.CREATE_TODO) && (
        <form className="add-todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button type="submit">Add Todo</button>
        </form>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      <div className="permissions-info">
        <h4>Your Permissions ({currentUser.role}):</h4>
        <ul>
          <li>Create todos: {hasPermission(PERMISSIONS.CREATE_TODO) ? '✅' : '❌'}</li>
          <li>Update any todo: {hasPermission(PERMISSIONS.UPDATE_ANY_TODO) ? '✅' : '❌'}</li>
          <li>Delete any todo: {hasPermission(PERMISSIONS.DELETE_ANY_TODO) ? '✅' : '❌'}</li>
          <li>Manage users: {hasPermission(PERMISSIONS.MANAGE_USERS) ? '✅' : '❌'}</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;