import React from 'react';
import { cn } from '@/lib/utils';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface ClassificationCardProps {
  classification: Classification;
  count: number;
  description?: string;
  label?: string;
  countLabel?: string;
  icon?: React.ReactNode;
}

const classificationConfig = {
  otimo: {
    label: 'Classificadas como Ótimo',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-otimo))]',
    iconClass: 'text-[hsl(var(--status-otimo))]',
  },
  bom: {
    label: 'Classificadas como Bom',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-bom))]',
    iconClass: 'text-[hsl(var(--status-bom))]',
  },
  suficiente: {
    label: 'Classificadas como Suficiente',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-suficiente))]',
    iconClass: 'text-[hsl(var(--status-suficiente))]',
  },
  regular: {
    label: 'Classificadas como Regular',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-regular))]',
    iconClass: 'text-[hsl(var(--status-regular))]',
  },
};

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  classification,
  count,
  description,
  label,
  countLabel,
  icon,
}) => {
  const config = classificationConfig[classification];

  return (
    <div className={cn('rounded-lg p-4 shadow-sm', config.bgClass)}>
      <div className="flex items-start gap-3">
        {icon ? (
          <div className={cn('mt-0.5', config.iconClass)}>{icon}</div>
        ) : null}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label || config.label}</p>
          <p className="text-xl font-semibold text-foreground">{count} {countLabel || 'Equipes'}</p>
          {description && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
