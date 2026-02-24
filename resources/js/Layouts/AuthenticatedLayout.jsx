import { useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  Bars3Icon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  PaintBrushIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Success from '@/Components/Alerts/Success';
import Error from '@/Components/Alerts/Error';
import Warning from '@/Components/Alerts/Warning';

const navigation = [
  { name: 'Dashboard', routeName: 'dashboard', match: 'dashboard', icon: HomeIcon },
  { name: 'Analytics', routeName: 'analytics.index', match: 'analytics.*', icon: ChartBarSquareIcon },
  { name: 'Institutional', routeName: 'institucional.index', match: 'institucional.*', icon: BuildingOffice2Icon },
  { name: 'Categories', routeName: 'category.index', match: 'category.*', icon: FolderIcon },
  { name: 'Portfolio', routeName: 'portfolio.index', match: 'portfolio.*', icon: BriefcaseIcon },
  { name: 'Available Designs', routeName: 'available_design.index', match: 'available_design.*', icon: PaintBrushIcon },
  { name: 'Contacts', routeName: 'contact.index', match: 'contact.*', icon: UserGroupIcon },
  { name: 'Site Settings', routeName: 'site.setting.index', match: 'site.setting.*', icon: Cog6ToothIcon },
  { name: 'Social', routeName: 'social.index', match: 'social.*', icon: RectangleGroupIcon },
];

function SidebarLinks({ onNavigate }) {
  return (
    <nav className="mt-4 space-y-1.5">
      {navigation.map((item) => {
        const isActive = route().current(item.match);
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={route(item.routeName)}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-white/15 text-white'
                : 'text-slate-200/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Authenticated({ user, header, children }) {
  const { flash } = usePage().props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentRouteName = route().current() || '';

  const initials = useMemo(() => {
    const name = user?.name || '';
    const letters = name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');

    return letters || 'U';
  }, [user?.name]);

  const breadcrumbs = useMemo(() => {
    if (!currentRouteName) return ['Dashboard'];

    const [prefix, action] = currentRouteName.split('.');
    const sectionMap = {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      institucional: 'Institutional',
      category: 'Categories',
      portfolio: 'Portfolio',
      available_design: 'Available Designs',
      contact: 'Contacts',
      social: 'Social',
      site: 'Site Settings',
      profile: 'Profile',
    };

    const actionMap = {
      index: 'List',
      create: 'Create',
      edit: 'Edit',
      view: 'View',
      metrics: 'Metrics',
    };

    const section = sectionMap[prefix] || 'Dashboard';
    const actionLabel = actionMap[action] || null;

    if (section === 'Dashboard' && !actionLabel) return ['Dashboard'];
    if (!actionLabel) return ['Dashboard', section];

    return ['Dashboard', section, actionLabel];
  }, [currentRouteName]);

  return (
    <div className="min-h-screen bg-[#f3f3f9] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-full w-full items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((previousState) => !previousState)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <ApplicationLogo className="h-8 w-auto fill-current text-slate-900" />
              <span className="hidden text-sm font-semibold text-slate-700 sm:inline">Solztt Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 md:flex">
              <ChartBarSquareIcon className="h-4 w-4" />
              Control Panel
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#405189] text-xs font-semibold text-white">
                {initials}
              </div>
              <div className="hidden min-w-0 sm:block">
                <p className="max-w-[140px] truncate text-xs font-semibold text-slate-700">{user?.name}</p>
                <p className="max-w-[140px] truncate text-[11px] text-slate-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed inset-y-0 left-0 top-16 z-50 w-72 transform border-r border-[#4d609a] bg-[#405189] p-4 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-300/80">Menu</p>
        <SidebarLinks onNavigate={() => setIsSidebarOpen(false)} />

        <div className="mt-6 space-y-2 border-t border-white/15 pt-4">
          <Link
            href={route('profile.edit')}
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            Profile
          </Link>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="flex w-full items-center rounded-lg bg-white/10 px-3 py-2 text-left text-sm font-medium text-white transition hover:bg-white/20"
          >
            Logout
          </Link>
        </div>
      </aside>

      {isSidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <main className="pt-16 lg:pl-72">
        <div className="space-y-4 p-4 lg:space-y-5 lg:p-6">
          <section className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <nav className="mb-1 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb}-${index}`} className="inline-flex items-center gap-2">
                  {index > 0 && <span className="text-slate-300">/</span>}
                  <span className={index === breadcrumbs.length - 1 ? 'text-slate-700' : ''}>{crumb}</span>
                </span>
              ))}
            </nav>
            {header || <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>}
          </section>

          <div className="space-y-3">
            {flash?.error && <Error message={flash.error} />}
            {flash?.warning && <Warning message={flash.warning} />}
            {flash?.success && <Success message={flash.success} />}
          </div>

          <section>{children}</section>
        </div>
      </main>
    </div>
  );
}
