import React from 'react';
import gestanteIcon from '@/assets/gestante-icon.svg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

const riskData = [
  { name: 'Município', habitual: 54, intermediario: 11, alto: 20 },
];

const faixaEtariaData = [
  { faixa: '14 anos ou menos', habitual: 0, intermediario: 0, alto: 0 },
  { faixa: '15-19 anos', habitual: 6, intermediario: 2, alto: 4 },
  { faixa: '20-24 anos', habitual: 14, intermediario: 4, alto: 2 },
  { faixa: '25-29 anos', habitual: 13, intermediario: 1, alto: 5 },
  { faixa: '30-34 anos', habitual: 16, intermediario: 2, alto: 7 },
  { faixa: '35-39 anos', habitual: 3, intermediario: 1, alto: 3 },
  { faixa: '40-44 anos', habitual: 1, intermediario: 1, alto: 0 },
  { faixa: '45-49 anos', habitual: 0, intermediario: 0, alto: 0 },
  { faixa: '50 anos ou mais', habitual: 0, intermediario: 0, alto: 0 },
];

const idadeGestacionalData = [
  { faixa: '1 a 8 semanas', habitual: 4, intermediario: 1, alto: 1 },
  { faixa: '9 a 12 semanas', habitual: 3, intermediario: 1, alto: 3 },
  { faixa: '13 a 16 semanas', habitual: 5, intermediario: 2, alto: 2 },
  { faixa: '17 a 21 semanas', habitual: 10, intermediario: 1, alto: 5 },
  { faixa: '22 a 27 semanas', habitual: 10, intermediario: 3, alto: 3 },
  { faixa: '28 a 31 semanas', habitual: 6, intermediario: 1, alto: 5 },
  { faixa: '32 a 36 semanas', habitual: 8, intermediario: 1, alto: 2 },
  { faixa: '37 a 39 semanas', habitual: 4, intermediario: 1, alto: 1 },
  { faixa: '40 a 42 semanas', habitual: 2, intermediario: 1, alto: 0 },
];

const planejamentoData = [
  { name: 'Gestantes planejadas', value: 63, color: 'hsl(var(--primary))' },
  { name: 'Gestantes não planejadas', value: 22, color: 'hsl(280, 60%, 70%)' },
  { name: 'Sem registro da informação', value: 0, color: 'hsl(var(--muted-foreground))' },
];

const racaCorData = [
  { raca: 'Não informada', quantidade: 3 },
  { raca: 'Branca', quantidade: 60 },
  { raca: 'Preta', quantidade: 12 },
  { raca: 'Parda', quantidade: 8 },
  { raca: 'Amarela', quantidade: 1 },
  { raca: 'Indígena', quantidade: 1 },
];

const RISK_COLORS = {
  habitual: 'hsl(142, 71%, 45%)',
  intermediario: 'hsl(38, 92%, 50%)',
  alto: 'hsl(0, 84%, 60%)',
};

const comparativoGeo = [
  { label: 'Município', value: 225 },
  { label: 'Regional', value: 1435 },
  { label: 'Estado', value: 55796 },
];
const maxGeo = Math.max(...comparativoGeo.map((g) => g.value));

export const PerfilContent: React.FC = () => {
  const totalGestantes = 85;
  const partosPrevistos = 8;
  const mulheresIdadeFertil = 9881;

  return (
    <div className="space-y-6">
      {/* Top row: Total + Risk stratification */}
      <div className="space-y-4">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">
              Total de gestantes ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center gap-1">
              <img src={gestanteIcon} alt="Gestante" className="w-10 h-10" style={{ filter: 'hue-rotate(-30deg) saturate(1.5)' }} />
              <p className="text-4xl font-bold text-foreground">{totalGestantes}</p>
              <p className="text-[13px] text-muted-foreground">mulheres gestantes</p>
              <span className="inline-block mt-1 mb-3 text-[13px] font-medium px-3 py-1.5 rounded-md bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-300">
                {mulheresIdadeFertil.toLocaleString('pt-BR')} pessoas do sexo feminino com idade entre 9 e 49 anos no município
              </span>
            </div>

            {/* Comparativo geográfico */}
            <div className="space-y-2 mt-1">
              {comparativoGeo.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-[13px] text-muted-foreground w-16 text-right shrink-0">{item.label}</span>
                  <div className="flex-1 h-6 bg-muted/40 rounded overflow-hidden relative">
                    <div
                      className="h-full rounded bg-pink-300 dark:bg-pink-400/60"
                      style={{ width: `${(item.value / maxGeo) * 100}%`, minWidth: '24px' }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-foreground">
                      {item.value.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[13px] text-muted-foreground mt-3 font-medium">
              <span className="text-foreground font-bold">{partosPrevistos}</span> partos previstos para os próximos 30 dias
            </p>
            <p className="text-[12px] text-muted-foreground/70 mt-2 text-center leading-tight">
              Fonte: Atendimentos realizados por médicos e enfermeiros na APS com registro de gestação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gestantes por estratificação de risco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={riskData} layout="vertical" barSize={28}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="habitual" name="Risco habitual" stackId="a" fill={RISK_COLORS.habitual} />
                <Bar dataKey="intermediario" name="Risco intermediário" stackId="a" fill={RISK_COLORS.intermediario} />
                <Bar dataKey="alto" name="Alto risco" stackId="a" fill={RISK_COLORS.alto} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: RISK_COLORS.habitual }} /> Risco habitual</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: RISK_COLORS.intermediario }} /> Risco intermediário</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: RISK_COLORS.alto }} /> Alto risco</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gestantes por faixa etária */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Gestantes por faixa etária e estratificação de risco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={faixaEtariaData} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="faixa" width={110} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="habitual" name="Risco habitual" stackId="a" fill={RISK_COLORS.habitual} />
              <Bar dataKey="intermediario" name="Risco intermediário" stackId="a" fill={RISK_COLORS.intermediario} />
              <Bar dataKey="alto" name="Alto risco" stackId="a" fill={RISK_COLORS.alto} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gestantes por idade gestacional */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Gestantes por idade gestacional e estratificação de risco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={idadeGestacionalData} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="faixa" width={110} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="habitual" name="Risco habitual" stackId="a" fill={RISK_COLORS.habitual} />
              <Bar dataKey="intermediario" name="Risco intermediário" stackId="a" fill={RISK_COLORS.intermediario} />
              <Bar dataKey="alto" name="Alto risco" stackId="a" fill={RISK_COLORS.alto} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Planejamento gestacional + Raça/cor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Planejamento gestacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-full" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={planejamentoData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {planejamentoData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} (${((value / totalGestantes) * 100).toFixed(1)}%)`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-bold text-foreground">{totalGestantes}</p>
                  <p className="text-[13px] text-muted-foreground">gestantes</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-[13px] text-muted-foreground">
                {planejamentoData.map((d, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gestantes por raça/cor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={racaCorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="raca" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="hsl(280, 60%, 70%)" radius={[4, 4, 0, 0]} barSize={40}>
                  {racaCorData.map((_, i) => (
                    <Cell key={i} fill="hsl(280, 60%, 70%)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
