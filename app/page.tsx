'use client';

import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import { useTodos } from './hooks/useTodos';

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600">
          <h1 className="text-3xl font-bold text-white text-center">TODO</h1>
        </div>
        
        <div className="p-6">
          <TodoForm addTodo={addTodo} />

          <TodoList 
            todos={todos} 
            filter={filter} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo} 
          />

          {todos.length > 0 && (
            <TodoFilters 
              filter={filter} 
              setFilter={setFilter} 
              activeTodosCount={activeTodosCount} 
              clearCompleted={clearCompleted}
              hasCompletedTodos={hasCompletedTodos}
            />
          )}
        </div>
      </div>
    </div>
  );
}