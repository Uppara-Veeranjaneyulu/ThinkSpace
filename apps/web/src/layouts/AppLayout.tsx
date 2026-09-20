import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightPanel } from '@/components/layout/RightPanel';
import { MobileNav } from '@/components/layout/MobileNav';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop left sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-border">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0 max-w-2xl mx-auto w-full">
        <div className="min-h-screen pb-20 lg:pb-0">
          <Outlet />
        </div>
      </main>

      {/* Desktop right panel */}
      <aside className="hidden xl:flex xl:flex-col xl:w-80 shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-border">
        <RightPanel />
      </aside>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
