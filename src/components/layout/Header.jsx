import { Shield, User } from 'lucide-react'
import { useState } from 'react'
import NotificationBell from './NotificationBell'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-kasu to-kasu-light flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-600">KASUWhisper</h1>
                <p className="text-xs text-gray-500">Anonymous Campus Voice</p>
              </div>
            </div>
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="ml-10 flex items-center justify-center">
                <img src="./images/kasu-logo.jpg" alt="logo" className='h-5 w-8' />
              </div>
              <span className="font-bold text-green-600">KASUWhisper</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Desktop Notifications */}
            <div className="hidden lg:flex">
              <NotificationBell />
            </div>

            {/* Mobile Notifications */}
            <div className="lg:hidden">
              <NotificationBell />
            </div>

            {/* User Anonymous Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-green-600">Anonymous User</p>
                <p className="text-xs text-gray-500">KASU Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header