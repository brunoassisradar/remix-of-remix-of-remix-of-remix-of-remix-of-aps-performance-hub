import React from 'react';
import { useNavigate } from 'react-router-dom';
import gestanteIcon from '@/assets/gestante-icon.svg';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { GaugeChart } from '@/components/gestantes/GaugeChart';
import { SectionHeader } from '@/components/gestantes/SectionHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  HeartPulse, AlertTriangle, Baby, Users, Scale,
  Stethoscope, CalendarCheck,
} from 'lucide-react';

// Mock data
const resumo = {
  totalGestantes: 85,
  parirProx30Dias: 12,
  riscoAlto: 8,
  riscoIntermediario: 15,
  menores18: 3,
  maiores40: 5,
  percentMenores18: 3.5,
  percentMaiores40: 5.9,
};

const qualidade = {
  otimo: 18,
  bom: 32,
  suficiente: 24,
  regular: 11,
  consultas: { feitas: 342, total: 510 },
  procedimentos: { feitas: 189, total: 255 },
  vacinas: { feitas: 156, total: 204 },
  visitas: { feitas: 198, total: 340 },
};

const nutricional = {
  sobrepesoObesidade: 29.4,
  sobrepesoObesidadeN: 25,
  ganhoPonderalExcessivo: 7,
};

const puerperio = {
  totalPuerperas: 23,
  semConsultaPercent: 34.8,
  semConsultaN: 8,
};

const GestantesVisaoGeral: React.FC = () => {
  const navigate = useNavigate();

  const headerActions = (
    <Button
      variant="outline"
      size="sm"
      className="border-primary text-primary hover:bg-primary/5"
      onClick={() => navigate('/linhas-de-cuidado/gestantes/individualizado')}
    >
      Busca ativa
    </Button>
  );

  return (
    <div>
      <PageHeader
        title="Visão geral de Gestantes e Puérperas"
        breadcrumbs={[
          { label: 'Linhas de cuidado', path: '/linhas-de-cuidado' },
          { label: 'Gestantes e Puérperas', path: '/linhas-de-cuidado/gestantes' },
          { label: 'Visão geral' },
        ]}
        actions={headerActions}
      />

      <div className="space-y-8">
        <FilterBar />

        {/* ═══════════ PERFIL ═══════════ */}
        <section className="space-y-4">
          <SectionHeader
            title="Perfil"
            icon={<Users className="w-4 h-4 text-primary" />}
            linkTo="/linhas-de-cuidado/gestantes/relatorio?indicador=perfil"
          />

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Hero strip */}
              <div className="px-6 py-5 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                    <img src={gestanteIcon} alt="Gestante" className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-foreground">Quantidade de gestações</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      No total existem{' '}
                      <span className="font-semibold text-foreground">{resumo.totalGestantes} gestantes ativas</span>,
                      sendo que{' '}
                      <span className="font-semibold text-primary">{resumo.parirProx30Dias}</span>{' '}
                      têm probabilidade de parir nos próximos 30 dias.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground">
                        <span className="font-semibold text-foreground">{resumo.percentMenores18}%</span> com menos de 18 anos
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground">
                        <span className="font-semibold text-foreground">{resumo.percentMaiores40}%</span> com mais de 40 anos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border border-t border-border">
                <div className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Total gestantes</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{resumo.totalGestantes}</p>
                </div>
                <div className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Baby className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Parir em 30 dias</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">{resumo.parirProx30Dias}</p>
                </div>
                <div className="px-5 py-4 text-center bg-[hsl(var(--status-regular-bg))]">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-[hsl(var(--status-regular))]" />
                    <p className="text-xs text-muted-foreground">Risco alto</p>
                  </div>
                  <p className="text-2xl font-bold text-[hsl(var(--status-regular))]">{resumo.riscoAlto}</p>
                </div>
                <div className="px-5 py-4 text-center bg-[hsl(var(--status-suficiente-bg))]">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <HeartPulse className="w-4 h-4 text-[hsl(var(--status-suficiente))]" />
                    <p className="text-xs text-muted-foreground">Risco intermediário</p>
                  </div>
                  <p className="text-2xl font-bold text-[hsl(var(--status-suficiente))]">{resumo.riscoIntermediario}</p>
                </div>
              </div>

            </CardContent>
          </Card>
        </section>

        {/* ═══════════ ACOMPANHAMENTO ═══════════ */}
        <section className="space-y-4">
          <SectionHeader
            title="Acompanhamento"
            icon={<CalendarCheck className="w-4 h-4 text-primary" />}
            linkTo="/linhas-de-cuidado/gestantes/relatorio?indicador=acompanhamento"
          />

          {/* Qualidade do pré-natal */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Qualidade do pré-natal</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ClassificationCard classification="otimo" count={qualidade.otimo} countLabel="gestantes" icon={true} />
              <ClassificationCard classification="bom" count={qualidade.bom} countLabel="gestantes" icon={true} />
              <ClassificationCard classification="suficiente" count={qualidade.suficiente} countLabel="gestantes" icon={true} />
              <ClassificationCard classification="regular" count={qualidade.regular} countLabel="gestantes" icon={true} />
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Progresso das ações de pré-natal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <GaugeChart label="Consultas" done={qualidade.consultas.feitas} total={qualidade.consultas.total} />
                  <GaugeChart label="Procedimentos" done={qualidade.procedimentos.feitas} total={qualidade.procedimentos.total} />
                  <GaugeChart label="Vacinas" done={qualidade.vacinas.feitas} total={qualidade.vacinas.total} />
                  <GaugeChart label="Visitas" done={qualidade.visitas.feitas} total={qualidade.visitas.total} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estado nutricional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-[hsl(var(--status-suficiente))]">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--status-suficiente-bg))]">
                    <Scale className="w-5 h-5 text-[hsl(var(--status-suficiente))]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Estado nutricional</p>
                    <p className="text-2xl font-bold text-[hsl(var(--status-suficiente))]">{nutricional.sobrepesoObesidade}%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      com sobrepeso ou obesidade ({nutricional.sobrepesoObesidadeN} gestantes)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[hsl(var(--status-regular))]">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--status-regular-bg))]">
                    <AlertTriangle className="w-5 h-5 text-[hsl(var(--status-regular))]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Ganho ponderal excessivo</p>
                    <p className="text-2xl font-bold text-[hsl(var(--status-regular))]">{nutricional.ganhoPonderalExcessivo}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      gestantes com ganho ponderal {'>'} P90
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════ PUERPÉRIO ═══════════ */}
        <section className="space-y-4">
          <SectionHeader
            title="Puerpério"
            icon={<Baby className="w-4 h-4 text-primary" />}
            linkTo="/linhas-de-cuidado/gestantes/relatorio?indicador=puerperio"
          />

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Total de puérperas</p>
                  <p className="text-2xl font-bold text-foreground">{puerperio.totalPuerperas}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-semibold text-[hsl(var(--status-regular))]">
                      {puerperio.semConsultaPercent}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      sem consulta puerperal ({puerperio.semConsultaN})
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default GestantesVisaoGeral;
