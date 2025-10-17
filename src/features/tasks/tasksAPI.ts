export async function fetchTasksJson(): Promise<any> {
  const res = await fetch("/tasks.json");
  if (!res.ok) throw new Error("Failed to load tasks.json");
  return res.json();
}
