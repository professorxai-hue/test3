import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { useAuth, PERMISSIONS, ROLES } from '../context/AuthContext';
import TodoItem from './TodoItem';

const TodoList =  => {
  const [newTodoTitle, setNewTodoTitle] = useState();
  const [newTodoPriority, setNewTodoPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const { todos, addTodo } = useTodos;
  const { hasPermission, getAllUsers, user } = useAuth;

  const users = getAllUsers;
  const canCreate = hasPermission(PERMISSIONS.CREATE_TODO);

  const handleAddTodo = (e) => {
    e.preventDefault;
    if (!newTodoTitle.trim) return;
    
    const result = addTodo(newTodoTitle.trim, newTodoPriority);
    if (result.success) {
      setNewTodoTitle();
      setNewTodoPriority('medium');
    } else {
      alert(result.error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <h2>My Tasks</h2>
        <div className="todo-stats">
          <span className="stat">Total: {stats.total}</span>
          <span className="stat stat-active">Active: {stats.active}</span>
          <span className="stat stat-completed">Completed: {stats.completed}</span>
        </div>
      </div>

      {canCreate && (
        <form onSubmit={handleAddTodo} className="add-todo-form">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <select 
            value={newTodoPriority} 
            onChange={(e) => setNewTodoPriority(e.target.value)}
            className="priority-select"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      )}

      <div className="filter-tabs">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : }`}
          onClick={ => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : }`}
          onClick={ => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : }`}
          onClick={ => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="todos-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found</p>
            {!canCreate && <p className="hint">You have read-only access</p>}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} users={users} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
