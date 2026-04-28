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
  return (
    <div className="flex-1 overflow-auto bg-gray-50"><div className="p-8">
      <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900">Dashboard</h1><p className="text-gray-600 mt-1">Welcome back! Here's your trading overview.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">{stats.slice(0, 4).map((stat, index) => <StatCard key={index} {...stat} />)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{stats.slice(4, 8).map((stat, index) => <StatCard key={index} {...stat} />)}</div>
    </div></div>
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
        navigate('/dashboard', { replace: true }) 
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


