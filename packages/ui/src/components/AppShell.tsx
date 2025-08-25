import React from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export interface NavigationItem {
  label: string;
  href: string;
}

export interface AppShellProps {
  /**
   * Page content to render inside the shell.
   */
  children: React.ReactNode;
  /**
   * List of navigation entries displayed in the sidebar.
   */
  navItems?: NavigationItem[];
  /**
   * Optional header content such as actions or search bars.
   */
  headerContent?: React.ReactNode;
}

/**
 * A responsive application shell that provides a sidebar for navigation and
 * a top bar for global actions. It accepts a list of navigation items and
 * optional header content. The shell respects user preferences such as
 * reduced motion and supports dark mode via Tailwind's class toggles.
 */
export const AppShell: React.FC<AppShellProps> = ({
  children,
  navItems = [],
  headerContent,
}) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar: hidden on small screens */}
      <aside className={cn('hidden', 'md:flex', 'w-64', 'border-r', 'bg-muted', 'p-4', 'flex-col')}>\
        <h1 className="mb-4 text-lg font-semibold">Menu</h1>
        <nav className="space-y-2">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b bg-background px-4">
          <div>{headerContent}</div>
          <div className="flex items-center gap-2">
            {/* Placeholder for actions such as notifications or user avatar */}
            <Button variant="outline" className="h-8 w-8 p-0" aria-label="User menu">
              <span className="sr-only">User menu</span>
              {/* Simple circle placeholder */}
              <div className="h-4 w-4 rounded-full bg-muted-foreground" />
            </Button>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};
