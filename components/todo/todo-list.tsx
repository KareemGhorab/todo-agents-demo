import type { Todo } from "./todo-app";
import TodoItem from "./todo-item";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <p className="text-center text-xl opacity-60">
        Nothing here yet. Add your first todo!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
