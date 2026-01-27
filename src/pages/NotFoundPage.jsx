import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, AlertCircle } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="h-full flex items-center justify-center px-2 py-15">
      <div className="max-w-lg w-full mx-auto text-center">
        
        {/* Error Code */}
        <div className="relative mb-5">
          <div className="inline-flex items-center justify-center mb-5">
            <div className="relative">
              <div className="w-30 h-30 bg-green-600 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white text-5xl font-bold">404</span>
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-5">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            to="/"
            className="flex-1 max-w-xs mx-auto sm:mx-0"
          >
            <button className="w-full py-3 px-6 shadow-lg bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Go to Homepage
            </button>
          </Link>
          
          <Link 
            to="/feed"
            className="flex-1 max-w-xs mx-auto sm:mx-0"
          >
            <button className="w-full py-3 px-6 shadow-lg border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 font-medium transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              View Feed
            </button>
          </Link>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="text-green-600 hover:text-green-700 font-medium transition-colors mb-5"
        >
          ← Go Back
        </button>

        {/* Footer Note */}
        <p className="mt-5 text-sm text-gray-500">
          KASUWhisper • Anonymous Campus Platform
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage