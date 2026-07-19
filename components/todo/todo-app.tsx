"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import TodoToolbar from "./todo-toolbar";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "todo-agents-demo:todos";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

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

  const counts = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.done).length;
    return {
      totalCount: todos.length,
      completedCount,
      activeCount: todos.length - completedCount,
    };
  }, [todos]);

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

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
    setShowClearModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <TodoForm onAdd={addTodo} />
      <TodoToolbar
        activeCount={counts.activeCount}
        completedCount={counts.completedCount}
        totalCount={counts.totalCount}
        onClearCompleted={() => setShowClearModal(true)}
      />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      {showClearModal && (
        <Modal
          title="Clear completed todos?"
          onClose={() => setShowClearModal(false)}
          actions={
            <>
              <Button type="button" onClick={() => setShowClearModal(false)}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={clearCompleted}>
                Clear
              </Button>
            </>
          }
        >
          Remove {counts.completedCount} completed{" "}
          {counts.completedCount === 1 ? "todo" : "todos"}? This cannot be
          undone.
        </Modal>
      )}
    </div>
  );
};

export default TodoApp;
