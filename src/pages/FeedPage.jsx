import { useState, useEffect } from 'react'
import PostCard from '../components/feed/PostCard'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { mockPosts } from '../data/mockData'

const FeedPage = () => {
  const [posts, setPosts] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Initialize data
  useEffect(() => {
    try {
      setPosts(mockPosts || [])
    } catch (error) {
      console.error('Error loading mock data:', error)
      setPosts([])
    }
  }, [])

  const handleReact = (postId, reaction) => {
    console.log(`Reacted ${reaction} to post ${postId}`)
  }

  const handleComment = (postId, comment) => {
    console.log(`Commented on post ${postId}:`, comment)
  }

  const handleShare = (postId) => {
    console.log(`Sharing post ${postId}`)
  }

  return (
    <div className="animate-fade-in min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Whispers Feed</h1>
        <p className="text-gray-600">Anonymous conversations from KASU students</p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Posts Column */}
        <div className="lg:col-span-2">
          {/* Mobile Stats Banner */}
          {isMobile && (
            <div className="mb-6 shadow-lg">
              <div className="bg-green-600 rounded-xl p-4 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,245</div>
                    <div className="text-sm opacity-90">Active Whispers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">1.2K</div>
                    <div className="text-sm opacity-90">Total Users</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onReact={(reaction) => handleReact(post.id, reaction)}
                  onComment={(comment) => handleComment(post.id, comment)}
                  onShare={() => handleShare(post.id)}
                  isMobile={isMobile}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No whispers yet. Be the first to post!
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button size="large" className='shadow-2xl bg-green-600 hover:bg-green-700 text-white'>
              Load More Whispers
            </Button>
          </div>
        </div>

        {/* Sidebar - Hidden on Mobile */}
        <div className="hidden lg:block space-y-6">

          {/* Campus Stats Card */}
          <Card className='shadow-lg'>
            <h3 className="font-bold text-lg mb-4 text-green-600">Campus Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Active Whispers', value: '1,245' },
                { label: "Today's Whispers", value: '42' },
                { label: 'Total Users', value: '1.2K' },
                { label: 'Active Groups', value: '24' }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">{stat.label}</span>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tips Card */}
          <Card className='shadow-lg'>
            <h3 className="font-bold text-lg mb-4 text-green-600">Whisper Tips</h3>
            <ul className="space-y-3">
              {[
                'Stay respectful even when anonymous',
                'Use tags to reach the right audience',
                'Report inappropriate content immediately',
                'Join groups for department-specific discussions'
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5 shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Mobile-Only Sections */}
      {isMobile && (
        <>

          {/* Mobile Tips */}
          <div className="mt-6 mb-6 shadow-lg">
            <Card>
              <h3 className="font-semibold text-lg mb-4">Whisper Tips</h3>
              <ul className="space-y-3">
                {[
                  'Stay respectful even when anonymous',
                  'Use tags to reach the right audience',
                  'Report inappropriate content immediately',
                  'Join groups for department-specific discussions'
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5 shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

        </>
      )}
    </div>
  )
}

export default FeedPage