import { Plus, Trash2, Eye, EyeOff, X, Check } from 'lucide-react'
import { useState } from 'react'
import ConfirmationModal from '../../components/ConfirmationModal'

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex James',
      email: 'alexjame123@gmail.com',
      dateCreated: '21 Mar 2026',
      purchasedCourses: [],
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Adrian',
      email: 'adrian894@gmail.com',
      dateCreated: '21 Mar 2026',
      purchasedCourses: [],
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Sophia',
      email: 'sophia463@gmail.com',
      dateCreated: '22 Mar 2026',
      purchasedCourses: [],
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    {
      id: 4,
      name: 'Olivia',
      email: 'olivia1333@gmail.com',
      dateCreated: '25 Mar 2026',
      purchasedCourses: [],
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1517841905240-5628cf814f1b?w=150&h=150&fit=crop'
    },
    {
      id: 5,
      name: 'Daniel',
      email: 'daniel983@gmail.com',
      dateCreated: '28 Mar 2026',
      purchasedCourses: [],
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
  ])

  // Get all available courses
  const defaultCourses = [
    { id: 1, title: 'IELTS Writing' },
    { id: 2, title: 'IELTS Reading' },
    { id: 3, title: 'Everyday English' },
    { id: 4, title: 'Grammar Essential' },
    { id: 5, title: 'Master English Communication' },
    { id: 6, title: 'Grammar Foundation' },
  ]

  const customUsers = JSON.parse(localStorage.getItem('users')) || []
  const allUsers = [...users, ...customUsers]

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedUser, setExpandedUser] = useState(null)
  const [addCourseModalOpen, setAddCourseModalOpen] = useState(false)
  const [selectedUserForCourse, setSelectedUserForCourse] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([])

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    const updatedUsers = allUsers.filter(user => user.id !== selectedUserId)
    
    // Save only custom users (non-default ones) to localStorage
    const customUsers = updatedUsers.filter(user => user.id > 5)
    localStorage.setItem('users', JSON.stringify(customUsers))
    
    setUsers(updatedUsers.filter(user => user.id <= 5))
    setDeleteModalOpen(false)
    setSelectedUserId(null)
  }

  const handleDeactivateClick = (userId) => {
    setSelectedUserId(userId)
    setDeactivateModalOpen(true)
  }

  const handleConfirmDeactivate = () => {
    const updatedAllUsers = allUsers.map(user =>
      user.id === selectedUserId
        ? { ...user, isActive: !user.isActive }
        : user
    )

    // Update custom users in localStorage
    const updatedCustomUsers = updatedAllUsers.filter(u => u.id > 5)
    localStorage.setItem('users', JSON.stringify(updatedCustomUsers))

    // Update default users state
    setUsers(updatedAllUsers.filter(u => u.id <= 5))
    
    setDeactivateModalOpen(false)
    setSelectedUserId(null)
  }

  const handleOpenAddCourseModal = (user) => {
    setSelectedUserForCourse(user)
    setSelectedCourses(user.purchasedCourses || [])
    setAddCourseModalOpen(true)
  }

  const handleAddCourseToUser = () => {
    // Update the user with selected courses
    const updatedAllUsers = allUsers.map(u => 
      u.id === selectedUserForCourse.id 
        ? { ...u, purchasedCourses: selectedCourses }
        : u
    )
    
    // Update custom users in localStorage if they exist
    const updatedCustomUsers = updatedAllUsers.filter(u => u.id > 5)
    localStorage.setItem('users', JSON.stringify(updatedCustomUsers))
    
    // Update default users state
    setUsers(updatedAllUsers.filter(u => u.id <= 5))
    
    setAddCourseModalOpen(false)
    setSelectedCourses([])
    setSelectedUserForCourse(null)
  }

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const getCourseTitles = (courseIds) => {
    return courseIds
      .map(id => defaultCourses.find(c => c.id === id)?.title)
      .filter(Boolean)
      .join(', ')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Manage user</h1>
        
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <svg className="absolute right-3 top-2.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Users Table - Responsive */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-pink-200 border-b border-pink-300">
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Name</th>
              <th className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Email</th>
              <th className="hidden md:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Date created</th>
              <th className="hidden lg:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Purchased Course</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className={`border-b border-gray-200 transition-colors ${user.isActive ? 'hover:bg-gray-50' : 'bg-gray-100 opacity-60'}`}>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ${!user.isActive ? 'opacity-50' : ''}`}
                      />
                      {!user.isActive && (
                        <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">×</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className={`font-medium text-xs sm:text-sm truncate block ${user.isActive ? 'text-gray-900' : 'text-gray-500'}`}>{user.name}</span>
                      {!user.isActive && <div className="text-xs text-red-500 font-semibold">Inactive</div>}
                    </div>
                  </div>
                </td>
                <td className={`hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm truncate ${user.isActive ? 'text-gray-700' : 'text-gray-400'}`}>{user.email}</td>
                <td className={`hidden md:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm ${user.isActive ? 'text-gray-700' : 'text-gray-400'}`}>{user.dateCreated}</td>
                <td className={`hidden lg:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm ${user.isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                  <div className="flex items-center gap-2">
                    <span>
                      {user.purchasedCourses && user.purchasedCourses.length > 0
                        ? getCourseTitles(user.purchasedCourses)
                        : 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={() => handleOpenAddCourseModal(user)}
                      disabled={!user.isActive}
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors shrink-0 ${user.isActive ? 'bg-gray-800 text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      title="Add Course"
                    >
                      <Plus size={14} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <button
                      onClick={() => handleDeactivateClick(user.id)}
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors shrink-0 ${user.isActive ? 'text-green-600 hover:bg-green-100' : 'text-red-600 hover:bg-red-100'}`}
                      title={user.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {user.isActive ? <Eye size={14} className="sm:w-[18px] sm:h-[18px]" /> : <EyeOff size={14} className="sm:w-[18px] sm:h-[18px]" />}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors shrink-0"
                      title="Delete"
                    >
                      <Trash2 size={14} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        isDangerous={true}
      />

      {/* Deactivate/Activate Modal */}
      <ConfirmationModal
        isOpen={deactivateModalOpen}
        title={allUsers.find(u => u.id === selectedUserId)?.isActive ? 'Deactivate User' : 'Activate User'}
        message={allUsers.find(u => u.id === selectedUserId)?.isActive 
          ? 'Are you sure you want to deactivate this user? They will not be able to access their account.'
          : 'Are you sure you want to activate this user? They will be able to access their account again.'
        }
        confirmText={allUsers.find(u => u.id === selectedUserId)?.isActive ? 'Deactivate' : 'Activate'}
        cancelText="Cancel"
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setDeactivateModalOpen(false)}
        isDangerous={allUsers.find(u => u.id === selectedUserId)?.isActive}
      />

      {/* Add Course Modal */}
      {addCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Add {selectedUserForCourse?.name} to:</h2>
              <button
                onClick={() => setAddCourseModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 max-h-64 sm:max-h-96 overflow-y-auto">
              <div className="space-y-2 sm:space-y-3">
                {defaultCourses.map((course) => (
                  <label key={course.id} className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourseSelection(course.id)}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 rounded focus:ring-pink-300 cursor-pointer shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium flex-1">{course.title}</span>
                    {selectedCourses.includes(course.id) && (
                      <Check size={16} className="sm:w-[18px] sm:h-[18px] text-pink-500 shrink-0" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setAddCourseModalOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 font-medium text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourseToUser}
                className="flex-1 px-4 py-2 bg-pink-500 text-white font-medium text-sm rounded-lg hover:bg-pink-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
