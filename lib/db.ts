type User = {
  id: number;
  email: string;
  password: string;
  role: "user" | "admin";
};

type Project = {
  id: number;
  name: string;
  userId: number;
};

type Task = {
  id: number;
  projectId: number;
  title: string;
  status: "todo" | "done";
};

let users: User[] = [];

let projects: Project[] = [];

let tasks: Task[] = [];

export function addUser(user: User) {
  users.push(user);
}

export function findUser(email: string) {
  return users.find((u) => u.email === email);
}

export function createProject(name: string, userId: number) {
  const newProject: Project = {
    id: Date.now(),
    name,
    userId,
  };

  projects.push(newProject);

  return newProject;
}

export function getProjects() {
  return projects;
}

export function getProjectById(id: number) {
  return projects.find((p) => p.id === id);
}

export function addTask(projectId: number, title: string) {
  const task: Task = {
    id: Date.now(),
    projectId,
    title,
    status: "todo",
  };

  tasks.push(task);

  return task;
}

export function updateTaskStatus(
  taskId: number,
  status: "todo" | "done"
) {
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.status = status;
  }

  return task;
}

export function getTasksByProject(projectId: number) {
  return tasks.filter((t) => t.projectId === projectId);
}

export function getAllTasks() {
  return tasks;
}