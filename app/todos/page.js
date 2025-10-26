"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function TodoList() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  async function addTodo() {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  }

  return (
    <div>
      <h1>To-Do List</h1>
      {session && <button onClick={() => signOut()}>Logout</button>}
      <input placeholder="New Task" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
