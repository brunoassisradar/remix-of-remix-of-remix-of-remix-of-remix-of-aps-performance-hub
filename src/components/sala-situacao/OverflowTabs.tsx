import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverflowTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const OverflowTabs: React.FC<OverflowTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tabs.length);
  const [showOverflow, setShowOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerWidth = container.offsetWidth - 40; // reserve space for >> button
      const children = container.querySelectorAll('[data-tab-item]');
      let totalWidth = 0;
      let count = 0;
      children.forEach((child) => {
        const el = child as HTMLElement;
        totalWidth += el.offsetWidth + 4; // gap
        if (totalWidth < containerWidth) count++;
      });
      if (count < tabs.length) {
        setVisibleCount(count);
      } else {
        setVisibleCount(tabs.length);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [tabs]);

  const visibleTabs = tabs.slice(0, visibleCount);
  const overflowTabs = tabs.slice(visibleCount);
  const hasOverflow = overflowTabs.length > 0;

  return (
    <div className={cn('relative', className)}>
      <div ref={containerRef} className="flex items-center gap-1 border-b border-border">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            data-tab-item
            onClick={() => onTabChange(tab)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px',
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab}
          </button>
        ))}
        {hasOverflow && (
          <div className="relative ml-auto">
            <button
              onClick={() => setShowOverflow(!showOverflow)}
              className="px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
            >
              <ChevronRight className="w-4 h-4" />
              <ChevronRight className="w-4 h-4 -ml-2.5" />
            </button>
            {showOverflow && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 z-50 min-w-[180px]">
                {overflowTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      onTabChange(tab);
                      setShowOverflow(false);
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm transition-colors',
                      activeTab === tab
                        ? 'text-primary bg-primary/5 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
