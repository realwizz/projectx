export default function ProjectDetails({ params }) {
  const tasks = [
    { name: "Design UI", status: "Done" },
    { name: "Build API", status: "In Progress" },
  ];

  return (
    <div>
      <h1>Project {params.id}</h1>

      {tasks.map((t, i) => (
        <div key={i}>
          <p>{t.name} - {t.status}</p>
        </div>
      ))}
    </div>
  );
}