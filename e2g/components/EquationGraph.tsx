import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ReferenceDot, ReferenceLine } from 'recharts';
import type { Point } from '../types';

interface EquationGraphProps {
  data: Point[];
  roots: number[];
  vertex: Point | null;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-sm p-3 border border-slate-600 rounded-lg shadow-lg">
        <p className="label font-mono text-sky-300">{`x: ${label.toFixed(2)}`}</p>
        <p className="intro font-mono text-slate-300">{`y: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export const EquationGraph: React.FC<EquationGraphProps> = ({ data, roots, vertex }) => {
  const yDomain = useMemo(() => {
    const yValues = data.map(p => p.y);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const padding = Math.max(Math.abs(maxY - minY) * 0.1, 5);
    return [Math.floor(minY - padding), Math.ceil(maxY + padding)];
  }, [data]);
    
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 5, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.5} />
        <XAxis 
          dataKey="x" 
          type="number" 
          domain={['dataMin', 'dataMax']} 
          stroke="#94a3b8" 
          tick={{ fill: '#94a3b8' }}
          label={{ value: 'x', position: 'insideBottom', offset: -10, fill: '#cbd5e1' }}
        />
        <YAxis 
          type="number" 
          domain={yDomain} 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
          width={50}
          label={{ value: 'y', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
            wrapperStyle={{ bottom: -4 }}
            payload={[
                { value: 'Paràbola', type: 'line', color: '#38bdf8' },
                { value: 'Vèrtex', type: 'circle', color: '#10b981' },
                { value: 'Arrels', type: 'circle', color: '#f43f5e' },
            ]}
        />
        <ReferenceLine y={0} stroke="#64748b" strokeWidth={1} />
        <ReferenceLine x={0} stroke="#64748b" strokeWidth={1} />

        <Line type="monotone" dataKey="y" stroke="#38bdf8" strokeWidth={3} dot={false} name="Paràbola" />

        {vertex && <ReferenceDot x={vertex.x} y={vertex.y} r={6} fill="#10b981" stroke="#1e293b" strokeWidth={2} />}
        
        {roots.map((root, index) => (
          <ReferenceDot key={`root-${index}`} x={root} y={0} r={6} fill="#f43f5e" stroke="#1e293b" strokeWidth={2} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
