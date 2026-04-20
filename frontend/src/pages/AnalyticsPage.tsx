import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react'

export default function AnalyticsPage() {
  const stats = [
    { title: 'Total P/L', value: '$45,231.89', change: '+12.5%', icon: TrendingUp },
    { title: 'Win Rate', value: '68.5%', change: '+5.2%', icon: Activity },
    { title: 'Active Users', value: '892', change: '+8.1%', icon: Users },
    { title: 'Total Trades', value: '1,234', change: '+15.3%', icon: BarChart3 },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg"><stat.icon size={24} className="text-blue-600" /></div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">P/L Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart3 size={48} className="text-gray-400" />
            <span className="ml-2 text-gray-500">Chart placeholder</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Win Rate by Symbol</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart3 size={48} className="text-gray-400" />
            <span className="ml-2 text-gray-500">Chart placeholder</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">User Growth</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <BarChart3 size={48} className="text-gray-400" />
          <span className="ml-2 text-gray-500">Chart placeholder</span>
        </div>
      </div>
    </div>
  )
}
