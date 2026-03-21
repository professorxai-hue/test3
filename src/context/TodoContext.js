import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const { currentUser } = useAuth;
  const [todos, setTodos] = useState([
    { id: 1, text: 'Admin task - Setup server', completed: false, userId: 1, userName: 'Admin User' },
    { id: 2, text: 'Manager task - Review reports', completed: true, userId: 2, userName: 'Manager User' },
    { id: 3, text: 'User task - Complete profile', completed: false, userId: 3, userName: 'Regular User' }
  ]);

  const addTodo = (text) => {
    if (!currentUser) return;
    const newTodo = {
      id: Date.now,
      text,
      completed: false,
      userId: currentUser.id,
      userName: currentUser.name
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
    <TodoContext.Provider value={{
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo
    }}>
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