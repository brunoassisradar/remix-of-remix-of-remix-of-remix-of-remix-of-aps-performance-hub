import React, { useState } from 'react';
import { Segmented } from 'antd';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TeamData {
  nome: string;
  ine: string;
  cadastroCompleto: number;
  cadastroIndividual: number;
  semCadastro: number;
  parametro: number;
  limiteMaximo: number;
}

interface UnidadeData {
  nome: string;
  equipes: TeamData[];
}

const sampleData: UnidadeData[] = [
  {
    nome: 'Clinica da Familia Banco de Areia',
    equipes: [
      { nome: 'ESF VERSALHES', ine: '0002259028', cadastroCompleto: 1893, cadastroIndividual: 168, semCadastro: 254, parametro: 3000, limiteMaximo: 4500 },
      { nome: 'ESF PINDORAMA', ine: '0002259052', cadastroCompleto: 1971, cadastroIndividual: 192, semCadastro: 215, parametro: 3000, limiteMaximo: 4500 },
      { nome: 'ESF HUMAITA', ine: '0002259044', cadastroCompleto: 1974, cadastroIndividual: 498, semCadastro: 302, parametro: 3000, limiteMaximo: 4500 },
    ],
  },
  {
    nome: 'Clinica da Familia Franca Leite',
    equipes: [
      { nome: 'ESF FRANCA LEITE', ine: '0000294721', cadastroCompleto: 1782, cadastroIndividual: 186, semCadastro: 889, parametro: 3000, limiteMaximo: 4500 },
      { nome: 'SOCORRO', ine: '0002125838', cadastroCompleto: 2652, cadastroIndividual: 295, semCadastro: 406, parametro: 3000, limiteMaximo: 4500 },
    ],
  },
  {
    nome: 'Clinica da Familia Santa Cruz',
    equipes: [
      { nome: 'ESF SANTA CRUZ I', ine: '0002341001', cadastroCompleto: 2100, cadastroIndividual: 320, semCadastro: 180, parametro: 3000, limiteMaximo: 4500 },
      { nome: 'ESF SANTA CRUZ II', ine: '0002341002', cadastroCompleto: 1650, cadastroIndividual: 410, semCadastro: 540, parametro: 3000, limiteMaximo: 4500 },
    ],
  },
];

type ViewMode = 'absoluto' | 'porcentagem';

const BarChart: React.FC<{ team: TeamData; viewMode: ViewMode }> = ({ team, viewMode }) => {
  const total = team.cadastroCompleto + team.cadastroIndividual + team.semCadastro;
  const faltam = team.parametro - total;

  if (viewMode === 'porcentagem') {
    const pCompleto = (team.cadastroCompleto / team.limiteMaximo) * 100;
    const pIndividual = (team.cadastroIndividual / team.limiteMaximo) * 100;
    const pSem = (team.semCadastro / team.limiteMaximo) * 100;
    const pParametro = (team.parametro / team.limiteMaximo) * 100;

    return (
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{team.nome} – {team.ine}</p>
        <div className="relative h-8 w-full bg-muted/30 rounded overflow-visible">
          {/* Bars */}
          <div className="absolute inset-y-0 left-0 flex h-full" style={{ width: `${pCompleto + pIndividual + pSem}%` }}>
            <div className="h-full bg-[hsl(210,80%,45%)] flex items-center justify-center" style={{ width: `${(team.cadastroCompleto / total) * 100}%` }}>
              <span className="text-xs font-semibold text-white">{((team.cadastroCompleto / team.limiteMaximo) * 100).toFixed(1)}%</span>
            </div>
            <div className="h-full bg-[hsl(145,65%,45%)] flex items-center justify-center" style={{ width: `${(team.cadastroIndividual / total) * 100}%` }}>
              <span className="text-xs font-semibold text-white">{((team.cadastroIndividual / team.limiteMaximo) * 100).toFixed(1)}%</span>
            </div>
            <div className="h-full bg-[hsl(0,70%,55%)] flex items-center justify-center" style={{ width: `${(team.semCadastro / total) * 100}%` }}>
              <span className="text-xs font-semibold text-white">{((team.semCadastro / team.limiteMaximo) * 100).toFixed(1)}%</span>
            </div>
          </div>
          {/* Parâmetro marker */}
          <div className="absolute top-0 bottom-0 border-r-2 border-foreground/40" style={{ left: `${pParametro}%` }}>
            <span className="absolute -top-0.5 left-2 text-xs text-muted-foreground font-medium">{((team.parametro / team.limiteMaximo) * 100).toFixed(0)}%</span>
          </div>
          {/* Limite máximo label */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+8px)] text-xs text-muted-foreground font-medium whitespace-nowrap">100%</span>
        </div>
        {faltam > 0 && (
          <div className="flex items-center gap-1.5">
            <p className="text-xs text-blue-600 italic">
              Faltam {faltam.toLocaleString('pt-BR')} pessoas vinculadas à equipe.
            </p>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-muted-foreground underline text-xs cursor-help">O que pode acontecer se passar o limite?</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">Se a equipe ultrapassar o limite máximo de pessoas vinculadas, poderá haver impacto no cálculo do financiamento.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    );
  }

  // Valor absoluto view
  const maxValue = team.limiteMaximo;
  const wCompleto = (team.cadastroCompleto / maxValue) * 100;
  const wIndividual = (team.cadastroIndividual / maxValue) * 100;
  const wSem = (team.semCadastro / maxValue) * 100;
  const paramPos = (team.parametro / maxValue) * 100;

  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-foreground">{team.nome} – {team.ine}</p>
      <div className="relative h-8 w-full bg-muted/30 rounded overflow-visible">
        {/* Stacked bars */}
        <div className="absolute inset-y-0 left-0 flex h-full" style={{ width: `${wCompleto + wIndividual + wSem}%` }}>
          <div className="h-full bg-[hsl(210,80%,45%)] flex items-center justify-center" style={{ width: `${(team.cadastroCompleto / total) * 100}%` }}>
            <span className="text-xs font-semibold text-white">{team.cadastroCompleto.toLocaleString('pt-BR')}</span>
          </div>
          <div className="h-full bg-[hsl(145,65%,45%)] flex items-center justify-center" style={{ width: `${(team.cadastroIndividual / total) * 100}%` }}>
            <span className="text-xs font-semibold text-white">{team.cadastroIndividual.toLocaleString('pt-BR')}</span>
          </div>
          <div className="h-full bg-[hsl(0,70%,55%)] flex items-center justify-center" style={{ width: `${(team.semCadastro / total) * 100}%` }}>
            <span className="text-xs font-semibold text-white">{team.semCadastro.toLocaleString('pt-BR')}</span>
          </div>
        </div>
        {/* Parâmetro marker */}
        <div className="absolute top-0 bottom-0 border-r-2 border-foreground/40" style={{ left: `${paramPos}%` }}>
          <span className="absolute -top-0.5 left-2 text-xs text-muted-foreground font-medium">{team.parametro.toLocaleString('pt-BR')}</span>
        </div>
        {/* Limite máximo label */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+8px)] text-xs text-muted-foreground font-medium whitespace-nowrap">{team.limiteMaximo.toLocaleString('pt-BR')}</span>
      </div>
      {faltam > 0 && (
        <div className="flex items-center gap-1.5">
          <p className="text-xs text-blue-600 italic">
            Faltam {faltam.toLocaleString('pt-BR')} pessoas vinculadas à equipe.
          </p>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-muted-foreground underline text-xs cursor-help">O que pode acontecer se passar o limite?</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">Se a equipe ultrapassar o limite máximo de pessoas vinculadas, poderá haver impacto no cálculo do financiamento.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

const ComparativoCadastroContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('absoluto');

  return (
    <div className="space-y-6">
      {/* Header with toggle */}
      <div className="flex items-center gap-4">
        <h3 className="text-base font-semibold text-foreground">Dimensão Cadastro</h3>
        <Segmented
          value={viewMode === 'absoluto' ? 'Valor absoluto' : 'Porcentagem (%)'}
          onChange={(val) => setViewMode(val === 'Valor absoluto' ? 'absoluto' : 'porcentagem')}
          options={['Valor absoluto', 'Porcentagem (%)']}
        />
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-foreground">
        Quantitativo de pessoas de acordo com a situação cadastral, por equipe de saúde
      </p>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[hsl(210,80%,45%)]" />
          <span>Pessoas com cadastro completo e atualizado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[hsl(145,65%,45%)]" />
          <span>Pessoas com somente cadastro individual atualizado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[hsl(0,70%,55%)]" />
          <span>Pessoas sem cadastro individual atualizado</span>
        </div>
      </div>

      {/* Charts by unit */}
      <div className="space-y-8">
        {sampleData.map((unidade) => (
          <div key={unidade.nome} className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">{unidade.nome}</h4>
            <div className="space-y-5 pr-14">
              {unidade.equipes.map((equipe) => (
                <BarChart key={equipe.ine} team={equipe} viewMode={viewMode} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparativoCadastroContent;
