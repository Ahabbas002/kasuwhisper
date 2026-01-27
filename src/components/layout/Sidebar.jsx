import { Home, MessageSquare, Users, PlusCircle, Bell, Settings, TrendingUp, Lock, X, LogOut} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MessageSquare, label: 'Feed', path: '/feed' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ]

  const groups = [
    { name: 'Computer Science', members: 145, isPrivate: true },
    { name: 'KASU General', members: 1200, isPrivate: false },
    { name: '100L Freshers', members: 89, isPrivate: true },
    { name: 'Night Class', members: 234, isPrivate: true },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 text-green-600 font-semibold bg-white border-r border-gray-200 shadow-lg z-30">
        <SidebarContent groups={groups} navItems={navItems} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-white z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent groups={groups} navItems={navItems} onClose={onClose} isMobile />
      </aside>
    </>
  )
}

const SidebarContent = ({ navItems, onClose, isMobile }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Logo */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className='flex p-2'>
              <div className='mr-3'>
                <img src="./images/kasu-logo.jpg" alt="logo" className='h-10 w-15' />
              </div>
              <div>
                <h2 className="font-bold text-green-600 text-lg text-kasu">KASUWhisper</h2>
                <p className="text-xs text-green-500">Private & Secure</p>
              </div>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Create Post Button */}
      <div className="p-4 border-b border-gray-200 hover:bg-green-50">
        <NavLink
          to="/post"
          className="btn-primary w-full text-green-600 flex"
          onClick={isMobile ? onClose : undefined}
        >
          <PlusCircle className="w-5 h-5 mr-2 text-green-600" />
          New Whisper
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'text-white bg-green-500 p-3 rounded-lg flex' : 'p-3 rounded-lg flex hover:bg-green-50'}`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          onClick={isMobile ? onClose : undefined}
        >
          <Settings className="w-5 h-5 text-green-600" />
          <span className="font-medium">Settings</span>
        </NavLink>
        
        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-red-600 w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Clear Session</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar