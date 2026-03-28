import { BookOpen, FileText, Users, CreditCard, Edit, Trash2, Eye } from 'lucide-react'

function Dashboard() {
  const stats = [
    { 
      label: 'Course', 
      value: '12', 
      icon: BookOpen,
      lastUpdated: 'Last created: 20 days ago'
    },
    { 
      label: 'Blog', 
      value: '16', 
      icon: FileText,
      lastUpdated: 'Last created: 2 days ago'
    },
    { 
      label: 'User', 
      value: '74', 
      icon: Users,
      lastUpdated: 'Last joined: 20 days ago'
    },
    { 
      label: 'Payment', 
      value: '33', 
      icon: CreditCard,
      lastUpdated: 'Last Reviewed: 20 days ago'
    },
  ]

  const recentUsers = [
    { id: 1, name: 'Alex James', email: 'alexjames123@gmail.com', dateCreated: '21 Mar 2026', purchasedCourse: 'N/A' },
    { id: 2, name: 'Adrian', email: 'adrian884@gmail.com', dateCreated: '21 Mar 2026', purchasedCourse: 'N/A' },
    { id: 3, name: 'Sophia', email: 'sophia663@gmail.com', dateCreated: '22 Mar 2026', purchasedCourse: 'N/A' },
    { id: 4, name: 'Olivia', email: 'olivia333@gmail.com', dateCreated: '23 Mar 2026', purchasedCourse: 'N/A' },
    { id: 5, name: 'Daniel', email: 'daniel89@gmail.com', dateCreated: '28 Mar 2026', purchasedCourse: 'N/A' },
  ]

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">English kafe Administration Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-pink-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-pink-200 rounded-lg shrink-0">
                  <Icon size={20} className="sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{stat.label}</h3>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.lastUpdated}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Joined Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-pink-100 border-b border-pink-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Joined:</h2>
        </div>

        {/* Table - Responsive */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-pink-50 border-b border-pink-200">
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Name</th>
                <th className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Email</th>
                <th className="hidden md:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Date created</th>
                <th className="hidden lg:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Purchased Course</th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={user.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-pink-50 transition-colors`}>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-xs sm:text-sm font-semibold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.name}</span>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 truncate">{user.email}</td>
                  <td className="hidden md:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{user.dateCreated}</td>
                  <td className="hidden lg:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{user.purchasedCourse}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg transition-colors" title="View user">
                        <Eye size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
                      </button>
                      <button className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete user">
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px] text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
