import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false, createdBy: 'admin' },
    { id: 2, text: 'Build RBAC System', completed: false, createdBy: 'admin' },
    { id: 3, text: 'Test Permissions', completed: true, createdBy: 'manager' },
  ]);

  const addTodo = (text, createdBy) => {
    const newTodo = {
      id: Date.now,
      text,
      completed: false,
      createdBy,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>
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