import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { 
  TrendingUp, Target, Activity, Users, BarChart3, Wallet, LogOut,
  LayoutDashboard, Settings, Bell, Menu, Send, CreditCard, Radio, FileText,
  Crown, AlertTriangle
} from 'lucide-react'

import UsersPage from './pages/UsersPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import TradesPage from './pages/TradesPage'
import SignalsPage from './pages/SignalsPage'
import AccountsPage from './pages/AccountsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import TelegramPage from './pages/TelegramPage'
import ChannelsPage from './pages/ChannelsPage'
import AuditPage from './pages/AuditPage'
import SettingsPage from './pages/SettingsPage'
import EquityChart from './components/dashboard/EquityChart'
import WinLossChart from './components/dashboard/WinLossChart'
import SignalsChart from './components/dashboard/SignalsChart'

const isAuthenticated = () => localStorage.getItem('accessToken') !== null

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate('/login', { replace: true }) }, [navigate])
  return isAuthenticated() ? <>{children}</> : null
}

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Trades', path: '/trades' },
    { icon: Activity, label: 'Signals', path: '/signals' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: CreditCard, label: 'Subscriptions', path: '/subscriptions' },
    { icon: Wallet, label: 'Accounts', path: '/accounts' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Send, label: 'Telegram', path: '/telegram' },
    { icon: Radio, label: 'Channels', path: '/channels' },
    { icon: FileText, label: 'Audit Logs', path: '/audit' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.href = '/#/login'
  }

  return (
    <div className={'bg-gray-900 text-white h-screen transition-all duration-300 ' + (collapsed ? 'w-20' : 'w-64') + ' flex flex-col'}>
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">TradingBot</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-800 rounded-lg"><Menu size={20} /></button>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <button key={index} onClick={() => navigate(item.path)}
            className={'w-full flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ' +
              (location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white')}>
            <item.icon size={20} />
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button onClick={handleLogout} className="flex items-center text-gray-400 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800">
          <LogOut size={20} />{!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, color = 'blue', description }: any) {
  const colors: any = { blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600', purple: 'bg-purple-50 text-purple-600', orange: 'bg-orange-50 text-orange-600', red: 'bg-red-50 text-red-600' }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={'p-3 rounded-lg ' + colors[color]}><Icon size={24} /></div>
        {trend && <span className={'text-sm font-medium ' + (trend > 0 ? 'text-green-600' : 'text-red-600')}>{trend > 0 ? '+' : ''}{trend}%</span>}
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
    </div>
  )
}

function Dashboard() {
  const stats = [
    { title: 'Total P/L', value: '$45,231.89', icon: TrendingUp, trend: 12.5, color: 'green' },
    { title: 'Win Rate', value: '68.5%', icon: Target, trend: 5.2, color: 'blue', description: '845 wins / 389 losses' },
    { title: 'Open Trades', value: '12', icon: Activity, color: 'purple' },
    { title: 'Total Trades', value: '1,234', icon: BarChart3, color: 'orange' },
    { title: 'Active Users Today', value: '342', icon: Users, trend: 8.1, color: 'blue' },
    { title: 'Premium Users', value: '234', icon: Crown, trend: 3.4, color: 'green' },
    { title: 'Active Accounts', value: '156', icon: Wallet, color: 'purple' },
    { title: 'Expiring Licenses', value: '23', icon: AlertTriangle, trend: -2.1, color: 'red' },
  ]

  const activeTrades = [
    { id: 1, symbol: 'EUR/USD', type: 'BUY', entry: 1.0950, current: 1.0975, pnl: 250.00, pnlPercent: 2.3, openTime: '2 hours ago' },
    { id: 2, symbol: 'GBP/USD', type: 'BUY', entry: 1.2650, current: 1.2630, pnl: -200.00, pnlPercent: -0.16, openTime: '1 hour ago' },
    { id: 3, symbol: 'USD/JPY', type: 'BUY', entry: 145.50, current: 146.20, pnl: 700.00, pnlPercent: 0.48, openTime: '30 mins ago' },
    { id: 4, symbol: 'BTC/USD', type: 'SELL', entry: 42500, current: 42350, pnl: 150.00, pnlPercent: 0.35, openTime: '15 mins ago' },
  ]

  const recentTrades = [
    { symbol: 'EUR/USD', type: 'BUY', entry: 1.0950, current: 1.0975, pnl: 250.00, pnlPercent: 2.3 },
    { symbol: 'XAU/USD', type: 'SELL', entry: 2015.50, current: 2010.25, pnl: 525.00, pnlPercent: 0.26 },
    { symbol: 'GBP/USD', type: 'BUY', entry: 1.2650, current: 1.2630, pnl: -200.00, pnlPercent: -0.16 },
    { symbol: 'USD/JPY', type: 'BUY', entry: 145.50, current: 146.20, pnl: 700.00, pnlPercent: 0.48 },
  ]

  const licenseAlerts = [
    { account: 'MT5-001234', user: 'John Doe', daysLeft: 3 },
    { account: 'MT4-005678', user: 'Sarah Smith', daysLeft: 7 },
    { account: 'MT5-009012', user: 'Mike Johnson', daysLeft: 1 },
  ]

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your trading overview.</p>
        </div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.slice(0, 4).map((stat, index) => <StatCard key={index} {...stat} />)}
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.slice(4, 8).map((stat, index) => <StatCard key={index} {...stat} />)}
        </div>

        {/* Charts and Active Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Equity Curve */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Equity Curve</h2>
            <EquityChart />
          </div>

          {/* Active Trades */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Trades</h2>
            <div className="space-y-3">
              {activeTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={'w-2 h-2 rounded-full ' + (trade.type === 'BUY' ? 'bg-green-500' : 'bg-red-500')} />
                    <div>
                      <p className="font-medium text-gray-900">{trade.symbol}</p>
                      <p className="text-xs text-gray-500">{trade.type} • {trade.openTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={'font-medium ' + (trade.pnl >= 0 ? 'text-green-600' : 'text-red-600')}>
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                    </p>
                    <p className={'text-xs ' + (trade.pnlPercent >= 0 ? 'text-green-600' : 'text-red-600')}>
                      {trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium">View All Trades →</button>
          </div>
        </div>

        {/* Bottom Section: Recent Trades + Side Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Trades Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Trades</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P/L</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P/L %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentTrades.map((trade, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{trade.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={'px-2 py-1 text-xs font-medium rounded ' + (trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{trade.entry}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{trade.current}</td>
                      <td className={'px-6 py-4 whitespace-nowrap font-medium ' + (trade.pnl >= 0 ? 'text-green-600' : 'text-red-600')}>
                        {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                      </td>
                      <td className={'px-6 py-4 whitespace-nowrap font-medium ' + (trade.pnlPercent >= 0 ? 'text-green-600' : 'text-red-600')}>
                        {trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Telegram Status + License Alerts */}
          <div className="space-y-6">
            {/* Telegram Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Telegram Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Connection</span>
                  <span className="flex items-center text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Channels</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Daily Signals</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Signal</span>
                  <span className="font-medium">5 mins ago</span>
                </div>
              </div>
            </div>

            {/* License Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">License Alerts</h2>
              <div className="space-y-2">
                {licenseAlerts.map((alert, index) => (
                  <div key={index} className={'p-3 rounded-lg ' + (alert.daysLeft <= 3 ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200')}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{alert.account}</span>
                      <span className={'text-xs font-medium ' + (alert.daysLeft <= 3 ? 'text-red-600' : 'text-yellow-600')}>
                        {alert.daysLeft} days left
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{alert.user}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium">View All Licenses →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Login() {
  const [email, setEmail] = useState('admin@tradingbot.com')
  const [password, setPassword] = useState('Admin123!')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const response = await fetch('https://trading-bot-admin.onrender.com/api/v1/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await response.json()
      if (response.ok) { 
        localStorage.setItem('accessToken', data.access_token)
        window.location.href = '/#/dashboard'
      } else { alert('Login failed') }
    } catch (error) { alert('Cannot connect to backend') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4"><TrendingUp className="text-white" size={32} /></div>
          <h1 className="text-2xl font-bold text-gray-900">Trading Bot Admin</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="admin@tradingbot.com" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="••••••••" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">Demo credentials pre-filled</p>
      </div>
    </div>
  )
}

function Layout({ children }: { children: React.ReactNode }) { return <div className="flex h-screen bg-gray-50"><Sidebar />{children}</div> }

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/trades" element={<ProtectedRoute><Layout><TradesPage /></Layout></ProtectedRoute>} />
          <Route path="/signals" element={<ProtectedRoute><Layout><SignalsPage /></Layout></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Layout><UsersPage /></Layout></ProtectedRoute>} />
          <Route path="/subscriptions" element={<ProtectedRoute><Layout><SubscriptionsPage /></Layout></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><Layout><AccountsPage /></Layout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Layout><AnalyticsPage /></Layout></ProtectedRoute>} />
          <Route path="/telegram" element={<ProtectedRoute><Layout><TelegramPage /></Layout></ProtectedRoute>} />
          <Route path="/channels" element={<ProtectedRoute><Layout><ChannelsPage /></Layout></ProtectedRoute>} />
          <Route path="/audit" element={<ProtectedRoute><Layout><AuditPage /></Layout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
