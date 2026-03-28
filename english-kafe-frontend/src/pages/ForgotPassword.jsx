import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Nav/EnglishkafeLogo-Transparent.png'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleResetPassword = (e) => {
    e.preventDefault()
    setLoading(true)
    // Add your reset password logic here
    setTimeout(() => {
      setLoading(false)
      // Show success message or redirect
      alert('Reset link sent to your email!')
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        
        {/* Left Side - Logo and Image */}
        <div className="hidden md:flex justify-center">
          <div className="relative">
            <img 
              src="/src/assets/login/young-students-learning-together-group-study.jpg" 
              alt="English Kafé" 
              className="w-full object-cover rounded-2xl"
              style={{ height: '500px' }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
            {/* Logo Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={logo} 
                alt="English Kafé Logo" 
                className="w-52 sm:w-60 md:w-64 lg:w-70 h-52 sm:h-60 md:h-64 lg:h-70 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2 text-center leading-tight">
            Forgot your Password
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 text-center">
            Enter your registered Email to receive a reset link
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-50 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full hover:opacity-90 disabled:opacity-70 text-gray-900 font-normal py-2 sm:py-3 rounded-lg transition-opacity text-sm sm:text-base"
              style={{ backgroundColor: '#F8B2C0' }}
            >
              {loading ? 'Sending...' : 'Send Reset link'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6">
            Remember your password? <a href="/login" className="text-gray-900 font-semibold hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
