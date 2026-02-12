import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';

const GestantesVisaoGeral: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Visão geral de Gestantes e Puérperas"
        breadcrumbs={[
          { label: 'Linhas de cuidado', path: '/linhas-de-cuidado' },
          { label: 'Gestantes e Puérperas', path: '/linhas-de-cuidado/gestantes' },
          { label: 'Visão geral' },
        ]}
      />
      <div className="rounded-lg bg-card p-8 shadow-sm text-center text-muted-foreground">
        <p>Conteúdo da visão geral em construção.</p>
      </div>
    </div>
  );
};

export default GestantesVisaoGeral;
