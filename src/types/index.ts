import type { Timestamp } from "firebase/firestore";

export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: Timestamp | null;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}

export type TaskFormData = Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">;

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
