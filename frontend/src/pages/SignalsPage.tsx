import { useState } from 'react'
import { Search, Send, Edit, Trash2, Plus, Radio, Zap } from 'lucide-react'

export default function SignalsPage() {
  const [selectedType, setSelectedType] = useState('all')
  
  const signals = [
    { id: 1, symbol: 'EUR/USD', type: 'BUY', entry: 1.0950, sl: 1.0920, tp1: 1.0980, tp2: 1.1020, status: 'sent', channel: 'Forex Signals', sentAt: '2024-01-20 10:30', recipients: 456 },
    { id: 2, symbol: 'XAU/USD', type: 'SELL', entry: 2015.50, sl: 2025.00, tp1: 2005.00, tp2: 1995.00, status: 'pending', channel: 'Gold Signals', sentAt: '-', recipients: 0 },
    { id: 3, symbol: 'GBP/JPY', type: 'BUY', entry: 185.50, sl: 184.80, tp1: 186.50, tp2: 187.00, status: 'draft', channel: 'Forex Signals', sentAt: '-', recipients: 0 },
    { id: 4, symbol: 'BTC/USD', type: 'BUY', entry: 42500, sl: 42000, tp1: 43500, tp2: 44500, status: 'sent', channel: 'Crypto Signals', sentAt: '2024-01-20 09:15', recipients: 234 },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Signals</h1>
            <p className="text-gray-600 mt-1">Create and manage trading signals</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Create Signal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Today's Signals</p>
              <Radio size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Success Rate</p>
              <Zap size={20} className="text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">72%</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Pending Signals</p>
              <Send size={20} className="text-orange-600" />
            </div>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total This Month</p>
              <Radio size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold">342</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search signals..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="forex">Forex</option>
            <option value="gold">Gold</option>
            <option value="crypto">Crypto</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Draft</option>
            <option>Pending</option>
            <option>Sent</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {signals.map((signal) => (
          <div key={signal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${signal.status === 'sent' ? 'bg-green-500' : signal.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                <h3 className="text-lg font-semibold text-gray-900">{signal.symbol}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded ${signal.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {signal.type}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${signal.status === 'sent' ? 'bg-green-100 text-green-800' : signal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                {signal.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Entry</p>
                <p className="font-medium">{signal.entry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Stop Loss</p>
                <p className="font-medium text-red-600">{signal.sl}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Take Profit 1</p>
                <p className="font-medium text-green-600">{signal.tp1}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Take Profit 2</p>
                <p className="font-medium text-green-600">{signal.tp2 || '-'}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Channel: {signal.channel}</span>
              {signal.recipients > 0 && <span>Sent to {signal.recipients} users</span>}
              {signal.sentAt !== '-' && <span>Sent: {signal.sentAt}</span>}
            </div>
            
            <div className="flex space-x-2">
              {(signal.status === 'draft' || signal.status === 'pending') && (
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                  <Send size={16} className="mr-2" />
                  Send Now
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Edit size={16} />
              </button>
              <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}