import { Home, MessageSquare, Users, Bell, Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MessageSquare, label: 'Feed', path: '/feed' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: Bell, label: 'Alerts', path: '/notifications' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 ${isActive ? 'text-green-600' : ''}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1 font-bold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
        
        {/* Create Post Floating Button */}
        <NavLink
          to="/post"
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-200 text-green-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-6 h-6" />
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav