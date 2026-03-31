"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createTask } from "@/lib/firestore";
import type { Priority } from "@/types";

interface FormErrors {
  title?: string;
  dueDate?: string;
  general?: string;
}

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

interface CreateTaskFormProps {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateTaskForm({ onClose, onCreated }: CreateTaskFormProps) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(): FormErrors {
    const formErrors: FormErrors = {};
    if (!title.trim()) formErrors.title = "Title is required";
    else if (title.trim().length > 120) formErrors.title = "Title must be 120 characters or less";
    if (dueDate && dueDate < todayString()) formErrors.dueDate = "Due date must be today or in the future";
    return formErrors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formErrors = validate();
    const hasErrors = Object.values(formErrors).some(Boolean);
    setErrors(formErrors);
    if (hasErrors) return;
    if (!user) return;

    setSubmitting(true);
    setErrors({});

    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || null,
        userId: user.uid,
      });

      onCreated();
      onClose();
    } catch {
      setErrors({ general: "Failed to create task. Please try again." });
      setSubmitting(false);
    }
  }

  return (
    <div className="border border-outline-variant/20 rounded-lg bg-surface-container-low p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
          New Task
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-200 text-xs transition-colors"
        >
          Cancel
        </button>
      </div>

      {errors.general && (
        <div className="mb-4 rounded border border-error/20 bg-error-container/10 px-4 py-3 text-sm text-error">
          {errors.general}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded border border-emerald-500/20 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-400">
          Task created successfully
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <label
            htmlFor="task-title"
            className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500"
          >
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Task title..."
            className={`w-full bg-surface-container-lowest border rounded-sm py-2.5 px-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors ${
              errors.title ? "border-error/50" : "border-outline-variant/30"
            }`}
          />
          {errors.title && (
            <p className="font-mono text-[11px] text-error">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label
            htmlFor="task-description"
            className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500"
          >
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Optional description..."
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-sm py-2.5 px-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* Priority + Due Date row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="task-priority"
              className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500"
            >
              Priority
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-sm py-2.5 px-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="task-due-date"
              className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500"
            >
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              min={todayString()}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full bg-surface-container-lowest border rounded-sm py-2.5 px-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors ${
                errors.dueDate ? "border-error/50" : "border-outline-variant/30"
              }`}
            />
            {errors.dueDate && (
              <p className="font-mono text-[11px] text-error">{errors.dueDate}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold hover:bg-primary-dim transition-colors disabled:opacity-50"
          >
            {submitting ? "Creating…" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
