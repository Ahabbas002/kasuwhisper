import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import InstallPrompt from './InstallPrompt' // ADD THIS IMPORT
import { Menu } from 'lucide-react'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-xl shadow-soft"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Sidebar for desktop and mobile */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main layout */}
      <div className="lg:ml-64">
        <Header />
        
        <main className="px-4 py-6 max-w-7xl mx-auto animate-fade-in">
          <div className="pb-20 lg:pb-6">
            {children}
          </div>
        </main>

        {/* Bottom navigation for mobile */}
        <BottomNav />

        {/* ADD INSTALL PROMPT HERE */}
        <InstallPrompt />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default Layout