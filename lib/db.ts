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
  return users.find(u => u.email === email);
}

export function createProject(project: Project) {
  projects.push(project);
}

export function getProjects() {
  return projects;
}

export function addTask(task: Task) {
  tasks.push(task);
}

export function getTasksByProject(projectId: number) {
  return tasks.filter(t => t.projectId === projectId);
}