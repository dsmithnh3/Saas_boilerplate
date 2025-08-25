import { AppShell } from '@acme/ui';
import { trpc } from '@/lib/trpc';

/**
 * Lists all projects accessible to the current user. Data is fetched
 * server‑side via tRPC. Should the session expire this page will still
 * render an empty list; additional guarding can be implemented at the
 * router level to redirect unauthenticated users.
 */
export default async function ProjectsPage() {
  const projects = await trpc.project.list.query();
  const nav = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' },
    { label: 'Equipment', href: '/equipment' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Documents', href: '/documents' },
  ];
  return (
    <AppShell navItems={nav} headerContent={<h2 className="text-lg font-semibold">Projects</h2>}>
      <div className="space-y-4">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map(p => (
              <li
                key={p.id}
                className="rounded-md bg-muted p-4 shadow transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <a href={`/projects/${p.id}`}>{p.name}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
