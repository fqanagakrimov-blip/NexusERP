import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import FinancePage from './components/FinancePage'
import InventoryPage from './components/InventoryPage'
import HRPage from './components/HRPage'
import SalesPage from './components/SalesPage'
import AnalyticsPage from './components/AnalyticsPage'
import AuthPage from './components/AuthPage'
import './App.css'

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back, John 👋' },
  finance:   { title: 'Finance',   subtitle: 'Financial overview and management' },
  inventory: { title: 'Inventory', subtitle: 'Stock management and tracking' },
  hr:        { title: 'HR',        subtitle: 'Team management and workforce analytics' },
  sales:     { title: 'Sales',     subtitle: 'Pipeline management and revenue tracking' },
  analytics: { title: 'Analytics', subtitle: 'Business intelligence and performance metrics' },
  settings:  { title: 'Settings',  subtitle: 'Configure your workspace' },
  help:      { title: 'Help & Support', subtitle: 'Get assistance and documentation' },
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeModule, setActiveModule] = useState('dashboard')
  const [authenticated, setAuthenticated] = useState(false)

  const toggleTheme = () => {
    setDarkMode(prev => {
      document.documentElement.setAttribute('data-theme', !prev ? 'dark' : 'light')
      return !prev
    })
  }

  if (!authenticated) {
    return <AuthPage onLogin={() => setAuthenticated(true)} />
  }

  const pageInfo = PAGE_TITLES[activeModule] || PAGE_TITLES.dashboard

  const renderPage = () => {
    switch (activeModule) {
      case 'finance':   return <FinancePage />
      case 'inventory': return <InventoryPage />
      case 'hr':        return <HRPage />
      case 'sales':     return <SalesPage />
      case 'analytics': return <AnalyticsPage />
      default:          return <Dashboard />
    }
  }

  return (
    <div className="app-layout">
      <Sidebar active={activeModule} onNavigate={setActiveModule} />
      <div className="main-wrapper">
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
        />
        <main className="main-content" key={activeModule}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
