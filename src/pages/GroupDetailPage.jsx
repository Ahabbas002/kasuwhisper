import { useState, useEffect } from 'react'
import { Users, Lock, Globe, MessageCircle, UserPlus, Shield, ChevronLeft, MoreVertical, Send, Image, Smile, Hash, CheckCircle, X } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import PostCard from '../components/feed/PostCard'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

// Mock data inline
const mockGroups = [
  {
    id: 1,
    name: "Computer Science Society",
    memberCount: 156,
    isPrivate: false,
    description: "For CS students to discuss programming, projects, and career opportunities. Join us for hackathons, workshops, and study sessions.",
    department: "Computer Science",
    postCount: 42,
    createdAt: "2023-09-15",
    rules: [
      "Be respectful to all members",
      "No spam or self-promotion",
      "Keep discussions relevant to computer science",
      "No sharing of illegal content"
    ],
    admins: [
      { id: 1, name: "Admin 1", role: "Group Admin" },
      { id: 2, name: "Admin 2", role: "Moderator" }
    ],
    recentPosts: [
      {
        id: 1,
        content: "Anyone working on the Data Structures project? Need help with binary trees.",
        timeAgo: "2 hours ago",
        reactions: 15,
        comments: 8
      },
      {
        id: 2,
        content: "Great workshop on React Hooks yesterday! Slides are now available.",
        timeAgo: "1 day ago",
        reactions: 42,
        comments: 12
      }
    ]
  },
  {
    id: 2,
    name: "Mathematics Department",
    memberCount: 203,
    isPrivate: false,
    description: "Math enthusiasts sharing problems, solutions, and study resources. We cover everything from calculus to advanced topics.",
    department: "Mathematics",
    postCount: 67,
    createdAt: "2023-08-10",
    rules: [
      "Show your work when asking for help",
      "Respect different learning levels",
      "No posting of exam questions",
      "Keep discussions academic"
    ],
    admins: [
      { id: 1, name: "Math Admin", role: "Group Admin" }
    ]
  },
  {
    id: 3,
    name: "Campus Football Team",
    memberCount: 89,
    isPrivate: true,
    description: "Official group for campus football team members. Practice schedules, match updates, and team communications.",
    department: "Sports",
    postCount: 28,
    createdAt: "2023-10-05",
    rules: [
      "Team members only",
      "Practice schedules are mandatory",
      "Respect teammates and coaches",
      "Keep group discussions private"
    ],
    admins: [
      { id: 1, name: "Coach", role: "Coach" },
      { id: 2, name: "Captain", role: "Team Captain" }
    ]
  }
]

const GroupDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMember, setIsMember] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [newPost, setNewPost] = useState('')

  useEffect(() => {
    // Find the group by ID
    const foundGroup = mockGroups.find(g => g.id === parseInt(id))
    
    if (foundGroup) {
      setGroup(foundGroup)
      // Check if user is a member (simulated)
      setIsMember(Math.random() > 0.5) // Random for demo
    }
    
    setIsLoading(false)
  }, [id])

  const handleJoinGroup = () => {
    if (group?.isPrivate) {
      setShowJoinModal(true)
    } else {
      setIsMember(true)
      // In real app, make API call to join group
    }
  }

  const handleSubmitJoin = () => {
    if (joinCode === "KASU2024") { // Example code
      setIsMember(true)
      setShowJoinModal(false)
      setJoinCode('')
    } else {
      alert("Invalid invitation code")
    }
  }

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.trim()) return
    
    // In real app, make API call
    console.log('Post submitted:', newPost)
    setNewPost('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading group...</p>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Group not found</h2>
          <p className="text-gray-600 mb-4">The group you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/groups')}>
            Back to Groups
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/groups')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-green-600" />
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-semibold text-green-600 truncate max-w-50">
                {group.name}
              </h1>
              <p className="text-xs text-gray-500">
                {group.memberCount} members
              </p>
            </div>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Group Header Card */}
        <Card className="mb-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-600 to-green-700 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-green-600">{group.name}</h2>
                  {group.isPrivate ? (
                    <Lock className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Globe className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{group.department} • Created {group.createdAt}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{group.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{group.memberCount} members</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{group.postCount} posts</span>
              </div>
            </div>

            {!isMember ? (
              <Button
                onClick={handleJoinGroup}
                className="bg-green-600 hover:bg-green-700"
                icon={group.isPrivate ? Lock : UserPlus}
              >
                {group.isPrivate ? 'Request to Join' : 'Join Group'}
              </Button>
            ) : (
              <Button variant="outline" icon={CheckCircle} className='text-green-600 border-green-600'>
                Member
              </Button>
            )}
          </div>
        </Card>

        {/* Group Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{group.memberCount}</div>
            <div className="text-sm text-gray-600">Members</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{group.postCount}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">4.8</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>

        {/* Create Post (for members) */}
        {isMember && (
          <Card className="mb-6 shadow-lg">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-green-600 font-bold">A</span>
              </div>
              <div className="flex-1">
                <form onSubmit={handlePostSubmit}>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder={`Post to ${group.name}...`}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                        <Image className="w-4 h-4 text-green-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                        <Smile className="w-4 h-4 text-green-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                        <Hash className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                    <Button type="submit" disabled={!newPost.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Posts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-600">Recent Posts</h3>
            <Button variant="ghost" size="small" className='text-green-600'>
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {group.recentPosts?.map((post) => (
              <PostCard key={post.id} post={post} />
            )) || (
              <Card className='shadow-lg'>
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h4>
                  <p className="text-gray-600 mb-4">Be the first to post in this group!</p>
                  {isMember && (
                    <Button onClick={() => document.querySelector('textarea')?.focus()}>
                      Create First Post
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Group Rules */}
        <Card className="mb-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-600">Group Rules</h3>
          </div>
          
          <ul className="space-y-2">
            {group.rules?.map((rule, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span className="text-gray-700">{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowJoinModal(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Join Private Group</h3>
                <p className="text-sm text-gray-600">Enter invitation code to join {group.name}</p>
              </div>
              <button onClick={() => setShowJoinModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invitation Code
              </label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter code provided by admin"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Contact a group admin for the invitation code
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowJoinModal(false)}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                onClick={handleSubmitJoin}
                disabled={!joinCode.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                Join Group
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupDetailPage