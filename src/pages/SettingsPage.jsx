import { useState } from 'react'
import { Bell, Shield, Moon, Globe, Palette, Download, Smartphone, LogOut, Save, X, User, Database, RefreshCw, Volume2, Zap } from 'lucide-react'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    reactions: true,
    comments: true,
    mentions: true,
    groups: true,
    announcements: false,
  })
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: false,
    allowMentions: true,
    allowGroupInvites: true,
    dataCollection: true,
  })
  const [showClearDataModal, setShowClearDataModal] = useState(false)
  const [showPWAInstall, setShowPWAInstall] = useState(false)

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'pwa', label: 'PWA', icon: Smartphone },
  ]

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleClearData = () => {
    console.log('Clearing all data...')
    // In real app, clear localStorage, IndexedDB, etc.
    setShowClearDataModal(false)
  }

  const handleInstallPWA = () => {
    // PWA install logic would go here
    console.log('Installing PWA...')
    setShowPWAInstall(false)
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your KASUWhisper experience</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white font-semibold'
                      : 'text-green-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content - 3/4 width */}
        <div className="lg:col-span-3 space-y-6">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <>
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-600">Account Settings</h3>
                    <p className="text-gray-600 text-sm">Manage your anonymous profile</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-green-600 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        placeholder="Anonymous Student"
                        className="w-full px-4 py-2 rounded-xl border border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                        disabled
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        All users appear as "Anonymous Student"
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-600 mb-2">
                        Department
                      </label>
                      <select className="w-full px-4 py-2 rounded-xl border border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600">
                        <option value="" selected disabled>Select your department</option>
                        <option value="cs">Computer Science</option>
                        <option value="math">Mathematics</option>
                        <option value="bio">Biology</option>
                        <option value="chem">Chemistry</option>
                        <option value="phy">Physics</option>
                        <option value="all">Multiple Departments</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Database className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-600">Data Management</h3>
                    <p className="text-gray-600 text-sm">Control your data and privacy</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl ">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800 mb-1">Your Privacy is Protected</p>
                        <p className="text-sm text-green-800">
                          We don't store personal data. All whispers are anonymous and automatically deleted after 30 days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowClearDataModal(true)}
                      className="flex-1 px-4 py-3 border border-red-600 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Clear All Data
                    </button>
                    <button className="flex-1 px-4 py-3 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Export Data
                    </button>
                  </div>
                </div>
              </Card>

              <Card className='shadow-lg'>
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Current Session</h3>
                      <p className="text-sm text-gray-600">Started 2 hours ago</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    End Session
                  </button>
                </div>
              </Card>
            </>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600">Notification Settings</h3>
                  <p className="text-gray-600 text-sm">Choose what notifications to receive</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        value ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Bell className={`w-5 h-5 ${value ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-green-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {key === 'reactions' && 'When someone reacts to your whispers'}
                          {key === 'comments' && 'When someone comments on your whispers'}
                          {key === 'mentions' && 'When someone mentions you'}
                          {key === 'groups' && 'When added to new groups'}
                          {key === 'announcements' && 'Campus announcements and updates'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Notification Settings
                </button>
              </div>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600">Privacy Settings</h3>
                  <p className="text-gray-600 text-sm">Control your privacy preferences</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {Object.entries(privacy).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        value ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Shield className={`w-5 h-5 ${value ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-green-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {key === 'showOnlineStatus' && 'Show when you were last active'}
                          {key === 'allowMentions' && 'Allow others to mention you in whispers'}
                          {key === 'allowGroupInvites' && 'Allow others to invite you to groups'}
                          {key === 'dataCollection' && 'Help improve KASUWhisper (anonymous data only)'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePrivacyToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 mb-2">Your Privacy is Protected</p>
                      <ul className="space-y-1 text-sm text-gray-500">
                        <li>• We never collect personal information</li>
                        <li>• All whispers are truly anonymous</li>
                        <li>• Data is encrypted and automatically deleted</li>
                        <li>• No tracking across other websites</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Privacy Settings
                </button>
              </div>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600">Appearance Settings</h3>
                  <p className="text-gray-600 text-sm">Customize the look and feel</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-green-600 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-600">Dark Mode</p>
                        <p className="text-sm text-gray-600">Switch between light and dark themes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        darkMode ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className={`w-full h-32 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-300 flex items-center justify-center`}>
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                          <div className={`w-24 h-3 rounded mx-auto mb-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                          <div className={`w-16 h-2 rounded mx-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        </div>
                      </div>
                      <p className="text-center text-sm text-gray-600 mt-2">
                        {darkMode ? 'Dark Theme Preview' : 'Light Theme Preview'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-green-600 rounded-xl">
                  <div className="mb-4">
                    <p className="font-medium text-green-600 mb-2">Theme Color</p>
                    <p className="text-sm text-gray-600">Choose your accent color</p>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-3">
                    {['#1e40af', '#3b82f6', '#059669', '#dc2626', '#7c3aed'].map((color) => (
                      <button
                        key={color}
                        className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-green-500 transition-colors"
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 border border-green-600 rounded-xl">
                  <div className="mb-4">
                    <p className="font-medium text-green-600 mb-2">Font Size</p>
                    <p className="text-sm text-gray-600">Adjust text size for better readability</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Small</span>
                    <input
                      type="range"
                      min="14"
                      max="18"
                      defaultValue="16"
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">Large</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Appearance Settings
                </button>
              </div>
            </Card>
          )}

          {/* PWA Settings */}
          {activeTab === 'pwa' && (
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600">PWA Settings</h3>
                  <p className="text-gray-600 text-sm">Install and manage app features</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-green-600 rounded-xl">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-600 to-green-500 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-green-600">Install KASUWhisper App</p>
                        <p className="text-sm text-gray-600">
                          Get the app experience on your device
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-600 mb-2">Benefits</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            Works offline
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            Faster loading
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            App icon on home screen
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            Push notifications
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-600 mb-2">How to Install</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>1. Click "Install App" below</li>
                          <li>2. Follow browser prompts</li>
                          <li>3. Launch from home screen</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        onClick={() => setShowPWAInstall(true)}
                        className="w-full px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Install App
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-green-600 rounded-xl">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-600">Offline Mode</p>
                        <p className="text-sm text-gray-600">Settings for using KASUWhisper offline</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-600">Cache Whispers</p>
                          <p className="text-sm text-gray-600">Store whispers for offline viewing</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-600">Auto-sync</p>
                          <p className="text-sm text-gray-600">Sync when back online</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                        </button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-600">Cache Size</p>
                            <p className="text-sm text-gray-600">45.2 MB used</p>
                          </div>
                          <button className="px-3 py-1 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium text-sm transition-colors">
                            Clear Cache
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-green-600 rounded-xl">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Volume2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-600">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications even when app is closed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-600">Status</p>
                        <p className="text-sm text-gray-600">Currently disabled</p>
                      </div>
                      <button className="px-3 py-1 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium text-sm transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Clear Data Modal */}
      <Modal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        title="Clear All Data"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-800 mb-1">Warning: This action cannot be undone</p>
                <p className="text-sm text-red-800">
                  This will delete all your whispers, comments, and preferences. You'll start fresh as a new anonymous user.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium text-gray-900">What will be deleted:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                All your whispers and comments
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                Group memberships
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                Notification history
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                App preferences and settings
              </li>
            </ul>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setShowClearDataModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleClearData}
              className="flex-1 px-4 py-3 bg-red-600 text-white hover:bg-red-700 rounded-xl font-medium transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </Modal>

      {/* PWA Install Modal */}
      <Modal
        isOpen={showPWAInstall}
        onClose={() => setShowPWAInstall(false)}
        title="Install KASUWhisper"
      >
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Install KASUWhisper App
          </h3>
          <p className="text-gray-600 mb-6">
            Get the app experience on your device
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Works Everywhere</p>
                <p className="text-sm text-gray-600">Use on any device with a browser</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Offline Access</p>
                <p className="text-sm text-gray-600">Read whispers without internet</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Instant Updates</p>
                <p className="text-sm text-gray-600">Get notifications for new whispers</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowPWAInstall(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={handleInstallPWA}
              className="flex-1 px-4 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Install Now
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Installation is free and takes only a few seconds
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default SettingsPage