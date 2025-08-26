import { AppShell } from '@acme/ui';

/**
 * Dashboard page displays high level KPIs and an activity feed. In a real
 * system the data would be fetched from the API via tRPC or server
 * actions. Here we render static placeholders to illustrate the layout.
 */
export default function DashboardPage() {
  const nav = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' },
    { label: 'Equipment', href: '/equipment' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Documents', href: '/documents' },
  ];
  return (
    <AppShell navItems={nav} headerContent={<h2 className="text-lg font-semibold">Dashboard</h2>}>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-muted p-4 shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Open Projects</h3>
          <p className="mt-2 text-3xl font-bold">5</p>
        </div>
        <div className="rounded-lg bg-muted p-4 shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Active Tasks</h3>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>
        <div className="rounded-lg bg-muted p-4 shadow">
          <h3 className="text-sm font-medium text-muted-foreground">New Documents</h3>
          <p className="mt-2 text-3xl font-bold">3</p>
        </div>
      </section>
      <section className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <ul className="space-y-2">
          <li className="rounded-md bg-muted p-4">
            John Smith uploaded a document to Project Alpha.
          </li>
          <li className="rounded-md bg-muted p-4">New task created: Inspect compressor unit.</li>
          <li className="rounded-md bg-muted p-4">Estimation report approved for Project Beta.</li>
        </ul>
      </section>
    </AppShell>
  );
}
