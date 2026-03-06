import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface VinculoData {
  key: string;
  equipeSaude: string;
  unidade: string;
  ine: string;
  cnes: string;
  dimensaoCadastro: Classification;
  dimensaoAcompanhamento: Classification;
  resultadoFinalNota: number;
  resultadoFinal: Classification;
}

const statusFilters = [
  { text: 'Ótimo', value: 'otimo' },
  { text: 'Bom', value: 'bom' },
  { text: 'Suficiente', value: 'suficiente' },
  { text: 'Regular', value: 'regular' },
];

const sampleData: VinculoData[] = [
  { key: '1', equipeSaude: 'Equipe 001 - ESF', unidade: 'Uaps Anisio Teixeira', ine: '0000123456', cnes: '2529181', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '2', equipeSaude: 'Equipe 002 - ESF', unidade: 'Uaps Vicentina Campos', ine: '0000234567', cnes: '2529203', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '3', equipeSaude: 'Equipe 003 - eAP', unidade: 'Uaps Gutemberg Braun', ine: '0000345678', cnes: '2482282', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4, resultadoFinal: 'regular' },
  { key: '4', equipeSaude: 'Equipe 004 - ESF', unidade: 'Uaps Fausto Freire', ine: '0000456789', cnes: '9686479', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '5', equipeSaude: 'Equipe 005 - ESF', unidade: 'Uaps Helio Goes', ine: '0000567890', cnes: '2529211', dimensaoCadastro: 'regular', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 2.5, resultadoFinal: 'regular' },
  { key: '6', equipeSaude: 'Equipe 006 - eAP', unidade: 'Uaps Licinio Nunes de Miranda', ine: '0000678901', cnes: '9129553', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '7', equipeSaude: 'Equipe 007 - ESF', unidade: 'Uaps Pontes Neto', ine: '0000789012', cnes: '9006052', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '8', equipeSaude: 'Equipe 008 - ESF', unidade: 'Uaps Fernandes Tavora', ine: '0000890123', cnes: '2528819', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4, resultadoFinal: 'regular' },
  { key: '9', equipeSaude: 'Equipe 009 - eAP', unidade: 'Uaps Virgilio Tavora', ine: '0000901234', cnes: '2415585', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '10', equipeSaude: 'Equipe 010 - ESF', unidade: 'Uaps Cdfam Gilmario Teixeira', ine: '0001012345', cnes: '0407836', dimensaoCadastro: 'regular', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 2.5, resultadoFinal: 'regular' },
];

const columns: ColumnsType<VinculoData> = [
  {
    title: 'Equipe de Saúde',
    dataIndex: 'equipeSaude',
    key: 'equipeSaude',
    render: (text: string) => <span className="font-medium">{text}</span>,
    sorter: (a, b) => a.equipeSaude.localeCompare(b.equipeSaude),
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    sorter: (a, b) => a.unidade.localeCompare(b.unidade),
  },
  {
    title: 'INE',
    dataIndex: 'ine',
    key: 'ine',
    sorter: (a, b) => a.ine.localeCompare(b.ine),
  },
  {
    title: 'CNES',
    dataIndex: 'cnes',
    key: 'cnes',
    sorter: (a, b) => a.cnes.localeCompare(b.cnes),
  },
  {
    title: 'Dimensão cadastro',
    dataIndex: 'dimensaoCadastro',
    key: 'dimensaoCadastro',
    filters: statusFilters,
    onFilter: (value, record) => record.dimensaoCadastro === value,
    sorter: (a, b) => a.dimensaoCadastro.localeCompare(b.dimensaoCadastro),
    render: (status: Classification) => <StatusBadge status={status} />,
  },
  {
    title: 'Dimensão acompanhamento',
    dataIndex: 'dimensaoAcompanhamento',
    key: 'dimensaoAcompanhamento',
    filters: statusFilters,
    onFilter: (value, record) => record.dimensaoAcompanhamento === value,
    sorter: (a, b) => a.dimensaoAcompanhamento.localeCompare(b.dimensaoAcompanhamento),
    render: (status: Classification) => <StatusBadge status={status} />,
  },
  {
    title: 'Resultado final',
    key: 'resultadoFinal',
    filters: statusFilters,
    onFilter: (value, record) => record.resultadoFinal === value,
    sorter: (a, b) => a.resultadoFinalNota - b.resultadoFinalNota,
    render: (_: unknown, record: VinculoData) => (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{record.resultadoFinalNota}</span>
        <StatusBadge status={record.resultadoFinal} />
      </div>
    ),
  },
  {
    title: 'Ação',
    key: 'acao',
    render: (_: unknown, record: VinculoData) => (
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo&equipe=${record.key}`}>
          <Button type="default" size="small">Relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/qualidade-esf-eap/individualizado?tab=vinculo&equipe=${record.key}`}>
          <Button type="default" size="small">Individualizado</Button>
        </Link>
      </div>
    ),
  },
];

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
        scroll={{ x: 1200 }}
      />
    </div>
  );
};
