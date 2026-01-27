import { useState } from 'react'
import { Search, Users, Lock, Globe, Plus, UserPlus, ChevronRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import { mockGroups } from '../data/mockData'

const GroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinCode, setJoinCode] = useState('')

  // Filter groups
  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'public') return matchesSearch && !group.isPrivate
    if (filter === 'private') return matchesSearch && group.isPrivate
    if (filter === 'joined') return matchesSearch
    return matchesSearch
  })

  const joinedGroups = mockGroups.slice(0, 2)

  const handleJoinGroup = (code) => {
    console.log('Joining group with code:', code)
    // API call would go here
    setJoinCode('')
    setShowJoinModal(false)
  }

  const handleCreateGroup = () => {
    console.log('Creating new group')
    // API call would go here
    setShowCreateModal(false)
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Groups</h1>
        <p className="text-gray-600">Join department groups or create private ones</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2">
          {/* Search and Filters */}
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filter === 'all'
                      ? 'bg-green-600 text-white'
                      : 'text-green-600 border border-green-600 hover:bg-green-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('public')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                    filter === 'public'
                      ? 'bg-green-600 text-white'
                      : 'text-green-600 border border-green-600 hover:bg-green-50'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  Public
                </button>
                <button
                  onClick={() => setFilter('private')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                    filter === 'private'
                      ? 'bg-green-600 text-white'
                      : 'text-green-600 border border-green-600 hover:bg-green-50'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  Private
                </button>
                <button
                  onClick={() => setFilter('joined')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                    filter === 'joined'
                      ? 'bg-green-600 text-white'
                      : 'text-green-600 border border-green-600 hover:bg-green-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Joined
                </button>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              icon={Plus}
              onClick={() => setShowCreateModal(true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Create Group
            </Button>
            <Button
              variant="outline"
              icon={UserPlus}
              onClick={() => setShowJoinModal(true)}
              className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
            >
              Join with Code
            </Button>
          </div>

          {/* Your Groups */}
          {joinedGroups.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                Your Groups
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {joinedGroups.map((group) => (
                  <GroupCard key={group.id} group={group} isJoined={true} />
                ))}
              </div>
            </div>
          )}

          {/* All Groups */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {filter === 'all' ? 'All Groups' : 
               filter === 'public' ? 'Public Groups' :
               filter === 'private' ? 'Private Groups' : 'Your Groups'}
              <span className="text-gray-500 text-sm font-normal ml-2">
                ({filteredGroups.length})
              </span>
            </h2>
            
            {filteredGroups.length === 0 ? (
              <Card className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? `No groups match "${searchQuery}"`
                    : 'Create your first group to get started'}
                </p>
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Create Group
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Group Guidelines */}
          <Card>
            <h3 className="font-semibold text-lg mb-4">Group Guidelines</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5 shrink-0">
                  1
                </div>
                <span>Groups are for KASU students only</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5 shrink-0">
                  2
                </div>
                <span>Keep discussions respectful and relevant</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5 shrink-0">
                  3
                </div>
                <span>Private groups require invitation codes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5 shrink-0">
                  4
                </div>
                <span>Report inappropriate groups to admins</span>
              </li>
            </ul>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="font-semibold text-lg mb-4">Group Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Public Groups</span>
                </div>
                <span className="font-semibold text-green-600">
                  {mockGroups.filter(g => !g.isPrivate).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Private Groups</span>
                </div>
                <span className="font-semibold text-green-600">
                  {mockGroups.filter(g => g.isPrivate).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Total Members</span>
                </div>
                <span className="font-semibold text-green-600">
                  {mockGroups.reduce((sum, group) => sum + group.memberCount, 0)}
                </span>
              </div>
            </div>
          </Card>

          {/* Popular Departments */}
          <Card>
            <h3 className="font-semibold text-lg mb-4">Popular Departments</h3>
            <div className="space-y-3">
              {['Computer Science', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
                .map((dept) => (
                  <div
                    key={dept}
                    className="flex items-center justify-between p-3 hover:bg-green-50 rounded-xl transition-colors cursor-pointer group"
                  >
                    <span className="text-gray-700 group-hover:text-green-700">{dept}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Create Group Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Group"
        size="large"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Name
            </label>
            <input
              type="text"
              placeholder="e.g., Computer Science 2024"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your group's purpose..."
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
              <option value="">Select Department</option>
              <option value="cs">Computer Science</option>
              <option value="math">Mathematics</option>
              <option value="bio">Biology</option>
              <option value="chem">Chemistry</option>
              <option value="phy">Physics</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Privacy Settings</h4>
              <p className="text-sm text-gray-600">Choose who can join your group</p>
            </div>
            <select className="w-32 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowCreateModal(false)}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={handleCreateGroup}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Group
            </Button>
          </div>
        </div>
      </Modal>

      {/* Join Group Modal */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join Private Group"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invitation Code
            </label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter 8-character code"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-center tracking-widest"
              maxLength={8}
            />
          </div>
          
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Private Group Access</p>
                <p>You need an invitation code from a group admin to join private groups.</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowJoinModal(false)}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={() => handleJoinGroup(joinCode)}
              disabled={joinCode.length < 3}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500"
            >
              Join Group
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// Group Card Component
const GroupCard = ({ group, isJoined = false }) => {
  return (
    <Card hoverable className="h-full hover:border-green-500/30 transition-colors">
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                {group.isPrivate && (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-500">{group.department}</p>
            </div>
          </div>
          
          {group.isPrivate && !isJoined && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              Private
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-1">
          {group.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {group.memberCount} members
            </span>
            <span>{group.postCount} whispers</span>
          </div>
          {isJoined && (
            <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
              Joined
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Link
            to={`/groups/${group.id}`}
            className="flex-1 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium text-center transition-colors"
          >
            View Group
          </Link>
          {!isJoined && (
            <button className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors">
              Join
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default GroupsPage