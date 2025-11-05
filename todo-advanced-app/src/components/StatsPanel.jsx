export default function StatsPanel({ stats }) {
  return (
    <div className="panel">
      <h3>Statistics</h3>
      <p>Total: {stats.total}</p>
      <p>Active: {stats.active}</p>
      <p>Completed: {stats.completed}</p>
    </div>
  );
}
