import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TodoItem from './TodoItem';

const TodoList =  => {
  const { user, logout, hasPermission } = useAuth;
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build RBAC System', completed: true },
    { id: 3, text: 'Deploy Application', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState();

  const addTodo = (e) => {
    e.preventDefault;
    if (newTodo.trim && hasPermission('canCreate')) {
      setTodos([...todos, { id: Date.now, text: newTodo, completed: false }]);
      setNewTodo();
    }
  };

  const toggleTodo = (id) => {
    if (hasPermission('canUpdate')) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    }
  };

  const deleteTodo = (id) => {
    if (hasPermission('canDelete')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const startEdit = (id, text) => {
    if (hasPermission('canUpdate')) {
      setEditingId(id);
      setEditText(text);
    }
  };

  const saveEdit = (id) => {
    if (editText.trim) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      ));
    }
    setEditingId(null);
    setEditText();
  };

  const cancelEdit =  => {
    setEditingId(null);
    setEditText();
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="user-info">
          <span>Welcome, <strong>{user.username}</strong></span>
          <span className={`role-badge ${user.role}`}>{user.role}</span>
        </div>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </header>

      <div className="todo-container">
        <h1 style={{ marginBottom: '20px' }}>📝 My Todo List</h1>
        
        <div className="permissions-info">
          <strong>Your permissions:</strong>
          {hasPermission('canCreate') && ' ✅ Create'}
          {hasPermission('canRead') && ' ✅ Read'}
          {hasPermission('canUpdate') && ' ✅ Update'}
          {hasPermission('canDelete') && ' ✅ Delete'}
        </div>

        {hasPermission('canCreate') && (
          <form className="todo-input-container" onSubmit={addTodo}>
            <input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="submit">Add Todo</button>
          </form>
        )}

        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onStartEdit={startEdit}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
            />
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
            No todos yet. {hasPermission('canCreate') ? 'Add one above!' : 'Ask an admin to add some.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoList;