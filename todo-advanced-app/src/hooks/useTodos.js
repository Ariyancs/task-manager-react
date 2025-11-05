import { useReducer, useEffect, useCallback } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [{ ...action.payload, id: Date.now(), completed: false }, ...state];

    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );

    case "delete":
      return state.filter((t) => t.id !== action.id);

    case "update":
      return state.map((t) => (t.id === action.id ? { ...t, ...action.payload } : t));

    case "add_sub":
      return state.map((t) =>
        t.id === action.id
          ? {
              ...t,
              subtasks: [
                ...t.subtasks,
                { id: Date.now(), text: action.text, completed: false }
              ]
            }
          : t
      );

    case "toggle_sub":
      return state.map((t) =>
        t.id === action.id
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === action.sid ? { ...s, completed: !s.completed } : s
              )
            }
          : t
      );

    case "delete_sub":
      return state.map((t) =>
        t.id === action.id
          ? { ...t, subtasks: t.subtasks.filter((s) => s.id !== action.sid) }
          : t
      );

    case "clear_completed":
      return state.filter((t) => !t.completed);

    case "reorder":
      return action.payload;

    default:
      return state;
  }
}

export default function useTodos() {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => dispatch({ type: "add", payload: todo });
  const toggleTodo = (id) => dispatch({ type: "toggle", id });
  const deleteTodo = (id) => dispatch({ type: "delete", id });
  const updateTodo = (id, payload) => dispatch({ type: "update", id, payload });

  const addSubtask = (id, text) => dispatch({ type: "add_sub", id, text });
  const toggleSubtask = (id, sid) => dispatch({ type: "toggle_sub", id, sid });
  const deleteSubtask = (id, sid) => dispatch({ type: "delete_sub", id, sid });

  const clearCompleted = () => dispatch({ type: "clear_completed" });
  const reorder = (payload) => dispatch({ type: "reorder", payload });

  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    clearCompleted,
    reorder,
    getStats
  };
}
