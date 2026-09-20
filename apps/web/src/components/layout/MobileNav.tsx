import { NavLink } from 'react-router-dom';
import { Home, Compass, PenSquare, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: '/notifications', icon: Bell, label: 'Alerts' },
];

export function MobileNav() {
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border lg:hidden">
      <div className="flex items-center justify-around px-2 py-1 safe-area-inset-bottom">
        {mobileNavItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.75} />
                <span className="text-xs font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Create button */}
        <button className="flex flex-col items-center gap-0.5 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
            <PenSquare className="h-4 w-4 text-primary-foreground" />
          </div>
        </button>

        {/* Profile */}
        {user && (
          <NavLink
            to={`/u/${user.username}`}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
