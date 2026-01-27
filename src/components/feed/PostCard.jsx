// src/components/feed/PostCard.jsx
import { useState } from 'react'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreVertical, 
  ThumbsUp, 
  ThumbsDown, 
  Bookmark,
  Flag,
  Send
} from 'lucide-react'

const PostCard = ({ post, onReact, onComment, onShare, isMobile = false }) => {
  const [showReactions, setShowReactions] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')

  const reactions = [
    { emoji: '👍', label: 'Like', color: 'text-blue-500' },
    { emoji: '❤️', label: 'Love', color: 'text-red-500' },
    { emoji: '😂', label: 'Haha', color: 'text-yellow-500' },
    { emoji: '😮', label: 'Wow', color: 'text-orange-500' },
  ]

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onComment?.(commentText)
      setCommentText('')
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center">
              <span className="text-green-600 font-bold">A</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Anonymous Student</div>
              <div className="text-sm text-gray-500">{post.timeAgo || '2h ago'}</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="flex">
                {['👍', '❤️', '😂'].map((emoji, i) => (
                  <div 
                    key={i} 
                    className="w-5 h-5 rounded-full bg-white border border-white flex items-center justify-center -ml-1 first:ml-0"
                    style={{ zIndex: 3 - i }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <span>{post.reactions || 0}</span>
            </div>
            <div>{post.comments || 0} comments</div>
            <div>{post.shares || 0} shares</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-100 pt-3">
          <div className={`flex ${isMobile ? 'flex-wrap gap-1' : 'justify-between'}`}>
            {/* React Button */}
            <div className="relative flex-1 min-w-30">
              <button
                onClick={() => setShowReactions(!showReactions)}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <ThumbsUp className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">React</span>
              </button>
            </div>

            {/* Comment Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors flex-1 min-w-30"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Comment</span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => onShare?.(post.id)}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors flex-1 min-w-30"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            {/* Comment Input */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center shrink-0">
                <span className="text-green-600 text-sm font-bold">Y</span>
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className={`p-2 rounded-full ${commentText.trim() ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400'}`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard