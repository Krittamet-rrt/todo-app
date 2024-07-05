export default function Todo(props) {
  const { todo, setTodos } = props;

  async function getTodos() {
    const res = await fetch("/api/todos");
    const todos = await res.json();

    setTodos(todos);
  }

  const updateTodo = async (todoId, todoStatus) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.filter((currentTodo) => currentTodo.id !== todoId);
      });
    }
    getTodos();
  };

  return (
    <div className="todo">
      <p>{todo.todo}</p>
      <div className="icon-func">
        <button
          className="todo-status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑️" : "⬜"}
        </button>
        <button className="todo-delete" onClick={() => deleteTodo(todo._id)}>
          🗑
        </button>
      </div>
    </div>
  );
}
