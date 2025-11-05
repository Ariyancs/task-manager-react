import { useContext, useMemo, useState, useRef, useCallback } from "react";
import { ThemeContext } from "./context/ThemeContext";
import useTodos from "./hooks/useTodos";

import FilterBar from "./components/FilterBar";
import StatsPanel from "./components/StatsPanel";
import TodoList from "./components/TodoList";

export default function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    clearCompleted,
    reorder,
    getStats
  } = useTodos();

  const [filter, setFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState("");
  const [sortBy, setSortBy] = useState("created");
  const [search, setSearch] = useState("");

  const inputRef = useRef();

  const labels = useMemo(() => {
    const set = new Set();
    todos.forEach((t) => (t.labels || []).forEach((l) => set.add(l)));
    return [...set];
  }, [todos]);

  const visible = useMemo(() => {
    let list = [...todos];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.text.toLowerCase().includes(q) ||
          (t.labels || []).some((l) => l.toLowerCase().includes(q))
      );
    }

    if (labelFilter)
      list = list.filter((t) => (t.labels || []).includes(labelFilter));

    if (filter === "active") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);
    if (filter === "overdue")
      list = list.filter(
        (t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
      );

    if (sortBy === "priority") {
      const rank = { high: 1, medium: 2, low: 3 };
      list.sort((a, b) => rank[a.priority] - rank[b.priority]);
    } else if (sortBy === "due") {
      list.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return list;
  }, [todos, search, labelFilter, filter, sortBy]);

  const handleAdd = useCallback(() => {
    const text = inputRef.current.value.trim();
    if (!text) return;

    addTodo({
      text,
      priority: "medium",
      labels: [],
      dueDate: null,
      subtasks: []
    });

    inputRef.current.value = "";
  }, [addTodo]);

  const handlers = {
    onToggle: toggleTodo,
    onDelete: deleteTodo,
    onUpdate: updateTodo,
    onAddSubtask: addSubtask,
    onToggleSubtask: toggleSubtask,
    onDeleteSubtask: deleteSubtask
  };

  const stats = useMemo(() => getStats(), [todos, getStats]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Task Manager</h1>
          <p className="muted">Advanced professional task management</p>
        </div>

        <div className="header-controls">
          <input
            placeholder="Search tasks or labels"
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="btn ghost"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle theme
          </button>
        </div>
      </header>

      <main className="main-grid">
        <aside className="side">
          <div className="add-card">
            <input
              ref={inputRef}
              placeholder="New task"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />

            <div className="add-row">
              <select>
                <option value="high">High priority</option>
                <option value="medium">Medium priority</option>
                <option value="low">Low priority</option>
              </select>

              <button className="btn" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            labels={labels}
            activeLabel={labelFilter}
            setActiveLabel={setLabelFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <StatsPanel stats={stats} />

          <button className="btn danger" onClick={clearCompleted}>
            Clear completed
          </button>
        </aside>

        <section className="content">
          <TodoList items={visible} onReorder={reorder} handlers={handlers} />
        </section>
      </main>
    </div>
  );
}
