export type TaskStatus = "New" | "Done" | "Escalated";

export interface Task {
  id: string;
  contractNumber: string;
  name: string;
  status: TaskStatus;
  ocrBirthdate?: string;
  birthdate?: string;
  sex?: string;
  address?: string;
}
