import TodoApp from "@/components/todo/todo-app";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[600px] px-6 py-10 md:py-16">
      <h1 className="mb-8 text-5xl">TODO</h1>
      <TodoApp />
    </main>
  );
}
