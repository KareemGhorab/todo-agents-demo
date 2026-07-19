import Button from "@/components/button/button";

type Props = {
  activeCount: number;
  completedCount: number;
  totalCount: number;
  onClearCompleted: () => void;
};

const TodoToolbar: React.FC<Props> = ({
  activeCount,
  completedCount,
  totalCount,
  onClearCompleted,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 text-xl">
    <p className="opacity-80">
      {activeCount} active · {completedCount} completed · {totalCount} total
    </p>
    {completedCount > 0 && (
      <Button type="button" variant="primary" onClick={onClearCompleted}>
        Clear completed
      </Button>
    )}
  </div>
);

export default TodoToolbar;
