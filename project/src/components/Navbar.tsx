import { FileText, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 shadow-sm z-40">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">ClinicalNoteAI</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">MD</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
