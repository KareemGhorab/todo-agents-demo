import clsx from "clsx";

import Button from "@/components/button/button";
import Card from "@/components/ui/card/card";
import type { Todo } from "./todo-app";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => (
  <Card className="flex items-center gap-4 px-5 py-3">
    <input
      type="checkbox"
      checked={todo.done}
      onChange={() => onToggle(todo.id)}
      aria-label={`Mark "${todo.text}" as ${todo.done ? "not done" : "done"}`}
      className="h-5 w-5 shrink-0 accent-primary-400"
    />
    <span
      className={clsx("flex-1 text-xl break-words", {
        "line-through opacity-50": todo.done,
      })}
    >
      {todo.text}
    </span>
    <Button
      type="button"
      variant="secondary"
      rounded
      onClick={() => onDelete(todo.id)}
      aria-label={`Delete "${todo.text}"`}
      className="h-8 w-8 shrink-0 text-base leading-none"
    >
      &times;
    </Button>
  </Card>
);

export default TodoItem;
