import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { GaugeChart } from '@/components/gestantes/GaugeChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  HeartPulse, AlertTriangle, Baby, Users, Scale, Activity,
  Stethoscope, Syringe, ClipboardCheck, Home,
} from 'lucide-react';
import gestanteIcon from '@/assets/gestante-icon.svg';

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
      onClick={() => navigate('/linhas-de-cuidado/gestantes/relatorio')}
    >
      Relatório detalhado
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

      <div className="space-y-6">
        <FilterBar />

        {/* ── Seção 1: Resumo de gestações ── */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 shrink-0">
                <img src={gestanteIcon} alt="Gestante" className="w-8 h-8" />
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Quantidade de gestações</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No total existem{' '}
                  <span className="font-semibold text-foreground">{resumo.totalGestantes} gestantes ativas</span>,
                  sendo que{' '}
                  <span className="font-semibold text-primary">{resumo.parirProx30Dias}</span>{' '}
                  têm probabilidade de parir nos próximos 30 dias.
                  Dessas,{' '}
                  <span className="font-semibold text-[hsl(var(--status-regular))]">{resumo.riscoAlto}</span>{' '}
                  têm risco alto e{' '}
                  <span className="font-semibold text-[hsl(var(--status-suficiente))]">{resumo.riscoIntermediario}</span>{' '}
                  risco intermediário
                  ({resumo.percentMenores18}% com menos de 18 anos e {resumo.percentMaiores40}% com mais de 40 anos).
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total gestantes</p>
                      <p className="text-base font-bold text-foreground">{resumo.totalGestantes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                    <Baby className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Parir em 30 dias</p>
                      <p className="text-base font-bold text-foreground">{resumo.parirProx30Dias}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[hsl(var(--status-regular-bg))] px-3 py-2">
                    <AlertTriangle className="w-4 h-4 text-[hsl(var(--status-regular))]" />
                    <div>
                      <p className="text-xs text-muted-foreground">Risco alto</p>
                      <p className="text-base font-bold text-[hsl(var(--status-regular))]">{resumo.riscoAlto}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[hsl(var(--status-suficiente-bg))] px-3 py-2">
                    <HeartPulse className="w-4 h-4 text-[hsl(var(--status-suficiente))]" />
                    <div>
                      <p className="text-xs text-muted-foreground">Risco intermediário</p>
                      <p className="text-base font-bold text-[hsl(var(--status-suficiente))]">{resumo.riscoIntermediario}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Seção 2: Qualidade do pré-natal ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">Qualidade do pré-natal</h3>
            <Badge variant="outline" className="text-[10px] border-primary text-primary font-medium gap-1">
              <Activity className="w-3 h-3" />
              Financiamento APS
            </Badge>
          </div>

          {/* Classification cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ClassificationCard classification="otimo" count={qualidade.otimo} description="Ótimo: > 50 e ≤ 70" />
            <ClassificationCard classification="bom" count={qualidade.bom} description="Bom: > 30 e ≤ 50" />
            <ClassificationCard classification="suficiente" count={qualidade.suficiente} description="Suficiente: > 10 e ≤ 30" />
            <ClassificationCard classification="regular" count={qualidade.regular} description="Regular: ≤ 10 ou > 70" />
          </div>

          {/* Gauge charts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Progresso das ações de pré-natal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <GaugeChart
                  label="Consultas"
                  done={qualidade.consultas.feitas}
                  total={qualidade.consultas.total}
                  color="hsl(var(--status-otimo))"
                />
                <GaugeChart
                  label="Procedimentos"
                  done={qualidade.procedimentos.feitas}
                  total={qualidade.procedimentos.total}
                  color="hsl(var(--status-bom))"
                />
                <GaugeChart
                  label="Vacinas"
                  done={qualidade.vacinas.feitas}
                  total={qualidade.vacinas.total}
                  color="hsl(var(--status-suficiente))"
                />
                <GaugeChart
                  label="Visitas"
                  done={qualidade.visitas.feitas}
                  total={qualidade.visitas.total}
                  color="hsl(var(--primary))"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Seção 3: Estado nutricional + Puérperas ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Estado nutricional - sobrepeso/obesidade */}
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

          {/* Ganho ponderal excessivo */}
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

          {/* Puérperas */}
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
        </div>
      </div>
    </div>
  );
};

export default GestantesVisaoGeral;
