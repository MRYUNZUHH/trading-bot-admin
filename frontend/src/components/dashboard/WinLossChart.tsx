import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface WinLossChartProps {
  wins?: number
  losses?: number
}

const COLORS = ['#10b981', '#ef4444']

export default function WinLossChart({ wins = 845, losses = 389 }: WinLossChartProps) {
  const data = [
    { name: 'Wins', value: wins },
    { name: 'Losses', value: losses },
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
      </PieChart>
    </ResponsiveContainer>
  )
}
