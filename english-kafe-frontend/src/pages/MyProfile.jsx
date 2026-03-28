import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyProfile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  
  // Get user data from localStorage
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com'
  const userName = localStorage.getItem('userName') || 'John Doe'
  const profileImage = localStorage.getItem('profileImage') || 'https://via.placeholder.com/200?text=User'

  const [formData, setFormData] = useState({
    userName: userName,
    email: userEmail,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Save to localStorage (temporarily, will be replaced with backend later)
    localStorage.setItem('userName', formData.userName)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      userName: userName,
      email: userEmail,
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="px-4 md:px-10 py-12 text-center bg-blue-50">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          My Profile
        </h1>
      </div>

      {/* Profile Content */}
      <div className="px-4 md:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              
              {/* Left Side - Profile Image */}
              <div className="flex justify-center md:justify-start">
                <img 
                  src={profileImage} 
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                />
              </div>

              {/* Divider Line */}
              <div className="hidden md:block w-1 bg-gray-300 h-64"></div>

              {/* Right Side - Personal Information */}
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Personal Information</h2>
                
                <div className="space-y-8">
                  {/* User Name */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-700 font-semibold">User name:</label>
                      {!isEditing && <span className="text-gray-900 text-lg font-medium">{formData.userName}</span>}
                    </div>
                    {isEditing && (
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-700 font-semibold">Email:</label>
                      {!isEditing && <span className="text-gray-900 text-lg font-medium">{formData.email}</span>}
                    </div>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                      Do you want to update your Email ?<br />
                      please contact our support team via LINE. <a href="#" className="text-blue-600 hover:underline font-semibold">English Kafe</a>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-6">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-12 py-3 bg-pink-300 text-gray-900 font-bold rounded-full hover:bg-pink-400 transition-colors text-lg"
                      >
                        Edit profile
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          className="px-12 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-12 py-3 bg-gray-300 text-gray-900 font-bold rounded-full hover:bg-gray-400 transition-colors text-lg"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MyProfile
