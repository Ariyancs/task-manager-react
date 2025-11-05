export default function FilterBar({
  filter,
  setFilter,
  labels,
  activeLabel,
  setActiveLabel,
  sortBy,
  setSortBy
}) {
  return (
    <div className="panel">
      <h3>Filters</h3>

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>

      <h3>Labels</h3>
      <select
        value={activeLabel}
        onChange={(e) => setActiveLabel(e.target.value)}
      >
        <option value="">All labels</option>
        {labels.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <h3>Sort</h3>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="created">Created</option>
        <option value="priority">Priority</option>
        <option value="due">Due date</option>
      </select>
    </div>
  );
}
