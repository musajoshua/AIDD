import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Priority } from "@/types";

interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null;
  userId: string;
}

export async function createTask(input: CreateTaskInput): Promise<string> {
  const docRef = await addDoc(collection(db, "tasks"), {
    title: input.title,
    description: input.description,
    priority: input.priority,
    dueDate: input.dueDate ? Timestamp.fromDate(new Date(input.dueDate)) : null,
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    userId: input.userId,
  });
  return docRef.id;
}
