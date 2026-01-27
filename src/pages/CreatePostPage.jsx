import { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Eye, 
  EyeOff, 
  Hash, 
  Users, 
  X, 
  AlertCircle, 
  Lock, 
  Tag, 
  Clock,
  Sparkles,
  Palette,
  Target,
  Zap,
  Shield,
  Brain,
  TrendingUp,
  Globe,
  ChevronRight,
  CheckCircle,
  Mic,
  Image,
  Smile,
  BarChart,
  MessageCircle,
  HelpCircle,
  Megaphone
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CreatePostPage = () => {
  const navigate = useNavigate()
  const textareaRef = useRef(null)
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [postType, setPostType] = useState('regular')
  const [showInspiration, setShowInspiration] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)

  const postTypes = [
    { id: 'regular', label: 'Regular', icon: MessageCircle, color: 'bg-green-600' },
    { id: 'question', label: 'Question', icon: HelpCircle, color: 'bg-green-700' },
    { id: 'announcement', label: 'Announcement', icon: Megaphone, color: 'bg-green-800' },
  ]

  const inspirations = [
    { text: "Just aced my exams! Anyone else feeling relieved? 🎉", type: 'announcement' },
    { text: "Looking for study buddies for the next semester. Computer Science department, anyone?", type: 'question' },
    { text: "The campus WiFi needs serious improvement. Is it just me?", type: 'regular' },
    { text: "Beautiful sunset at the campus garden today! 🌅", type: 'regular' },
    { text: "What's everyone's favorite spot to study on campus?", type: 'question' },
  ]

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log('Post submitted:', { content, isAnonymous, selectedGroup, tags, postType })
      setIsSubmitting(false)
      navigate('/feed')
    }, 1500)
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const mockGroups = [
    { id: 1, name: 'Computer Science Society', memberCount: 156, isPrivate: false, icon: '💻', color: 'bg-green-600' },
    { id: 2, name: 'Campus Innovators', memberCount: 89, isPrivate: true, icon: '🚀', color: 'bg-green-700' },
    { id: 3, name: 'Bookworms Club', memberCount: 42, icon: '📚', color: 'bg-green-800' },
    { id: 4, name: 'Mathematics Circle', memberCount: 203, icon: '🧮', color: 'bg-green-600' },
    { id: 5, name: 'Campus Sports', memberCount: 120, icon: '⚽', color: 'bg-green-700' },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-green-50">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full translate-y-48 -translate-x-48 opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-green-100 rounded-xl transition-colors group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-green-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Whisper</h1>
              <p className="text-sm text-gray-600">Share your thoughts with campus</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowInspiration(!showInspiration)}
            className="p-2.5 bg-green-100 hover:bg-green-200 rounded-xl transition-colors group"
          >
            <Sparkles className="w-5 h-5 text-green-700" />
          </button>
        </div>

        {/* Inspiration Panel */}
        {showInspiration && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-green-200 shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Need inspiration?</h3>
                </div>
                <span className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full">Suggestions</span>
              </div>
              
              <div className="space-y-3">
                {inspirations.map((insp, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setContent(insp.text)
                      setPostType(insp.type)
                      setShowInspiration(false)
                    }}
                    className="w-full text-left p-4 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-gray-800 group-hover:text-gray-900">{insp.text}</p>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Post Type Selection */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-green-600 rounded-full"></div>
              <h2 className="font-semibold text-gray-900">Post Type</h2>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPostType(type.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all shrink-0 ${
                    postType === type.id
                      ? 'border-green-600 bg-green-50 shadow-sm'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg ${type.color} flex items-center justify-center`}>
                    <type.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`font-medium ${
                    postType === type.id ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    {type.label}
                  </span>
                  {postType === type.id && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Textarea Section */}
            <div className="p-5">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value)
                    setCharacterCount(e.target.value.length)
                  }}
                  placeholder={
                    postType === 'question' 
                      ? "Ask your question anonymously..." 
                      : postType === 'announcement'
                      ? "Make an announcement to the campus..."
                      : "What's on your mind? Share it with campus..."
                  }
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 text-base resize-none min-h-25 leading-relaxed"
                  rows={3}
                />
                
                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 mt-4">
                  <button type="button" className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Mic className="w-4 h-4 text-gray-600" />
                  </button>
                  <button type="button" className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Image className="w-4 h-4 text-gray-600" />
                  </button>
                  <button type="button" className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats and Settings Bar */}
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      characterCount > 900 ? 'bg-red-500' : 
                      characterCount > 700 ? 'bg-amber-500' : 'bg-green-500'
                    }`}></div>
                    <span className={`text-sm ${
                      characterCount > 1000 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {characterCount}/1000
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">30 days</span>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700"
                >
                  {isAnonymous ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Anonymous</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Visible</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="p-5 border-t border-gray-100 space-y-6">
              {/* Group Selection */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Target Audience</h3>
                    <p className="text-sm text-gray-600">Post to specific groups (optional)</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {mockGroups.map(group => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setSelectedGroup(selectedGroup?.id === group.id ? null : group)}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        selectedGroup?.id === group.id
                          ? `${group.color} border-transparent text-white`
                          : 'bg-white border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-800'
                      }`}
                    >
                      <span className="text-lg">{group.icon}</span>
                      <span className="font-medium text-sm">{group.name}</span>
                      {selectedGroup?.id === group.id && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </button>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => setShowGroupModal(true)}
                    className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 rounded-lg text-gray-600 hover:text-green-700 transition-all"
                  >
                    <span className="text-lg">+</span>
                    <span className="font-medium text-sm">More</span>
                  </button>
                </div>
              </div>

              {/* Tags Input */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                    <Hash className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Add Tags</h3>
                    <p className="text-sm text-gray-600">Increase visibility with relevant tags</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Type and press Enter..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="group inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 border border-green-200 rounded-full"
                      >
                        <span className="text-green-800 font-medium">#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-green-800" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Privacy & Guidelines */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">Privacy & Guidelines</h4>
                    <ul className="space-y-1.5 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Your post will be anonymous</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Auto-deletes after 30 days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Be respectful to others</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/feed')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={!content.trim() || characterCount > 1000 || isSubmitting}
                  className={`group flex-1 px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                    !content.trim() || characterCount > 1000
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span>Post Whisper</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Spacer for fixed button */}
        <div className="h-28"></div>
      </div>

      {/* Group Selection Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowGroupModal(false)}
          ></div>
          
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Select Audience</h3>
                  <p className="text-sm text-gray-600">Choose where your whisper will appear</p>
                </div>
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-3">
                {mockGroups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => {
                      setSelectedGroup(group)
                      setShowGroupModal(false)
                    }}
                    className="w-full p-4 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${group.color}`}>
                        <span className="text-xl">{group.icon}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-green-800">
                            {group.name}
                          </h4>
                          {group.isPrivate && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              <Lock className="w-3 h-3 inline mr-1" />
                              Private
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{group.memberCount} members</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Active
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="w-full py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatePostPage