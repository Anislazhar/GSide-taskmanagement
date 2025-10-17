import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./tasks.types";

interface TasksState {
  tasks: Task[];
  index: number;
}

const initialState: TasksState = { tasks: [], index: 0 };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      state.index = 0;
    },
    markDone(state, action: PayloadAction<{ id: string }>) {
      const t = state.tasks.find((tsk) => tsk.id === action.payload.id);
      if (t) {
        t.status = "Done";
      }
      state.index = Math.min(
        state.index + 1,
        Math.max(0, state.tasks.length - 1)
      );
    },
    escalate(state, action: PayloadAction<{ id: string }>) {
      const t = state.tasks.find((tsk) => tsk.id === action.payload.id);
      if (t) t.status = "Escalated";
      state.index = Math.min(
        state.index + 1,
        Math.max(0, state.tasks.length - 1)
      );
    },
    skip(state) {
      state.index = Math.min(
        state.index + 1,
        Math.max(0, state.tasks.length - 1)
      );
    },
    updateBirthdate(
      state,
      action: PayloadAction<{ id: string; birthdate: string }>
    ) {
      const t = state.tasks.find((tsk) => tsk.id === action.payload.id);
      if (t) t.birthdate = action.payload.birthdate;
    },
    restartQueue(state) {
      state.index = 0;
    },
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
  },
});

export const {
  setTasks,
  markDone,
  escalate,
  skip,
  updateBirthdate,
  restartQueue,
  setIndex,
} = tasksSlice.actions;

export default tasksSlice.reducer;
