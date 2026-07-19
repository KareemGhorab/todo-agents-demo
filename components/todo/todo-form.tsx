"use client";

import { useState } from "react";

import Button from "@/components/button/button";
import Input from "@/components/form/input";

type Props = {
  onAdd: (text: string) => void;
};

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch gap-3">
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs doing?"
        aria-label="New todo"
      />
      <Button type="submit" variant="secondary" className="shrink-0">
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
