export default function PriorityBadge({ level }) {
  const map = {
    high: { label: "High", className: "badge-high" },
    medium: { label: "Medium", className: "badge-medium" },
    low: { label: "Low", className: "badge-low" }
  };
  const item = map[level] || map.medium;
  return <span className={`priority-badge ${item.className}`}>{item.label}</span>;
}
