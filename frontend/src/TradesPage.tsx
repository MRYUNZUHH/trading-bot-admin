import { useState } from 'react'
import { Search, Filter, Download, TrendingUp, TrendingDown, Eye } from 'lucide-react'

export default function TradesPage() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  
  const trades = [
    { id: 1, symbol: 'EUR/USD', type: 'BUY', entry: 1.0950, exit: 1.0975, quantity: 1.0, pnl: 250.00, pnlPercent: 2.3, status: 'closed', openTime: '2024-01-20 10:30', closeTime: '2024-01-20 14:45', channel: 'Forex Signals' },
    { id: 2, symbol: 'XAU/USD', type: 'SELL', entry: 2015.50, exit: 2010.25, quantity: 0.5, pnl: 262.50, pnlPercent: 0.26, status: 'closed', openTime: '2024-01-20 09:15', closeTime: '2024-01-20 11:30', channel: 'Gold Signals' },
    { id: 3, symbol: 'GBP/USD', type: 'BUY', entry: 1.2650, exit: null, quantity: 1.0, pnl: -200.00, pnlPercent: -0.16, status: 'open', openTime: '2024-01-20 08:00', closeTime: null, channel: 'Forex Signals' },
    { id: 4, symbol: 'USD/JPY', type: 'BUY', entry: 145.50, exit: 146.20, quantity: 1.0, pnl: 700.00, pnlPercent: 0.48, status: 'closed', openTime: '2024-01-19 15:20', closeTime: '2024-01-19 18:10', channel: 'Forex Signals' },
  ]

  const stats = {
    totalTrades: 1234,
    winningTrades: 845,
    losingTrades: 389,
    winRate: 68.5,
    totalPnL: 45231.89
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trades</h1>
            <p className="text-gray-600 mt-1">View and analyze all trading activity</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={20} className="mr-2" />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-xs text-gray-500">Total Trades</p>
            <p className="text-2xl font-bold">{stats.totalTrades}</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-xs text-gray-500">Win Rate</p>
            <p className="text-2xl font-bold text-green-600">{stats.winRate}%</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-xs text-gray-500">Total P/L</p>
            <p className="text-2xl font-bold text-green-600"></p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-xs text-gray-500">Winning</p>
            <p className="text-2xl font-bold text-green-600">{stats.winningTrades}</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-xs text-gray-500">Losing</p>
            <p className="text-2xl font-bold text-red-600">{stats.losingTrades}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search by symbol..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
            <option value="all">All Trades</option>
            <option value="open">Open Only</option>
            <option value="closed">Closed Only</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P/L</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{trade.symbol}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={'flex items-center ' + (trade.type === 'BUY' ? 'text-green-600' : 'text-red-600')}>
                      {trade.type === 'BUY' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{trade.entry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{trade.exit || '-'}</td>
                  <td className={'px-6 py-4 whitespace-nowrap font-medium ' + (trade.pnl >= 0 ? 'text-green-600' : 'text-red-600')}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={'px-2 py-1 text-xs font-medium rounded-full ' + (trade.status === 'open' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800')}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{trade.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye size={18} className="text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
