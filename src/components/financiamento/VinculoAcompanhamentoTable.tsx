import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, ChevronRightIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface CadastroBarData {
  cadastroCompleto: number;
  cadastroIndividual: number;
  semCadastro: number;
}

interface AcompanhamentoBarData {
  acompanhadas: number;
  total: number;
}

interface DimensaoData {
  janeiro: CadastroBarData;
  fevereiro: CadastroBarData;
  marco: CadastroBarData;
  abril: CadastroBarData;
}

interface AcompanhamentoDimensaoData {
  janeiro: AcompanhamentoBarData;
  fevereiro: AcompanhamentoBarData;
  marco: AcompanhamentoBarData;
  abril: AcompanhamentoBarData;
}

interface VinculoData {
  key: string;
  equipeSaude: string;
  unidade: string;
  ine: string;
  cnes: string;
  notaFinal: number;
  classificacaoFinal: Classification;
  cadastro: DimensaoData;
  acompanhamento: AcompanhamentoDimensaoData;
}

const statusColors: Record<Classification, string> = {
  otimo: 'bg-[#3C8DBC]',
  bom: 'bg-[#00A65A]',
  suficiente: 'bg-[#F0AD4E]',
  regular: 'bg-[#DD4B39]',
};

const statusLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

const statusFilters = [
  { text: 'Ótimo', value: 'otimo' },
  { text: 'Bom', value: 'bom' },
  { text: 'Suficiente', value: 'suficiente' },
  { text: 'Regular', value: 'regular' },
];

const monthToLabel: Record<string, string> = {
  janeiro: 'Janeiro',
  fevereiro: 'Fevereiro',
  marco: 'Março',
  abril: 'Abril',
};

const ResultadoCell: React.FC<{ nota: number; classification: Classification }> = ({ nota, classification }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${statusColors[classification]}`} />
      <span className="text-sm">{statusLabels[classification]} | {nota}</span>
    </div>
  );
};

const createDimensoes = (): { cadastro: DimensaoData; acompanhamento: AcompanhamentoDimensaoData } => ({
  cadastro: {
    janeiro: { cadastroCompleto: 100, cadastroIndividual: 200, semCadastro: 300 },
    fevereiro: { cadastroCompleto: 100, cadastroIndividual: 200, semCadastro: 300 },
    marco: { cadastroCompleto: 100, cadastroIndividual: 200, semCadastro: 300 },
    abril: { cadastroCompleto: 100, cadastroIndividual: 200, semCadastro: 300 },
  },
  acompanhamento: {
    janeiro: { acompanhadas: 300, total: 600 },
    fevereiro: { acompanhadas: 300, total: 600 },
    marco: { acompanhadas: 300, total: 600 },
    abril: { acompanhadas: 300, total: 600 },
  },
});

const sampleData: VinculoData[] = [
  { key: '1', equipeSaude: 'Equipe 001 - ESF', unidade: 'Uaps Anisio Teixeira', ine: '0000123456', cnes: '2529181', notaFinal: 4, classificacaoFinal: 'regular', ...createDimensoes() },
  { key: '2', equipeSaude: 'Equipe 002 - ESF', unidade: 'Uaps Vicentina Campos', ine: '0000234567', cnes: '2529203', notaFinal: 4.75, classificacaoFinal: 'regular', ...createDimensoes() },
  { key: '3', equipeSaude: 'Equipe 003 - eAP', unidade: 'Uaps Gutemberg Braun', ine: '0000345678', cnes: '2482282', notaFinal: 4.75, classificacaoFinal: 'regular', ...createDimensoes() },
  { key: '4', equipeSaude: 'Equipe 004 - ESF', unidade: 'Uaps Fausto Freire', ine: '0000456789', cnes: '9686479', notaFinal: 4, classificacaoFinal: 'regular', ...createDimensoes() },
  { key: '5', equipeSaude: 'Equipe 005 - ESF', unidade: 'Uaps Helio Goes', ine: '0000567890', cnes: '2529211', notaFinal: 6.5, classificacaoFinal: 'suficiente', ...createDimensoes() },
  { key: '6', equipeSaude: 'Equipe 006 - eAP', unidade: 'Uaps Licinio Nunes de Miranda', ine: '0000678901', cnes: '9129553', notaFinal: 6.5, classificacaoFinal: 'suficiente', ...createDimensoes() },
  { key: '7', equipeSaude: 'Equipe 007 - ESF', unidade: 'Uaps Pontes Neto', ine: '0000789012', cnes: '9006052', notaFinal: 6.5, classificacaoFinal: 'suficiente', ...createDimensoes() },
  { key: '8', equipeSaude: 'Equipe 008 - ESF', unidade: 'Uaps Fernandes Tavora', ine: '0000890123', cnes: '2528819', notaFinal: 8.25, classificacaoFinal: 'bom', ...createDimensoes() },
  { key: '9', equipeSaude: 'Equipe 009 - eAP', unidade: 'Uaps Virgilio Tavora', ine: '0000901234', cnes: '2415585', notaFinal: 6.5, classificacaoFinal: 'suficiente', ...createDimensoes() },
  { key: '10', equipeSaude: 'Equipe 010 - ESF', unidade: 'Uaps Cdfam Gilmario Teixeira', ine: '0001012345', cnes: '0407836', notaFinal: 6.5, classificacaoFinal: 'suficiente', ...createDimensoes() },
];

const columns: ColumnsType<VinculoData> = [
  {
    title: 'Equipe de Saúde',
    dataIndex: 'equipeSaude',
    key: 'equipeSaude',
    width: '25%',
    render: (text: string) => <span className="font-medium">{text}</span>,
    sorter: (a, b) => a.equipeSaude.localeCompare(b.equipeSaude),
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '30%',
    sorter: (a, b) => a.unidade.localeCompare(b.unidade),
  },
  {
    title: 'INE',
    dataIndex: 'ine',
    key: 'ine',
    width: '15%',
    sorter: (a, b) => a.ine.localeCompare(b.ine),
  },
  {
    title: 'CNES',
    dataIndex: 'cnes',
    key: 'cnes',
    width: '12%',
    sorter: (a, b) => a.cnes.localeCompare(b.cnes),
  },
  {
    title: 'Nota Final',
    dataIndex: 'notaFinal',
    key: 'notaFinal',
    width: '18%',
    filters: statusFilters,
    onFilter: (value, record) => record.classificacaoFinal === value,
    sorter: (a, b) => a.notaFinal - b.notaFinal,
    render: (nota: number, record: VinculoData) => (
      <ResultadoCell nota={nota} classification={record.classificacaoFinal} />
    ),
  },
];

// Cadastro stacked bar chart component
const CadastroBarChart: React.FC<{ data: CadastroBarData; month: string; equipeKey: string }> = ({ data, month, equipeKey }) => {
  const navigate = useNavigate();
  const total = data.cadastroCompleto + data.cadastroIndividual + data.semCadastro;
  const chartData = [
    { name: 'bar', cadastroCompleto: data.cadastroCompleto, cadastroIndividual: data.cadastroIndividual, semCadastro: data.semCadastro }
  ];

  const handleClick = () => {
    const periodo = monthToLabel[month] || 'Consolidado';
    navigate(`/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo&dimensao=cadastro&periodo=${periodo}&equipe=${equipeKey}`);
  };

  return (
    <div 
      className="flex items-center gap-2 w-full cursor-pointer hover:opacity-80 transition-opacity" 
      onClick={handleClick}
    >
      <div className="flex-1 h-7 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis type="number" domain={[0, total]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Bar dataKey="cadastroCompleto" stackId="a" fill="#3B82F6" radius={[4, 0, 0, 4]} barSize={20}>
              <LabelList dataKey="cadastroCompleto" position="center" fill="#fff" fontSize={10} fontWeight={600} />
            </Bar>
            <Bar dataKey="cadastroIndividual" stackId="a" fill="#22C55E" barSize={20}>
              <LabelList dataKey="cadastroIndividual" position="center" fill="#fff" fontSize={10} fontWeight={600} />
            </Bar>
            <Bar dataKey="semCadastro" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={20}>
              <LabelList dataKey="semCadastro" position="center" fill="#fff" fontSize={10} fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChevronRightIcon className="h-4 w-4 text-muted-foreground shrink-0" />
    </div>
  );
};

// Acompanhamento bar chart component
const AcompanhamentoBarChart: React.FC<{ data: AcompanhamentoBarData; month: string; equipeKey: string }> = ({ data, month, equipeKey }) => {
  const navigate = useNavigate();
  const chartData = [
    { name: 'bar', acompanhadas: data.acompanhadas, restante: data.total - data.acompanhadas }
  ];

  const handleClick = () => {
    const periodo = monthToLabel[month] || 'Consolidado';
    navigate(`/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo&dimensao=acompanhamento&periodo=${periodo}&equipe=${equipeKey}`);
  };

  return (
    <div 
      className="flex items-center gap-2 w-full cursor-pointer hover:opacity-80 transition-opacity" 
      onClick={handleClick}
    >
      <div className="flex-1 h-7 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis type="number" domain={[0, data.total]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Bar dataKey="acompanhadas" stackId="a" fill="#3B82F6" radius={[4, 0, 0, 4]} barSize={20}>
              <LabelList dataKey="acompanhadas" position="center" fill="#fff" fontSize={10} fontWeight={600} />
            </Bar>
            <Bar dataKey="restante" stackId="a" fill="#D1D5DB" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChevronRightIcon className="h-4 w-4 text-muted-foreground shrink-0" />
    </div>
  );
};

const ExpandedRow: React.FC<{ record: VinculoData }> = ({ record }) => {
  const cadastroLegend = [
    { label: 'Pessoas com cadastro completo e atualizado', color: '#3B82F6' },
    { label: 'Pessoas com somente cadastro individual atualizado', color: '#22C55E' },
    { label: 'Pessoas sem cadastro individual atualizado', color: '#EF4444' },
  ];

  const acompanhamentoLegend = [
    { label: 'Pessoas acompanhadas', color: '#3B82F6' },
  ];

  return (
    <div className="bg-muted/20 border-t border-border space-y-4 py-4">
      {/* Dimensão Cadastro */}
      <div>
        {/* Header com título e legenda */}
        <div className="flex items-center gap-3 mb-2 px-4 py-2 bg-muted rounded-t-md border border-border flex-wrap">
          <span className="text-base font-semibold text-foreground">Dimensão Cadastro</span>
          <div className="flex flex-wrap gap-3">
            {cadastroLegend.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Tabela de meses */}
        <div className="overflow-x-auto border border-t-0 border-border rounded-b-md">
          <div className="indicator-grid min-w-[800px]">
            {/* Header row */}
            <div className="indicator-grid-header">
              <div className="indicator-grid-cell font-medium text-muted-foreground">Janeiro</div>
              <div className="indicator-grid-cell font-medium text-muted-foreground">Fevereiro</div>
              <div className="indicator-grid-cell font-medium text-muted-foreground">Março</div>
              <div className="indicator-grid-cell font-medium text-muted-foreground">Abril</div>
            </div>
            {/* Data row com gráficos */}
            <div className="indicator-grid-row-4cols bg-card">
              <div className="indicator-grid-cell">
                <CadastroBarChart data={record.cadastro.janeiro} month="janeiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <CadastroBarChart data={record.cadastro.fevereiro} month="fevereiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <CadastroBarChart data={record.cadastro.marco} month="marco" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <CadastroBarChart data={record.cadastro.abril} month="abril" equipeKey={record.key} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dimensão Acompanhamento */}
      <div>
        {/* Header com título e legenda */}
        <div className="flex items-center gap-3 mb-2 px-4 py-2 bg-muted rounded-t-md border border-border flex-wrap">
          <span className="text-base font-semibold text-foreground">Dimensão Acompanhamento</span>
          <div className="flex flex-wrap gap-3">
            {acompanhamentoLegend.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Tabela de meses */}
        <div className="overflow-x-auto border border-t-0 border-border rounded-b-md">
          <div className="indicator-grid min-w-[800px]">
            {/* Header row */}
            <div className="indicator-grid-header">
              <div className="indicator-grid-cell font-medium text-muted-foreground">Janeiro</div>
              <div className="indicator-grid-cell font-medium text-muted-foreground">Fevereiro</div>
              <div className="indicator-grid-cell font-medium text-muted-foreground">Março</div>
              <div className="indicator-grid-cell font-medium text-muted-foreground">Abril</div>
            </div>
            {/* Data row com gráficos */}
            <div className="indicator-grid-row-4cols bg-card">
              <div className="indicator-grid-cell">
                <AcompanhamentoBarChart data={record.acompanhamento.janeiro} month="janeiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <AcompanhamentoBarChart data={record.acompanhamento.fevereiro} month="fevereiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <AcompanhamentoBarChart data={record.acompanhamento.marco} month="marco" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <AcompanhamentoBarChart data={record.acompanhamento.abril} month="abril" equipeKey={record.key} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VinculoAcompanhamentoTable: React.FC = () => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{sampleData.length}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
      </div>
      <Table
        columns={columns}
        dataSource={sampleData}
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} equipes`,
          pageSizeOptions: ['10', '20', '50'],
          defaultPageSize: 10,
        }}
        size="middle"
      />
    </div>
  );
};
