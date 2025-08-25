import { z } from 'zod';

/**
 * Zod schemas used throughout the application to validate incoming data
 * before it reaches the database layer. Keeping these definitions in a
 * separate package promotes reuse between the API and the client.
 */

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  companyId: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  projectId: z.string().optional(),
  equipmentId: z.string().optional(),
  status: z.string().default('todo'),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
