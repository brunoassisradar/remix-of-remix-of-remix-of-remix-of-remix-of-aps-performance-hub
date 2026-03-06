import React, { useState, useEffect } from 'react';
import { Table, Button, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { VinculoIndividualizadoFilterBar } from '@/components/financiamento/VinculoIndividualizadoFilterBar';

// Interface for Qualidade tab
interface PessoaQualidadeData {
  key: string;
  nome: string;
  cpfCns: string;
  equipe: string;
  unidade: string;
  indicadores: string[];
}

// Interface for Vínculo tab
interface PessoaVinculoData {
  key: string;
  nome: string;
  cpfCns: string;
  equipe: string;
  unidade: string;
  criterio: 'idoso' | 'sem_criterio';
  cadastroDomiciliar: boolean;
  cadastroIndividual: boolean;
  acompanhada: boolean;
}

// Sample data for Qualidade tab
const qualidadeData: PessoaQualidadeData[] = [
  {
    key: '1',
    nome: 'Maria da Silva Santos',
    cpfCns: '123.456.789-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    indicadores: ['C2', 'C3'],
  },
  {
    key: '2',
    nome: 'João Pedro Oliveira',
    cpfCns: '987.654.321-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    indicadores: ['C4'],
  },
  {
    key: '3',
    nome: 'Ana Carolina Ferreira',
    cpfCns: '456.789.123-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    indicadores: ['C2', 'C5', 'C6'],
  },
  {
    key: '4',
    nome: 'Carlos Eduardo Lima',
    cpfCns: '789.123.456-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    indicadores: ['C5', 'C6'],
  },
  {
    key: '5',
    nome: 'Fernanda Costa Ribeiro',
    cpfCns: '321.654.987-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    indicadores: ['C2'],
  },
  {
    key: '6',
    nome: 'Roberto Alves Mendes',
    cpfCns: '654.987.321-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    indicadores: ['C5'],
  },
  {
    key: '7',
    nome: 'Patrícia Souza Gomes',
    cpfCns: '147.258.369-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    indicadores: ['C6', 'C7'],
  },
  {
    key: '8',
    nome: 'Marcos Vinícius Pereira',
    cpfCns: '258.369.147-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    indicadores: ['C3', 'C4', 'C7'],
  },
];

// Sample data for Vínculo tab
const vinculoData: PessoaVinculoData[] = [
  {
    key: '1',
    nome: 'Maria da Silva Santos',
    cpfCns: '123.456.789-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    criterio: 'idoso',
    cadastroDomiciliar: true,
    cadastroIndividual: true,
    acompanhada: true,
  },
  {
    key: '2',
    nome: 'João Pedro Oliveira',
    cpfCns: '987.654.321-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    criterio: 'sem_criterio',
    cadastroDomiciliar: true,
    cadastroIndividual: false,
    acompanhada: false,
  },
  {
    key: '3',
    nome: 'Ana Carolina Ferreira',
    cpfCns: '456.789.123-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    criterio: 'idoso',
    cadastroDomiciliar: true,
    cadastroIndividual: true,
    acompanhada: true,
  },
  {
    key: '4',
    nome: 'Carlos Eduardo Lima',
    cpfCns: '789.123.456-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    criterio: 'sem_criterio',
    cadastroDomiciliar: false,
    cadastroIndividual: true,
    acompanhada: false,
  },
  {
    key: '5',
    nome: 'Fernanda Costa Ribeiro',
    cpfCns: '321.654.987-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    criterio: 'idoso',
    cadastroDomiciliar: true,
    cadastroIndividual: true,
    acompanhada: true,
  },
  {
    key: '6',
    nome: 'Roberto Alves Mendes',
    cpfCns: '654.987.321-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    criterio: 'sem_criterio',
    cadastroDomiciliar: true,
    cadastroIndividual: true,
    acompanhada: false,
  },
  {
    key: '7',
    nome: 'Patrícia Souza Gomes',
    cpfCns: '147.258.369-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    criterio: 'idoso',
    cadastroDomiciliar: false,
    cadastroIndividual: false,
    acompanhada: false,
  },
  {
    key: '8',
    nome: 'Marcos Vinícius Pereira',
    cpfCns: '258.369.147-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    criterio: 'sem_criterio',
    cadastroDomiciliar: true,
    cadastroIndividual: true,
    acompanhada: true,
  },
];

// Status tag component
const StatusTag: React.FC<{ 
  label: string; 
  variant: 'success' | 'error' | 'default' | 'info';
}> = ({ label, variant }) => {
  const variantClasses = {
    success: 'bg-[#00A65A]/10 text-[#00A65A] border-[#00A65A]/20',
    error: 'bg-[#DD4B39]/10 text-[#DD4B39] border-[#DD4B39]/20',
    default: 'bg-muted text-muted-foreground border-border',
    info: 'bg-[#3C8DBC]/10 text-[#3C8DBC] border-[#3C8DBC]/20',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${variantClasses[variant]}`}>
      {label}
    </span>
  );
};

// Columns for Qualidade tab
const qualidadeColumns: ColumnsType<PessoaQualidadeData> = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    width: '25%',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
  },
  {
    title: 'CPF/CNS',
    dataIndex: 'cpfCns',
    key: 'cpfCns',
    width: '15%',
  },
  {
    title: 'Equipe de saúde',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '20%',
    filters: [
      { text: 'Equipe 001 - ESF', value: 'Equipe 001 - ESF' },
      { text: 'Equipe 002 - ESF', value: 'Equipe 002 - ESF' },
      { text: 'Equipe 003 - eAP', value: 'Equipe 003 - eAP' },
    ],
    onFilter: (value, record) => record.equipe === value,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '15%',
    filters: [
      { text: 'UBS Centro', value: 'UBS Centro' },
      { text: 'UBS Norte', value: 'UBS Norte' },
      { text: 'UBS Sul', value: 'UBS Sul' },
    ],
    onFilter: (value, record) => record.unidade === value,
  },
  {
    title: 'Indicador',
    dataIndex: 'indicadores',
    key: 'indicadores',
    width: '25%',
    filters: [
      { text: 'C2', value: 'C2' },
      { text: 'C3', value: 'C3' },
      { text: 'C4', value: 'C4' },
      { text: 'C5', value: 'C5' },
      { text: 'C6', value: 'C6' },
      { text: 'C7', value: 'C7' },
    ],
    onFilter: (value, record) => record.indicadores.includes(value as string),
    render: (indicadores: string[]) => (
      <div className="flex flex-wrap gap-1">
        {indicadores.map((ind) => (
          <span
            key={ind}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground"
          >
            {ind}
          </span>
        ))}
      </div>
    ),
  },
];

// Columns for Vínculo tab
const vinculoColumns: ColumnsType<PessoaVinculoData> = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    width: '22%',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
  },
  {
    title: 'CPF/CNS',
    dataIndex: 'cpfCns',
    key: 'cpfCns',
    width: '13%',
  },
  {
    title: 'Equipe de saúde',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '17%',
    filters: [
      { text: 'Equipe 001 - ESF', value: 'Equipe 001 - ESF' },
      { text: 'Equipe 002 - ESF', value: 'Equipe 002 - ESF' },
      { text: 'Equipe 003 - eAP', value: 'Equipe 003 - eAP' },
    ],
    onFilter: (value, record) => record.equipe === value,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '12%',
    filters: [
      { text: 'UBS Centro', value: 'UBS Centro' },
      { text: 'UBS Norte', value: 'UBS Norte' },
      { text: 'UBS Sul', value: 'UBS Sul' },
    ],
    onFilter: (value, record) => record.unidade === value,
  },
  {
    title: 'Critério',
    dataIndex: 'criterio',
    key: 'criterio',
    width: '12%',
    align: 'center',
    filters: [
      { text: 'Idoso', value: 'idoso' },
      { text: 'Sem critério', value: 'sem_criterio' },
    ],
    onFilter: (value, record) => record.criterio === value,
    render: (criterio: 'idoso' | 'sem_criterio') => (
      <StatusTag 
        label={criterio === 'idoso' ? 'Idoso' : 'Sem critério'} 
        variant={criterio === 'idoso' ? 'info' : 'default'} 
      />
    ),
  },
  {
    title: 'Cadastro',
    key: 'cadastro',
    width: '14%',
    align: 'center',
    render: (_, record) => (
      <div className="flex flex-wrap gap-1 justify-center">
        <StatusTag 
          label="Domiciliar" 
          variant={record.cadastroDomiciliar ? 'success' : 'error'} 
        />
        <StatusTag 
          label="Individual" 
          variant={record.cadastroIndividual ? 'success' : 'error'} 
        />
      </div>
    ),
  },
  {
    title: 'Acompanhamento',
    dataIndex: 'acompanhada',
    key: 'acompanhada',
    width: '10%',
    align: 'center',
    filters: [
      { text: 'Acompanhada', value: true },
      { text: 'Não acompanhada', value: false },
    ],
    onFilter: (value, record) => record.acompanhada === value,
    render: (acompanhada: boolean) => (
      <StatusTag 
        label={acompanhada ? 'Acompanhada' : 'Não acompanhada'} 
        variant={acompanhada ? 'success' : 'error'} 
      />
    ),
  },
];

// Reusable table content component for Qualidade
const QualidadeTableContent: React.FC<{
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: PessoaQualidadeData) => void;
}> = ({ expandedRowKeys, onExpand }) => (
  <div className="rounded-lg bg-card p-4 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-muted-foreground">
        Total de registros: <strong className="text-foreground">{qualidadeData.length}</strong>
      </span>
      <Button icon={<Download className="h-4 w-4" />}>
        Exportar
      </Button>
    </div>

    <Table
      columns={qualidadeColumns}
      dataSource={qualidadeData}
      expandable={{
        expandedRowKeys,
        onExpand,
        expandedRowRender: () => (
          <div className="p-4 bg-muted/30 rounded-md">
            <span className="text-sm text-muted-foreground italic">
              Detalhes do cadastro individual (em desenvolvimento)
            </span>
          </div>
        ),
        expandIcon: ({ expanded, onExpand, record }) => (
          <button
            onClick={(e) => onExpand(record, e)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        ),
      }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
      }}
      size="middle"
    />
  </div>
);

// Reusable table content component for Vínculo
const VinculoTableContent: React.FC<{
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: PessoaVinculoData) => void;
}> = ({ expandedRowKeys, onExpand }) => (
  <div className="rounded-lg bg-card p-4 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-muted-foreground">
        Total de registros: <strong className="text-foreground">{vinculoData.length}</strong>
      </span>
      <Button icon={<Download className="h-4 w-4" />}>
        Exportar
      </Button>
    </div>

    <Table
      columns={vinculoColumns}
      dataSource={vinculoData}
      expandable={{
        expandedRowKeys,
        onExpand,
        expandedRowRender: () => (
          <div className="p-4 bg-muted/30 rounded-md">
            <span className="text-sm text-muted-foreground italic">
              Detalhes do cadastro individual (em desenvolvimento)
            </span>
          </div>
        ),
        expandIcon: ({ expanded, onExpand, record }) => (
          <button
            onClick={(e) => onExpand(record, e)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        ),
      }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
      }}
      size="middle"
    />
  </div>
);

const QualidadeIndividualizado: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedQualidadeKeys, setExpandedQualidadeKeys] = useState<string[]>([]);
  const [expandedVinculoKeys, setExpandedVinculoKeys] = useState<string[]>([]);
  
  // Get initial tab from URL params
  const initialTab = searchParams.get('tab') || 'qualidade';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update state when URL params change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['vinculo', 'qualidade'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleQualidadeExpand = (expanded: boolean, record: PessoaQualidadeData) => {
    if (expanded) {
      setExpandedQualidadeKeys([...expandedQualidadeKeys, record.key]);
    } else {
      setExpandedQualidadeKeys(expandedQualidadeKeys.filter(key => key !== record.key));
    }
  };

  const handleVinculoExpand = (expanded: boolean, record: PessoaVinculoData) => {
    if (expanded) {
      setExpandedVinculoKeys([...expandedVinculoKeys, record.key]);
    } else {
      setExpandedVinculoKeys(expandedVinculoKeys.filter(key => key !== record.key));
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', key);
    setSearchParams(newParams, { replace: true });
  };

  const renderQualidadeContent = () => (
    <div className="space-y-6">
      <FilterBar />
      <QualidadeTableContent 
        expandedRowKeys={expandedQualidadeKeys} 
        onExpand={handleQualidadeExpand} 
      />
    </div>
  );

  const renderVinculoContent = () => (
    <div className="space-y-6">
      <VinculoIndividualizadoFilterBar />
      <VinculoTableContent 
        expandedRowKeys={expandedVinculoKeys} 
        onExpand={handleVinculoExpand} 
      />
    </div>
  );

  const tabItems = [
    {
      key: 'vinculo',
      label: 'Vínculo e Acompanhamento',
      children: <div className="pt-4">{renderVinculoContent()}</div>,
    },
    {
      key: 'qualidade',
      label: 'Qualidade eSF/eAP',
      children: <div className="pt-4">{renderQualidadeContent()}</div>,
    },
  ];

  const breadcrumbLabel = activeTab === 'vinculo' ? 'Vínculo e Acompanhamento' : 'Qualidade eSF/eAP';
  const breadcrumbPath = activeTab === 'vinculo' 
    ? '/financiamento-aps/qualidade-esf-eap?tab=vinculo' 
    : '/financiamento-aps/qualidade-esf-eap?tab=qualidade';
  const relatorioPath = activeTab === 'vinculo'
    ? '/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo'
    : '/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade';

  return (
    <div>
      <PageHeader
        title="Individualizado do Financiamento APS"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: breadcrumbLabel, path: breadcrumbPath },
          { label: 'Relatório', path: relatorioPath },
          { label: 'Individualizado' },
        ]}
      />

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        size="large"
        className="financiamento-tabs"
      />
    </div>
  );
};

export default QualidadeIndividualizado;
