import { useState } from 'react'
import { Search, Send, Users, Crown, Zap, Bell, Settings } from 'lucide-react'

export default function SubscriptionsPage() {
  const [selectedTab, setSelectedTab] = useState('subscribers')
  const [selectedPlan, setSelectedPlan] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  
  const subscribers = [
    { id: 1, name: 'John Doe', username: '@johntrader', plan: 'Premium', expiryDate: '2025-01-15', autoRenew: true, receiveSignals: true, receiveNews: true },
    { id: 2, name: 'Sarah Smith', username: '@sarahfx', plan: 'Pro', expiryDate: '2025-06-10', autoRenew: true, receiveSignals: true, receiveNews: false },
    { id: 3, name: 'Emma Wilson', username: '@emmafx', plan: 'Premium', expiryDate: '2024-12-18', autoRenew: false, receiveSignals: false, receiveNews: true },
  ]

  const plans = [
    { name: 'Free', users: 1234, price: '$0', features: ['3 signals/day', 'Basic support'] },
    { name: 'Premium', users: 456, price: '$49.99/mo', features: ['10 signals/day', 'Priority support', 'Advanced analytics'] },
    { name: 'Pro', users: 89, price: '$99.99/mo', features: ['Unlimited signals', '24/7 support', 'EA integration'] },
  ]

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId])
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600 mt-1">Manage subscribers, plans, and communication preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setSelectedTab('subscribers')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${selectedTab === 'subscribers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Users size={18} className="inline mr-2" />
            Subscribers
          </button>
          <button
            onClick={() => setSelectedTab('plans')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${selectedTab === 'plans' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Crown size={18} className="inline mr-2" />
            Plans
          </button>
          <button
            onClick={() => setSelectedTab('broadcast')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${selectedTab === 'broadcast' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Send size={18} className="inline mr-2" />
            Broadcast
          </button>
          <button
            onClick={() => setSelectedTab('settings')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${selectedTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Settings size={18} className="inline mr-2" />
            Settings
          </button>
        </div>
      </div>

      {selectedTab === 'subscribers' && (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Quick Actions</h3>
                <p className="text-sm text-blue-700">Send messages or manage preferences for selected subscribers</p>
              </div>
              <div className="flex space-x-3">
                <button disabled={selectedUsers.length === 0} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  <Send size={18} className="mr-2" />
                  Send Message ({selectedUsers.length})
                </button>
                <button className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  <Bell size={18} className="mr-2" />
                  Manage Notifications
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search subscribers..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="all">All Plans</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
              <option value="free">Free</option>
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <input type="checkbox" onChange={(e) => setSelectedUsers(e.target.checked ? subscribers.map(s => s.id) : [])} checked={selectedUsers.length === subscribers.length} />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscriber</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auto-Renew</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preferences</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4"><input type="checkbox" checked={selectedUsers.includes(sub.id)} onChange={() => toggleUserSelection(sub.id)} /></td>
                      <td className="px-6 py-4"><p className="font-medium">{sub.name}</p><p className="text-sm text-gray-500">{sub.username}</p></td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${sub.plan === 'Pro' ? 'bg-purple-100 text-purple-800' : sub.plan === 'Premium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{sub.plan}</span></td>
                      <td className="px-6 py-4 text-gray-600">{sub.expiryDate}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${sub.autoRenew ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{sub.autoRenew ? 'Yes' : 'No'}</span></td>
                      <td className="px-6 py-4"><div className="flex space-x-2"><span className={`text-xs ${sub.receiveSignals ? 'text-green-600' : 'text-gray-400'}`}><Zap size={14} className="inline" /> Signals</span><span className={`text-xs ${sub.receiveNews ? 'text-green-600' : 'text-gray-400'}`}><Bell size={14} className="inline" /> News</span></div></td>
                      <td className="px-6 py-4"><div className="flex space-x-2"><button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button><button className="text-green-600 hover:text-green-800 text-sm">Message</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {/* other tabs kept minimal for brevity */}
      {selectedTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-3xl font-bold my-2">{plan.price}</p>
              <p className="text-sm text-gray-500 mb-4">{plan.users} active</p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((f, j) => <li key={j} className="flex items-center text-sm"><Zap size={14} className="mr-2 text-green-500" />{f}</li>)}
              </ul>
              <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg">Edit Plan</button>
            </div>
          ))}
        </div>
      )}
      
      {selectedTab === 'broadcast' && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Send Broadcast Message</h3>
          <div className="space-y-4">
            <select className="w-full p-2 border rounded"><option>All Subscribers</option></select>
            <textarea rows={4} placeholder="Type your message..." className="w-full p-2 border rounded" />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Send Now</button>
          </div>
        </div>
      )}
      
      {selectedTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Subscription Settings</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span>Auto-assign Free Plan</span><input type="checkbox" defaultChecked /></div>
            <div className="flex justify-between"><span>Trial Period (days)</span><input type="number" defaultValue={7} className="w-20 border rounded px-2" /></div>
          </div>
        </div>
      )}
    </div>
  )
}