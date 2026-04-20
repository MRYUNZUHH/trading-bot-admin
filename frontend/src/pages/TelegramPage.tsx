import { Send, Radio, Zap, Settings, Activity } from 'lucide-react'

export default function TelegramPage() {
  const channels = [
    { id: 1, name: 'Gold Signals', type: 'gold', channelId: '-1003352199285', status: 'active', dailySignals: 3, lastSent: '10 mins ago' },
    { id: 2, name: 'Forex Signals', type: 'forex', channelId: '-1003768021784', status: 'active', dailySignals: 5, lastSent: '5 mins ago' },
    { id: 3, name: 'Options Signals', type: 'options', channelId: '-1003867870034', status: 'active', dailySignals: 2, lastSent: '1 hour ago' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Telegram Control Center</h1>
        <p className="text-gray-600 mt-1">Manage bot settings and channels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <Radio size={24} className="text-blue-600" />
            <span className="text-green-600 text-sm">● Online</span>
          </div>
          <h3 className="font-semibold">Bot Status</h3>
          <p className="text-2xl font-bold mt-2">Active</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <Send size={24} className="text-green-600" />
          </div>
          <h3 className="font-semibold">Today's Signals</h3>
          <p className="text-2xl font-bold mt-2">10</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity size={24} className="text-purple-600" />
          </div>
          <h3 className="font-semibold">Active Channels</h3>
          <p className="text-2xl font-bold mt-2">{channels.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border mb-8">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Configured Channels</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Daily Signals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {channels.map((ch) => (
                <tr key={ch.id}>
                  <td className="px-6 py-4 font-medium">{ch.name}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-gray-100 rounded">{ch.type}</span></td>
                  <td className="px-6 py-4 text-gray-600">{ch.channelId}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{ch.status}</span></td>
                  <td className="px-6 py-4">{ch.dailySignals}</td>
                  <td className="px-6 py-4 text-gray-600">{ch.lastSent}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Test</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"><Zap size={18} className="mr-2" />Test Gold Signal</button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Zap size={18} className="mr-2" />Test Forex Signal</button>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"><Zap size={18} className="mr-2" />Test Options Signal</button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"><Send size={18} className="mr-2" />Broadcast Message</button>
        </div>
      </div>
    </div>
  )
}
