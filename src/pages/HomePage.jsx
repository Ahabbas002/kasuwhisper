import { MessageSquare, Users, Shield, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: '100% Anonymous',
      description: 'Share freely without revealing your identity',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      bg: 'bg-blue-50',
    },
    {
      icon: MessageSquare,
      title: 'Speak Your Mind',
      description: 'Discuss campus issues, ask questions, share thoughts',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      bg: 'bg-green-50',
    },
    {
      icon: Users,
      title: 'Private Groups',
      description: 'Create exclusive groups for your class or department',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      bg: 'bg-emerald-50',
    },
    {
      icon: TrendingUp,
      title: 'Trending Topics',
      description: 'See what everyone is talking about on campus',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      bg: 'bg-orange-50',
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 shadow-lg rounded-full mb-6">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium">For KASU Students Only</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-green-600">KASUWhisper</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-sans">
          Your anonymous voice on campus. Share thoughts, ask questions, and connect with fellow students, all without revealing your identity.
        </p>
        
        <div className="flex flex-row gap-3 justify-center">
          <Link to="/post" className="flex text-gray-500 items-center bg-green-50 p-3 shadow-lg rounded-lg">
            <MessageSquare className="w-5 h-5 mr-3 text-green-600" />
            Start Whispering
          </Link>
          <Link to="/feed" className="flex text-gray-500 items-center bg-orange-50 p-3 shadow-lg rounded-lg">
            <TrendingUp className="w-5 h-5 mr-3 text-orange-600" />
            Explore Feed
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature) => (
          <div key={feature.title} className={`card animate-slide-up ${feature.bg} p-3 rounded-xl shadow-lg`}>
            <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-green-50 rounded-2xl p-8 text-green-600 mb-12 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">1.2K+</div>
            <div className="text-sm opacity-90">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">5.4K+</div>
            <div className="text-sm opacity-90">Whispers Shared</div>
          </div>
          <div>
            <div className="text-3xl font-bold">42</div>
            <div className="text-sm opacity-90">Active Groups</div>
          </div>
          <div>
            <div className="text-3xl font-bold">98%</div>
            <div className="text-sm opacity-90">Anonymous Satisfaction</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="inline-block p-1 bg-gray-50 shadow-lg rounded-2xl mb-5">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to join the conversation?</h2>
            <p className="text-gray-600 mb-6">Start whispering now, no registration required!</p>
            <Link to="/post" className="text-white font-semibold bg-green-600 rounded-lg p-3">
              Create Your First Whisper
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage