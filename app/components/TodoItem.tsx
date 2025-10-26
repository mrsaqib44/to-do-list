import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className="py-3 flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => toggleTodo(todo.id)}
          className="text-purple-600 hover:text-purple-800 transition-colors"
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
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
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TodoItem;