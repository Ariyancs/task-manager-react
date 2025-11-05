import { useRef } from "react";

export default function SubtaskEditor({ subtasks = [], onAdd, onToggle, onDelete }) {
  const inputRef = useRef();

  return (
    <div className="subtask-editor">
      <ul className="subtask-list">
        {subtasks.map((s) => (
          <li key={s.id} className="subtask-row">
            <label>
              <input type="checkbox" checked={s.completed} onChange={() => onToggle(s.id)} />
              <span className={s.completed ? "subtask-completed" : ""}>{s.text}</span>
            </label>
            <button className="icon-btn small" onClick={() => onDelete(s.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="subtask-add">
        <input ref={inputRef} placeholder="Add subtask" onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            onAdd(e.target.value.trim());
            e.target.value = "";
          }
        }} />
        <button className="btn" onClick={() => {
          const val = inputRef.current.value.trim();
          if (!val) return;
          onAdd(val);
          inputRef.current.value = "";
        }}>Add</button>
      </div>
    </div>
  );
}
