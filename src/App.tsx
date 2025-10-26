import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle, Circle, Trash2, X } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text: newTodo.trim(),
        completed: false
      }
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600">
          <h1 className="text-3xl font-bold text-white text-center">TODO</h1>
        </div>
        
        <div className="p-6">
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              type="submit"
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <PlusCircle size={24} />
            </button>
          </form>

          {todos.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-200 mb-6">
                {filteredTodos.map(todo => (
                  <li key={todo.id} className="py-3 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleTodo(todo.id)}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        {todo.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                      </button>
                      <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {todo.text}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>

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
                  className="hover:text-gray-700"
                >
                  Clear completed
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No todos yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;