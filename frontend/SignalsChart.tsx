import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface SignalsChartProps {
  data?: Array<{ name: string; signals: number; trades: number }>
}

const mockData = [
  { name: 'Mon', signals: 12, trades: 8 },
  { name: 'Tue', signals: 15, trades: 11 },
  { name: 'Wed', signals: 18, trades: 14 },
  { name: 'Thu', signals: 14, trades: 10 },
  { name: 'Fri', signals: 20, trades: 16 },
  { name: 'Sat', signals: 8, trades: 5 },
  { name: 'Sun', signals: 5, trades: 3 },
]

export default function SignalsChart({ data = mockData }: SignalsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
        />
        <Legend />
        <Bar dataKey="signals" fill="#3b82f6" name="Signals" radius={[4, 4, 0, 0]} />
        <Bar dataKey="trades" fill="#10b981" name="Trades" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
