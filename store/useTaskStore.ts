import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: Date;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const generateId = () => Math.random().toString(16).substring(2, 10);

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...task, id: generateId(), createdAt: new Date() },
          ],
        })),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: "task-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
