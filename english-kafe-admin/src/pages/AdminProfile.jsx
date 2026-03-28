function AdminProfile() {
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@example.com'

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
          A
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrator</h2>
        <p className="text-gray-600">{adminEmail}</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default AdminProfile
