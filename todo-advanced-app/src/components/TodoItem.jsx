export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask
}) {
  const overdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className="todo-item">
      <div className="row">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <div className="main">
          <div className={`title ${todo.completed ? "done" : ""}`}>
            {todo.text}
            {overdue && <span className="overdue">Overdue</span>}
          </div>

          <div className="meta">
            <span className={`priority ${todo.priority}`}>{todo.priority}</span>
            {todo.labels?.map((l) => (
              <span key={l} className="label">
                {l}
              </span>
            ))}
          </div>
        </div>

        <button className="btn small danger" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>

      {todo.subtasks.length > 0 && (
        <div className="sub">
          {todo.subtasks.map((s) => (
            <div key={s.id} className="sub-row">
              <input
                type="checkbox"
                checked={s.completed}
                onChange={() => onToggleSubtask(todo.id, s.id)}
              />
              <span className={s.completed ? "done" : ""}>{s.text}</span>
              <button
                className="btn small"
                onClick={() => onDeleteSubtask(todo.id, s.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        className="sub-input"
        placeholder="Add subtask"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            onAddSubtask(todo.id, e.target.value.trim());
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}
