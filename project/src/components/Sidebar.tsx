import { FileText, Clock, Settings, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: FileText, label: 'New Note', active: true },
    { icon: Clock, label: 'Recent Notes', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <button
              onClick={onClose}
              className="lg:hidden absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
              Menu
            </h2>
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
