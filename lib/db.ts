import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, integer, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

// Start connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

// Defining the schemas
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").$type<"user" | "admin">().default("user").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  weight: integer("weight").default(1),
  status: text("status").$type<"todo" | "done">().default("todo").notNull(),
});

export async function addUser(user: { email: string; password: string; role: "user" | "admin" }) {
  return await db.insert(users).values(user).returning();
}

export async function findUser(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0]; // Returns the user or undefined
}

export async function createProject(name: string, userId: number) {
  const result = await db.insert(projects).values({
    name,
    userId,
  }).returning();
  return result[0];
}

export async function getProjects() {
  return await db.select().from(projects);
}

export async function getProjectById(id: number) {
  const result = await db.select().from(projects).where(eq(projects.id, id));
  return result[0];
}

export async function addTask(projectId: number, title: string, weight: number = 1) {
  const result = await db.insert(tasks).values({
    projectId,
    title,
    weight,
    status: "todo",
  }).returning();
  return result[0];
}

export async function updateTaskStatus(taskId: number, status: "todo" | "done") {
  const result = await db.update(tasks)
    .set({ status })
    .where(eq(tasks.id, taskId))
    .returning();
  return result[0];
}

export async function getTasksByProject(projectId: number) {
  return await db.select().from(tasks).where(eq(tasks.projectId, projectId));
}

export async function getAllTasks() {
  return await db.select().from(tasks);
}

// dashboard logic
export async function getProjectWithTasks(projectId: number) {
  const project = await getProjectById(projectId);
  const projectTasks = await getTasksByProject(projectId);
  return { ...project, tasks: projectTasks };
}

export async function getDashboardStats() {
  const allProjects = await getProjects();
  const allTasks = await getAllTasks();

  const stats = allProjects.map((project) => {
    const projectTasks = allTasks.filter((t) => t.projectId === project.id);
    
    if (projectTasks.length === 0) return { ...project, progress: 0 };

    const totalWeight = projectTasks.reduce((sum, t) => sum + (t.weight || 1), 0);
    const completedWeight = projectTasks.reduce((sum, t) => 
      sum + (t.status === "done" ? (t.weight || 1) : 0), 0
    );

    const progress = Math.round((completedWeight / totalWeight) * 100);
    return { ...project, progress };
  });

  return stats;
}