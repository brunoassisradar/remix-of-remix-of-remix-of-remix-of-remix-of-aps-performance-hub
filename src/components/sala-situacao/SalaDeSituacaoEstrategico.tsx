import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign, Users, TrendingUp, TrendingDown, AlertTriangle,
  HeartPulse, Baby, Eye, Hospital, HelpCircle, ChevronRight,
  UserX, FileWarning, UsersRound, Info, Wallet,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart, Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GaugeChart } from '@/components/gestantes/GaugeChart';
import { SectionHeader } from '@/components/gestantes/SectionHeader';
import { DraggableCard } from './DraggableCard';
import { OverflowTabs } from './OverflowTabs';
import iconeGestanteActive from '@/assets/icone-gestante-active.svg';
import iconeGestanteDefault from '@/assets/icone-gestante-default.svg';
import iconeDiabetesActive from '@/assets/icone-diabetes-active.svg';
import iconeDiabetesDefault from '@/assets/icone-diabetes-default.svg';
import iconeCriancaActive from '@/assets/icone-crianca-active.svg';
import iconeCriancaDefault from '@/assets/icone-crianca-default.svg';

// ── Mock data ──
const entradasData = {
  totalFederal: 4280450,
  variacaoFederal: 12.4,
  aps: 2140225,
  apsPercTotal: 50,
  perdasAps: -342100,
  perdasPercPotencial: 15.9,
};

const perdasClinicasData = {
  acompanhamento: { monitoradas: 12450, total: 18310, percentual: 68 },
  indicadores: [
    { label: 'C1', valor: 42 },
    { label: 'C2', valor: 42 },
    { label: 'C3', valor: 42 },
    { label: 'C4', valor: 42 },
    { label: 'C5', valor: 42 },
    { label: 'C6', valor: 42 },
  ],
};

const perdasAdminData = {
  cadastrosVsAtivos: 94.2,
  completosVsCadastros: 81.5,
  cnes: {
    equipeDuplicada: 4,
    cboInvalido: 12,
    equipesIncompletas: 7,
  },
};

const historicoPerdasData = {
  acumulado: 3840000,
  percPotencial: 12.5,
  serie: [
    { mes: 'OUT/22', real: 180000, potencial: 210000 },
    { mes: 'DEZ/22', real: 170000, potencial: 210000 },
    { mes: 'FEV/23', real: 160000, potencial: 215000 },
    { mes: 'ABR/23', real: 155000, potencial: 215000 },
    { mes: 'JUN/23', real: 150000, potencial: 220000 },
    { mes: 'AGO/23', real: 145000, potencial: 220000 },
    { mes: 'OUT/23', real: 140000, potencial: 225000 },
  ],
};

const vinculoGauge = { nota: 3, classificacao: 'Regular' as const };

const resumo = {
  totalGestantes: 85,
  parirProx30Dias: 12,
  riscoAlto: 8,
  riscoIntermediario: 15,
  percentMenores18: 3.5,
  percentMaiores40: 5.9,
};

const metricas = {
  iegm: { nota: 'C+', iSaude: 'C+', geral: 'C+', ano: 2021 },
  icsaps: { municipio: 24.2, residentes: 16.8, ano: 2024 },
};

const classificacaoColors: Record<string, string> = {
  Regular: 'hsl(var(--status-regular))',
  Suficiente: 'hsl(var(--status-suficiente))',
  Bom: 'hsl(var(--status-bom))',
  Ótimo: 'hsl(var(--status-otimo))',
};

// ── Component ──
const SalaDeSituacaoEstrategico: React.FC = () => {
  const navigate = useNavigate();
  const [financeiroLeftTab, setFinanceiroLeftTab] = useState('Entradas');
  const [financeiroRightTab, setFinanceiroRightTab] = useState('Vínculo e Acompanhamento');
  const [perfilTab, setPerfilTab] = useState('Gestantes e puérperas');

  // Drag & drop state for cards order
  const [cardOrder, setCardOrder] = useState(['financeiro', 'populacao', 'metricas']);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = useCallback((_e: React.DragEvent, id: string) => {
    setDraggedId(id);
  }, []);

  const handleDrop = useCallback((_e: React.DragEvent, targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    setCardOrder((prev) => {
      const newOrder = [...prev];
      const fromIdx = newOrder.indexOf(draggedId);
      const toIdx = newOrder.indexOf(targetId);
      newOrder.splice(fromIdx, 1);
      newOrder.splice(toIdx, 0, draggedId);
      return newOrder;
    });
    setDraggedId(null);
  }, [draggedId]);

  const renderFinanceiroCard = () => (
    <DraggableCard id="financeiro" key="financeiro" onDragStart={handleDragStart} onDrop={handleDrop}>
      <div className="p-1">
        <div className="px-4 pt-4 pb-2">
          <SectionHeader
            title="Financeiro APS"
            icon={<DollarSign className="w-4 h-4 text-primary" />}
            linkTo="/financeiro/visao-geral"
            linkLabel="Visão geral Financeira"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-4 px-4 pb-4">
          {/* Left panel - 3 cols */}
          <div className="lg:col-span-3 border border-border rounded-lg overflow-hidden">
            <OverflowTabs
              tabs={['Entradas', 'Perdas Clínicas', 'Perdas administrativa', 'Histórico de perdas']}
              activeTab={financeiroLeftTab}
              onTabChange={setFinanceiroLeftTab}
            />
            <div className="p-5 min-h-[320px]">
              {financeiroLeftTab === 'Entradas' && <EntradasContent />}
              {financeiroLeftTab === 'Perdas Clínicas' && <PerdasClinicasContent />}
              {financeiroLeftTab === 'Perdas administrativa' && <PerdasAdminContent />}
              {financeiroLeftTab === 'Histórico de perdas' && <HistoricoPerdasContent />}
            </div>
          </div>

          {/* Right panel - 2 cols */}
          <div className="lg:col-span-2 border border-border rounded-lg overflow-hidden">
            <OverflowTabs
              tabs={['Vínculo e Acompanhamento', 'Qualidade']}
              activeTab={financeiroRightTab}
              onTabChange={setFinanceiroRightTab}
            />
            <div className="p-5 min-h-[320px] flex flex-col items-center justify-center">
              <VinculoGaugeContent />
            </div>
          </div>
        </div>
      </div>
    </DraggableCard>
  );

  const renderPopulacaoCard = () => (
    <DraggableCard id="populacao" key="populacao" onDragStart={handleDragStart} onDrop={handleDrop}>
      <div className="p-1">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <SectionHeader
            title="População"
            icon={<Users className="w-4 h-4 text-primary" />}
            linkTo="/linhas-de-cuidado"
            linkLabel="Linha de cuidado"
          />
        </div>

        <div className="px-4 pb-2">
          <div className="flex items-center gap-1 border-b border-border">
            {[
              { label: 'Hipertensos', icon: <HeartPulse className="w-3.5 h-3.5" />, value: 'Hipertensos' },
              { label: 'Diabéticos', iconSrc: perfilTab === 'Diabéticos' ? iconeDiabetesActive : iconeDiabetesDefault, value: 'Diabéticos' },
              { label: 'Gestantes e puérperas', iconSrc: perfilTab === 'Gestantes e puérperas' ? iconeGestanteActive : iconeGestanteDefault, value: 'Gestantes e puérperas' },
              { label: 'Crianças', iconSrc: perfilTab === 'Crianças' ? iconeCriancaActive : iconeCriancaDefault, value: 'Crianças' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setPerfilTab(item.value)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  perfilTab === item.value
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.icon ? item.icon : <img src={item.iconSrc} alt="" className="w-3.5 h-3.5" />}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {perfilTab === 'Gestantes e puérperas' && (
          <div className="px-4 pb-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="px-5 py-4 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
                    <img src={iconeGestanteActive} alt="" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">{resumo.totalGestantes} gestações ativas</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Sendo que <span className="font-semibold text-primary">{resumo.parirProx30Dias}</span> têm probabilidade de parir nos próximos 30 dias.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[13px] text-muted-foreground">
                        <span className="font-semibold text-foreground">{resumo.percentMenores18}%</span> com menos de 18 anos
                      </span>
                      <span className="text-[13px] text-muted-foreground">
                        <span className="font-semibold text-foreground">{resumo.percentMaiores40}%</span> com mais de 40 anos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
                <div className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Total gestantes</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">{resumo.totalGestantes}</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Baby className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Parir em 30 dias</p>
                  </div>
                  <p className="text-xl font-bold text-primary">{resumo.parirProx30Dias}</p>
                </div>
                <div className="px-4 py-3 text-center bg-[hsl(var(--status-regular-bg))]">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--status-regular))]" />
                    <p className="text-xs text-muted-foreground">Risco alto</p>
                  </div>
                  <p className="text-xl font-bold text-[hsl(var(--status-regular))]">{resumo.riscoAlto}</p>
                </div>
                <div className="px-4 py-3 text-center bg-[hsl(var(--status-suficiente-bg))]">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <HeartPulse className="w-3.5 h-3.5 text-[hsl(var(--status-suficiente))]" />
                    <p className="text-xs text-muted-foreground">Risco intermediário</p>
                  </div>
                  <p className="text-xl font-bold text-[hsl(var(--status-suficiente))]">{resumo.riscoIntermediario}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {(perfilTab === 'Hipertensos' || perfilTab === 'Diabéticos' || perfilTab === 'Crianças') && (
          <div className="px-4 pb-4">
            <div className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
              Conteúdo de {perfilTab} — mesma estrutura da versão tática.
            </div>
          </div>
        )}
      </div>
    </DraggableCard>
  );

  const renderMetricasCard = () => (
    <DraggableCard id="metricas" key="metricas" onDragStart={handleDragStart} onDrop={handleDrop}>
      <div className="p-1">
        <div className="px-4 pt-4 pb-2">
          <SectionHeader
            title="Métricas APS"
            icon={<Users className="w-4 h-4 text-primary" />}
            linkTo="/linhas-de-cuidado"
            linkLabel="Linha de cuidado"
          />
        </div>

        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* IEGM */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="p-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Nota IEGM</span>
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="flex flex-col items-center py-6 gap-1">
              <span className="text-4xl font-bold text-primary">{metricas.iegm.nota}</span>
              <p className="text-sm text-primary font-medium">nota no I-Saúde</p>
              <div className="mt-3 text-center text-sm text-muted-foreground space-y-0.5">
                <p>IEGM {metricas.iegm.geral}</p>
                <p>nota do IEGM geral</p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Notas referentes ao ano de {metricas.iegm.ano}.</p>
            </div>
            <div className="px-4 py-2.5 border-t border-border">
              <p className="text-xs text-muted-foreground">Fonte: TCE-SC.</p>
            </div>
          </div>

          {/* ICSAPS */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hospital className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Internações por Condições Sensíveis à Atenção Primária (ICSAPS)</span>
              </div>
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl font-bold text-primary shrink-0">{metricas.icsaps.municipio}%</span>
                <p className="text-sm text-muted-foreground">
                  das internações no município foram por Condições Sensíveis à Atenção Primária em {metricas.icsaps.ano}.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl font-bold text-primary shrink-0">{metricas.icsaps.residentes}%</span>
                <p className="text-sm text-muted-foreground">
                  das internações de residentes do município foram por Condições Sensíveis à Atenção Primária em {metricas.icsaps.ano}.
                </p>
              </div>
            </div>
            <div className="px-4 py-2.5 border-t border-border">
              <p className="text-xs text-muted-foreground">Fonte: SIH.</p>
            </div>
          </div>
        </div>
      </div>
    </DraggableCard>
  );

  const cardRenderers: Record<string, () => React.ReactNode> = {
    financeiro: renderFinanceiroCard,
    populacao: renderPopulacaoCard,
    metricas: renderMetricasCard,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-[26px] font-medium text-foreground">Bem-vindo (a), nome do usuário</h1>

      {cardOrder.map((id) => cardRenderers[id]?.())}
    </div>
  );
};

// ── Sub-components ──

const EntradasContent: React.FC = () => {
  const d = entradasData;
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Federal Arrecadado</p>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-3xl font-bold text-foreground">R$ {d.totalFederal.toLocaleString('pt-BR')}</span>
          <span className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--status-bom))]">
            <TrendingUp className="w-4 h-4" />
            {d.variacaoFederal}%
          </span>
        </div>
      </div>

      <div className="border border-border rounded-lg p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Atenção Primária à Saúde</p>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-xl font-bold text-foreground">R$ {d.aps.toLocaleString('pt-BR')}</span>
          <span className="text-sm text-muted-foreground">{d.apsPercTotal}% do total</span>
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${d.apsPercTotal}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">Válidos para o financiamento</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-[hsl(var(--status-regular))] uppercase tracking-wide">Perdas em Atenção Primária</p>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-[hsl(var(--status-regular-bg))] rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Real vs Potencial</p>
            <p className="text-lg font-bold text-[hsl(var(--status-regular))]">- R$ {Math.abs(d.perdasAps).toLocaleString('pt-BR')}</p>
          </div>
          <div className="bg-[hsl(var(--status-regular-bg))] rounded-lg p-3">
            <p className="text-xs text-muted-foreground">% Perda Potencial</p>
            <p className="text-lg font-bold text-[hsl(var(--status-regular))]">{d.perdasPercPotencial}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PerdasClinicasContent: React.FC = () => {
  const d = perdasClinicasData;
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Acompanhamento</p>
        <div className="flex flex-col items-center mt-4">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3"
                strokeDasharray={`${d.acompanhamento.percentual}, 100`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{d.acompanhamento.percentual}%</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {d.acompanhamento.monitoradas.toLocaleString('pt-BR')} / {d.acompanhamento.total.toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-muted-foreground">Pessoas Monitoradas / Total Cadastrados</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {d.indicadores.map((ind) => (
          <div key={ind.label} className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
            <span className="text-sm font-semibold text-foreground">{ind.label}</span>
            <span className="text-sm text-muted-foreground">{ind.valor}%</span>
            <div className="w-6 h-1 rounded-full bg-[hsl(var(--status-regular))]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const PerdasAdminContent: React.FC = () => {
  const d = perdasAdminData;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[hsl(var(--status-regular-bg))] rounded-lg p-4">
          <p className="text-2xl font-bold text-foreground">{d.cadastrosVsAtivos}%</p>
          <p className="text-sm font-medium text-foreground mt-1">Cadastros vs Ativos</p>
          <p className="text-xs text-muted-foreground mt-0.5">Divergência entre base municipal e sistemas federais.</p>
        </div>
        <div className="bg-[hsl(var(--status-suficiente-bg))] rounded-lg p-4">
          <p className="text-2xl font-bold text-foreground">{d.completosVsCadastros}%</p>
          <p className="text-sm font-medium text-foreground mt-1">Completos vs Cadastros</p>
          <p className="text-xs text-muted-foreground mt-0.5">Cadastros sem CPF ou CNS válido para faturamento.</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pendências de Cadastro (CNES)</p>
        <div className="mt-3 space-y-0 border border-border rounded-lg overflow-hidden">
          {[
            { icon: <UsersRound className="w-4 h-4 text-[hsl(var(--status-regular))]" />, label: 'Equipes Duplicadas', value: d.cnes.equipeDuplicada },
            { icon: <FileWarning className="w-4 h-4 text-[hsl(var(--status-suficiente))]" />, label: 'CBO Inválido', value: d.cnes.cboInvalido },
            { icon: <UserX className="w-4 h-4 text-[hsl(var(--status-regular))]" />, label: 'Equipes Incompletas', value: d.cnes.equipesIncompletas },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-border' : ''}`}>
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <span className="text-sm font-bold text-primary">{String(item.value).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HistoricoPerdasContent: React.FC = () => {
  const d = historicoPerdasData;
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Histórico de Perdas (12 meses)</p>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-2xl font-bold text-foreground">R$ {d.acumulado.toLocaleString('pt-BR')}</span>
          <span className="text-sm font-medium text-[hsl(var(--status-regular))]">
            ({d.percPotencial}% do potencial acumulado)
          </span>
        </div>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={d.serie}>
            <defs>
              <linearGradient id="gradientGap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--status-regular))" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(var(--status-regular))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="potencial"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              fill="url(#gradientGap)"
              strokeDasharray="4 4"
              name="Potencial"
            />
            <Area
              type="monotone"
              dataKey="real"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="hsl(var(--primary))"
              fillOpacity={0.1}
              name="Faturamento Real"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const VinculoGaugeContent: React.FC = () => {
  const d = vinculoGauge;
  const segments = ['Regular', 'Suficiente', 'Bom', 'Ótimo'];
  const segmentColors = [
    'hsl(var(--status-regular))',
    'hsl(var(--status-suficiente))',
    'hsl(var(--status-bom))',
    'hsl(var(--status-otimo))',
  ];
  // Position of indicator: nota 3 = Regular (index 0)
  const indicatorPosition = ((d.nota - 1) / 10) * 100;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Gauge-like circle */}
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none" stroke={classificacaoColors[d.classificacao]} strokeWidth="3"
            strokeDasharray="30, 100" />
        </svg>
        {/* Red dot at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full bg-[hsl(var(--status-regular))] border-2 border-card" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{d.nota}</span>
          <span className="text-xs font-medium text-[hsl(var(--status-regular))]">{d.classificacao}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">Válidos para o financiamento</p>

      {/* Color bar */}
      <div className="w-full max-w-xs">
        <div className="flex h-3 rounded-full overflow-hidden relative">
          {/* Indicator marker */}
          <div className="absolute top-0 -translate-y-1 z-10" style={{ left: `${indicatorPosition}%` }}>
            <div className="w-3 h-5 bg-foreground rounded-sm" />
          </div>
          {segmentColors.map((color, i) => (
            <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {segments.map((s) => (
            <span key={s} className="text-[10px] text-muted-foreground">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaDeSituacaoEstrategico;
