import { useState } from 'react'
import { Search, Filter, Plus, Edit, Trash2, Eye, Power } from 'lucide-react'

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const accounts = [
    { id: 1, accountNumber: 'MT5-001234', broker: 'IC Markets', server: 'Live01', platform: 'MT5', user: 'John Doe', balance: '$12,450.00', equity: '$12,580.00', status: 'active', license: 'active', eaEnabled: true },
    { id: 2, accountNumber: 'MT4-005678', broker: 'FXCM', server: 'Real3', platform: 'MT4', user: 'Sarah Smith', balance: '$8,320.00', equity: '$8,150.00', status: 'active', license: 'expiring', eaEnabled: true },
    { id: 3, accountNumber: 'MT5-009012', broker: 'Pepperstone', server: 'Edge', platform: 'MT5', user: 'Mike Johnson', balance: '$3,210.00', equity: '$3,050.00', status: 'suspended', license: 'expired', eaEnabled: false },
    { id: 4, accountNumber: 'MT5-003456', broker: 'IC Markets', server: 'Demo01', platform: 'MT5', user: 'Emma Wilson', balance: '$50,000.00', equity: '$51,200.00', status: 'demo', license: 'active', eaEnabled: true },
  ]

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'demo': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLicenseBadge = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expiring': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Accounts</h1>
            <p className="text-gray-600 mt-1">Manage trading accounts and EA licenses</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Add Account
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-500">Total Accounts</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-500">Active Accounts</p>
            <p className="text-2xl font-bold text-green-600">18</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-500">EA Enabled</p>
            <p className="text-2xl font-bold text-blue-600">15</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-500">Expiring Licenses</p>
            <p className="text-2xl font-bold text-yellow-600">3</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search by account number or user..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Brokers</option>
            <option>IC Markets</option>
            <option>FXCM</option>
            <option>Pepperstone</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Demo</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Broker/Server</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">EA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{account.accountNumber}</td>
                  <td className="px-6 py-4"><p className="text-gray-900">{account.broker}</p><p className="text-xs text-gray-500">{account.server}</p></td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded">{account.platform}</span></td>
                  <td className="px-6 py-4 text-gray-600">{account.user}</td>
                  <td className="px-6 py-4 text-gray-600">{account.balance}</td>
                  <td className="px-6 py-4 text-gray-600">{account.equity}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(account.status)}`}>{account.status}</span></td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${getLicenseBadge(account.license)}`}>{account.license}</span></td>
                  <td className="px-6 py-4">{account.eaEnabled ? <Power size={16} className="text-green-600" /> : <Power size={16} className="text-gray-400" />}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded"><Eye size={16} /></button>
                      <button className="p-1 hover:bg-gray-100 rounded"><Edit size={16} /></button>
                      <button className="p-1 hover:bg-gray-100 rounded"><Trash2 size={16} className="text-red-600" /></button>
                    </div>
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
