import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface EquityChartProps {
  data?: Array<{ date: string; equity: number; pnl?: number }>
}

const mockData = [
  { date: 'Apr 1', equity: 10000, pnl: 0 },
  { date: 'Apr 3', equity: 10250, pnl: 250 },
  { date: 'Apr 5', equity: 10800, pnl: 550 },
  { date: 'Apr 7', equity: 10600, pnl: -200 },
  { date: 'Apr 9', equity: 11200, pnl: 600 },
  { date: 'Apr 11', equity: 11800, pnl: 600 },
  { date: 'Apr 13', equity: 12100, pnl: 300 },
  { date: 'Apr 15', equity: 12500, pnl: 400 },
  { date: 'Apr 17', equity: 12300, pnl: -200 },
  { date: 'Apr 19', equity: 13000, pnl: 700 },
  { date: 'Apr 21', equity: 13500, pnl: 500 },
  { date: 'Apr 23', equity: 14500, pnl: 1000 },
]

export default function EquityChart({ data = mockData }: EquityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Equity']}
        />
        <Area 
          type="monotone" 
          dataKey="equity" 
          stroke="#3b82f6" 
          strokeWidth={2}
          fill="url(#colorEquity)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
