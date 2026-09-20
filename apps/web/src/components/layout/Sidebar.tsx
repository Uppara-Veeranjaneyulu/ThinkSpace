import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Bell,
  Bookmark,
  Settings,
  LogOut,
  PenSquare,
  Search,
  User,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full p-4 xl:p-6">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2.5 px-2 mb-8">
        <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <span className="text-primary-foreground font-bold">T</span>
        </div>
        <span className="text-xl font-bold tracking-tight">ThinkSpace</span>
      </NavLink>

      {/* Nav items */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn('nav-item', isActive && 'active')
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : '')}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Compose button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {/* open composer modal */}}
        className="btn-primary btn-lg w-full mb-6 gap-2"
      >
        <PenSquare className="h-4 w-4" />
        Share Thought
      </motion.button>

      {/* User profile footer */}
      {user && (
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group">
          <Avatar
            src={user.avatarUrl ?? undefined}
            fallback={user.displayName}
            className="h-9 w-9"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.displayName}</p>
            <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <NavLink
              to={`/u/${user.username}`}
              className="btn-ghost btn-icon-sm"
              title="View profile"
            >
              <User className="h-4 w-4" />
            </NavLink>
            <button
              onClick={handleLogout}
              className="btn-ghost btn-icon-sm text-muted-foreground hover:text-destructive"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
