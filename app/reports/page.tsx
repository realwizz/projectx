export default function Reports() {
  const report = {
    completed: 5,
    total: 10,
  };

  const percentage = (report.completed / report.total) * 100;

  return (
    <div>
      <h1>Reports</h1>
      <p>Tasks Completed: {report.completed}</p>
      <p>Total Tasks: {report.total}</p>
      <p>Completion Rate: {percentage}%</p>
    </div>
  );
}