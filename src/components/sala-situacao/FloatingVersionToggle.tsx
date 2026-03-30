import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingVersionToggleProps {
  version: 'tatico' | 'estrategico';
  onVersionChange: (version: 'tatico' | 'estrategico') => void;
}

export const FloatingVersionToggle: React.FC<FloatingVersionToggleProps> = ({
  version,
  onVersionChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-14 right-0 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Versão do painel
          </p>
          <button
            onClick={() => { onVersionChange('tatico'); setOpen(false); }}
            className={cn(
              'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2',
              version === 'tatico' ? 'text-primary bg-primary/5 font-medium' : 'text-foreground hover:bg-muted'
            )}
          >
            <span className={cn('w-2 h-2 rounded-full', version === 'tatico' ? 'bg-primary' : 'bg-border')} />
            Versão Tático
          </button>
          <button
            onClick={() => { onVersionChange('estrategico'); setOpen(false); }}
            className={cn(
              'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2',
              version === 'estrategico' ? 'text-primary bg-primary/5 font-medium' : 'text-foreground hover:bg-muted'
            )}
          >
            <span className={cn('w-2 h-2 rounded-full', version === 'estrategico' ? 'bg-primary' : 'bg-border')} />
            Versão Estratégico
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          open && 'ring-2 ring-primary/30'
        )}
      >
        <Settings2 className="w-5 h-5" />
      </button>
    </div>
  );
};
