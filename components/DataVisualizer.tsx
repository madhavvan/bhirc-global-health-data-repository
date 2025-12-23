import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: Array<{ name: string; value: number }>;
  color?: string;
  title?: string;
}

const DataVisualizer: React.FC<Props> = ({ data, color = '#0ea5e9', title }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-64 bg-slate-50 rounded-lg p-4 border border-slate-200">
        {title && <h4 className="text-sm font-semibold text-slate-700 mb-2 text-center">{title}</h4>}
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={data}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default DataVisualizer;
