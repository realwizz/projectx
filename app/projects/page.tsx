const projects = [
  { id: 1, name: "Final Year Project", progress: 80 },
  { id: 2, name: "Group Work", progress: 50 },
];

export default function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      {projects.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>Progress: {p.progress}%</p>
        </div>
      ))}
    </div>
  );
}