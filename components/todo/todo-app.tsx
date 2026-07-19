"use client";

import { useEffect, useState } from "react";

import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "todo-agents-demo:todos";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTodos(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, loaded]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, done: false },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default TodoApp;
