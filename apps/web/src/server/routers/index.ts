import { router } from '../trpc';
import { projectRouter } from './project';

/**
 * Root application router combining all domain routers. Additional routers
 * (equipment, task, document, etc.) should be imported and added here.
 */
export const appRouter = router({
  project: projectRouter,
  // search: searchRouter, // Temporarily disabled due to logger issues
  // equipment: equipmentRouter,
  // task: taskRouter,
  // document: documentRouter,
});

export type AppRouter = typeof appRouter;
