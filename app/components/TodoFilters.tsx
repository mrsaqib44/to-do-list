import React from 'react';

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  activeTodosCount: number;
  clearCompleted: () => void;
  hasCompletedTodos: boolean;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ 
  filter, 
  setFilter, 
  activeTodosCount, 
  clearCompleted,
  hasCompletedTodos
}) => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>{activeTodosCount} items left</span>
      
      <div className="flex gap-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
        >
          Completed
        </button>
      </div>
      
      <button 
        onClick={clearCompleted}
        className={`hover:text-gray-700 ${!hasCompletedTodos ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </div>
  );
};

export default TodoFilters;