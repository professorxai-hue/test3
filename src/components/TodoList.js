import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const TodoList =  => {
  const { user, logout, hasPermission } = useAuth;
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build RBAC System', completed: false },
    { id: 3, text: 'Deploy Application', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState();

  const addTodo = (e) => {
    e.preventDefault;
    if (newTodo.trim && hasPermission('create')) {
      setTodos([...todos, { id: Date.now, text: newTodo, completed: false }]);
      setNewTodo();
    }
  };

  const toggleComplete = (id) => {
    if (hasPermission('complete')) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    }
  };

  const deleteTodo = (id) => {
    if (hasPermission('delete')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <div>
          <h1>TodoList App</h1>
          <p>Welcome, {user.username} <span className="role-badge">{user.role}</span></p>
        </div>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>

      {hasPermission('create') && (
        <form className="todo-input" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
      )}

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : }`}>
            <span>{todo.text}</span>
            <div className="todo-actions">
              {hasPermission('complete') && (
                <button className="btn-complete" onClick={ => toggleComplete(todo.id)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
              )}
              {hasPermission('delete') && (
                <button className="btn-delete" onClick={ => deleteTodo(todo.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h3>Your Permissions:</h3>
        <p>{user.permissions.join(', ')}</p>
      </div>
    </div>
  );
};

export default TodoList;