import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutGrid, BookOpen, FileText, Users, CreditCard, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminName')
    localStorage.removeItem('adminProfileImage')
    // Trigger storage event
    window.dispatchEvent(new Event('storage'))
    navigate('/login')
  }

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: LayoutGrid },
    { label: 'Manage course', path: '/courses', icon: BookOpen },
    { label: 'Manage blog', path: '/blog', icon: FileText },
    { label: 'Manage user', path: '/users', icon: Users },
    { label: 'Review payment', path: '/review-payment', icon: CreditCard },
  ]

  return (
    <div className={`${isOpen ? 'w-56' : 'w-20'} bg-pink-50 flex flex-col h-screen shadow-sm border-r border-pink-100 transition-all duration-300`}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-pink-200 flex items-center justify-between gap-2">
        {isOpen ? (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src="/images/eklogo.png" alt="English Kafé" className="w-10 h-10 object-contain shrink-0" />
            <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">English Kafé</h1>
          </div>
        ) : (
          <img src="/images/eklogo.png" alt="English Kafé" className="w-10 h-10 object-contain shrink-0 mx-auto" />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-pink-200 rounded-lg transition-colors shrink-0"
          title={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-pink-200 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-pink-100'
              }`}
              title={!isOpen ? item.label : ''}
            >
              <Icon size={20} className="shrink-0" />
              {isOpen && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-pink-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-100 transition-colors"
          title={!isOpen ? 'Logout' : ''}
        >
          <LogOut size={20} className="shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
