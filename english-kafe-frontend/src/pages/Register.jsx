import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Nav/EnglishkafeLogo-Transparent.png'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    setLoading(true)
    // Add your registration logic here
    setTimeout(() => {
      setLoading(false)
      // Redirect to login or home
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Logo and Image */}
        <div className="hidden md:flex justify-center">
          <div className="relative">
            <img 
              src="/src/assets/login/young-students-learning-together-group-study.jpg" 
              alt="English Kafé" 
              className="w-full h-screen/2 object-cover rounded-2xl"
              style={{ height: '550px' }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
            {/* Logo Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={logo} 
                alt="English Kafé Logo" 
                className="w-70 h-70 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-2 text-center">
            Create an account
          </h2>
          
          <p className="text-gray-600 mb-8 text-center">
            Please use your valid email to create an account!
          </p>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full hover:opacity-90 disabled:opacity-70 text-gray-900 font-normal py-3 rounded-lg transition-opacity"
              style={{ backgroundColor: '#F8B2C0' }}
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have account? <a href="/login" className="text-gray-900 font-semibold hover:underline">login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
