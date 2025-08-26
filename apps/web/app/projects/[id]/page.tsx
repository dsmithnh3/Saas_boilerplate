import { AppShell } from '@acme/ui';

// Avoid prerendering at build time because this page depends on runtime data
export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: { id: string };
}

/**
 * Shows details for a specific project, including related equipment,
 * documents, tasks and estimates. If the project does not exist the
 * built‑in `notFound()` helper triggers a 404 page.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  // For now, use mock data to avoid database issues during development
  const project = {
    id: params.id,
    name: `Project ${params.id}`,
    description: `This is project ${params.id}`,
    equipment: [],
    tasks: [],
    documents: [],
    estimates: [],
  };
  const nav = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' },
    { label: project.name, href: `/projects/${project.id}` },
  ];
  return (
    <AppShell
      navItems={nav}
      headerContent={<h2 className="text-lg font-semibold">{project.name}</h2>}
    >
      <div className="space-y-6">
        <section>
          <h3 className="text-md font-semibold">Project Description</h3>
          <p>{project.description ?? 'No description provided.'}</p>
        </section>
        <section>
          <h3 className="text-md font-semibold">Equipment</h3>
          {project.equipment.length === 0 ? (
            <p>No equipment associated with this project.</p>
          ) : (
            <ul className="ml-4 list-disc">
              {project.equipment.map((eq: { id: string; name: string }) => (
                <li key={eq.id}>{eq.name}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3 className="text-md font-semibold">Tasks</h3>
          {project.tasks.length === 0 ? (
            <p>No tasks defined.</p>
          ) : (
            <ul className="ml-4 list-disc">
              {project.tasks.map((task: { id: string; title: string }) => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3 className="text-md font-semibold">Documents</h3>
          {project.documents.length === 0 ? (
            <p>No documents uploaded.</p>
          ) : (
            <ul className="ml-4 list-disc">
              {project.documents.map((doc: { id: string; title: string }) => (
                <li key={doc.id}>{doc.title}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3 className="text-md font-semibold">Estimates</h3>
          {project.estimates.length === 0 ? (
            <p>No estimates available.</p>
          ) : (
            <ul className="ml-4 list-disc">
              {project.estimates.map((est: { id: string; name: string }) => (
                <li key={est.id}>{est.name}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
