import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock admin verification
        localStorage.setItem('adminLoggedIn', 'true')
        localStorage.setItem('adminEmail', email)
        localStorage.setItem('adminName', email.split('@')[0])
        localStorage.setItem('adminProfileImage', `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`)
        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'))
        // Navigate to dashboard
        navigate('/')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        
        {/* Left Side - Logo and Image */}
        <div className="hidden md:flex justify-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop" 
              alt="Admin Dashboard" 
              className="w-full object-cover rounded-2xl"
              style={{ height: '500px' }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
            {/* Logo Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-white text-4xl font-bold drop-shadow-lg">English Kafé</h1>
                <p className="text-white text-lg drop-shadow-lg mt-2">Admin Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-2 leading-tight">
            Welcome back to <span className="font-bold">English Kafé !</span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
            Please enter your admin credentials to log in
          </p>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
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

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-50 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-gray-700 text-xs sm:text-sm hover:text-gray-900 transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full hover:opacity-90 disabled:opacity-70 text-gray-900 font-normal py-2 sm:py-3 rounded-lg transition-opacity text-sm sm:text-base"
              style={{ backgroundColor: '#F8B2C0' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs sm:text-sm text-gray-700 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Email: admin@example.com</p>
            <p className="text-xs text-gray-600">Password: (any value)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
