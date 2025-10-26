import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, filter, toggleTodo, deleteTodo }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{todos.length === 0 ? "No todos yet. Add one to get started!" : "No todos match your filter."}</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 mb-6">
      {filteredTodos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          toggleTodo={toggleTodo} 
          deleteTodo={deleteTodo} 
        />
      ))}
    </ul>
  );
};

export default TodoList;