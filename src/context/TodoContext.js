import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth, PERMISSIONS } from './AuthContext';

const TodoContext = createContext(null);

const INITIAL_TODOS = [
  { id: 1, title: 'Review project requirements', completed: false, assignedTo: 2, createdBy: 1, priority: 'high' },
  { id: 2, title: 'Setup development environment', completed: true, assignedTo: 3, createdBy: 2, priority: 'medium' },
  { id: 3, title: 'Write documentation', completed: false, assignedTo: 3, createdBy: 2, priority: 'low' }
];

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState( => {
    const saved = localStorage.getItem('rbac_todos');
    return saved ? JSON.parse(saved) : INITIAL_TODOS;
  });
  const { user, hasPermission } = useAuth;

  const saveTodos = useCallback((newTodos) => {
    setTodos(newTodos);
    localStorage.setItem('rbac_todos', JSON.stringify(newTodos));
  }, );

  const addTodo = useCallback((title, priority = 'medium', assignedTo = null) => {
    if (!hasPermission(PERMISSIONS.CREATE_TODO)) {
      return { success: false, error: 'Permission denied' };
    }
    const newTodo = {
      id: Date.now,
      title,
      completed: false,
      assignedTo: assignedTo || user?.id,
      createdBy: user?.id,
      priority,
      createdAt: new Date.toISOString
    };
    saveTodos([...todos, newTodo]);
    return { success: true, todo: newTodo };
  }, [todos, user, hasPermission, saveTodos]);

  const updateTodo = useCallback((id, updates) => {
    if (!hasPermission(PERMISSIONS.UPDATE_TODO)) {
      return { success: false, error: 'Permission denied' };
    }
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return { success: false, error: 'Todo not found' };
    }
    // Users can only update their own todos unless they have ASSIGN permission
    if (todo.assignedTo !== user?.id && !hasPermission(PERMISSIONS.ASSIGN_TODOS)) {
      return { success: false, error: 'You can only update your own todos' };
    }
    const updatedTodos = todos.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date.toISOString } : t
    );
    saveTodos(updatedTodos);
    return { success: true };
  }, [todos, user, hasPermission, saveTodos]);

  const deleteTodo = useCallback((id) => {
    if (!hasPermission(PERMISSIONS.DELETE_TODO)) {
      return { success: false, error: 'Permission denied' };
    }
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return { success: false, error: 'Todo not found' };
    }
    saveTodos(todos.filter(t => t.id !== id));
    return { success: true };
  }, [todos, hasPermission, saveTodos]);

  const toggleTodo = useCallback((id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      return updateTodo(id, { completed: !todo.completed });
    }
    return { success: false, error: 'Todo not found' };
  }, [todos, updateTodo]);

  const assignTodo = useCallback((todoId, userId) => {
    if (!hasPermission(PERMISSIONS.ASSIGN_TODOS)) {
      return { success: false, error: 'Permission denied' };
    }
    return updateTodo(todoId, { assignedTo: userId });
  }, [hasPermission, updateTodo]);

  const getVisibleTodos = useCallback( => {
    if (!hasPermission(PERMISSIONS.READ_TODO)) {
      return ;
    }
    // Admins and managers see all todos
    if (hasPermission(PERMISSIONS.ASSIGN_TODOS)) {
      return todos;
    }
    // Regular users see only their assigned todos
    return todos.filter(t => t.assignedTo === user?.id || t.createdBy === user?.id);
  }, [todos, user, hasPermission]);

  const value = {
    todos: getVisibleTodos,
    allTodos: todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    assignTodo
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos =  => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export default TodoContext;
