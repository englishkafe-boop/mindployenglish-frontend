import logo from "../assets/Nav/EnglishkafeLogo-Transparent.png"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const isActive = (path) => location.pathname === path
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const userName = localStorage.getItem('userName') || 'User'

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    setShowProfileMenu(false)
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-2 bg-white shadow-sm">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="English Kafe Logo" className="h-12 w-auto" />
      </div>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li 
          onClick={() => navigate('/')}
          className="text-black px-4 py-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all" 
          style={{backgroundColor: isActive('/') ? "#CDEAFA" : "transparent"}}
        >
          Home
        </li>
        <li 
          onClick={() => navigate('/courses')}
          className="text-black px-4 py-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all"
          style={{backgroundColor: isActive('/courses') ? "#CDEAFA" : "transparent"}}
        >
          Courses
        </li>
        <li 
          onClick={() => navigate('/blog')}
          className="text-black px-4 py-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all"
          style={{backgroundColor: isActive('/blog') ? "#CDEAFA" : "transparent"}}
        >
          Blogs
        </li>
        <li 
          onClick={() => navigate('/service')}
          className="text-black px-4 py-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all"
          style={{backgroundColor: isActive('/service') ? "#CDEAFA" : "transparent"}}
        >
          Services
        </li>
      </ul>

      {/* Login / Profile */}
      {!isLoggedIn ? (
        <button 
          onClick={() => navigate('/login')}
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          login
        </button>
      ) : (
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {/* Profile Image */}
            <img 
              src={localStorage.getItem('profileImage') || 'https://via.placeholder.com/40?text=User'}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              {/* Profile Header with Image */}
              <div className="px-4 py-4 border-b border-gray-200 flex items-center gap-3">
                <img 
                  src={localStorage.getItem('profileImage') || 'https://via.placeholder.com/48?text=User'}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{localStorage.getItem('userEmail')}</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  navigate('/my-profile')
                  setShowProfileMenu(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors font-medium"
              >
                My Profile
              </button>

              <button
                onClick={() => {
                  navigate('/my-courses')
                  setShowProfileMenu(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
              >
                My Courses
              </button>

              <button
                onClick={() => {
                  navigate('/my-course-order')
                  setShowProfileMenu(false)
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
              >
                My Course Order
              </button>

              <div className="border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 transition-colors font-medium"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </nav>
  )
}

export default Navbar