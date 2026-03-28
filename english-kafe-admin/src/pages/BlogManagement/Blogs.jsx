import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BlogCard from '../../components/BlogCard'
import ConfirmationModal from '../../components/ConfirmationModal'

function Blogs() {
  const navigate = useNavigate()

  const defaultBlogs = [
    {
      id: 1,
      title: 'How Can You Build Confidence When Speaking English in Everyday Situations?',
      excerpt: 'Practical techniques to help you communicate with confidence in everyday situations, tips...',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      author: 'English Kafe',
      date: '2/3/2025',
    },
    {
      id: 2,
      title: 'What Are Effective Ways to Remember and Use New English Vocabulary Daily?',
      excerpt: 'Discover mnemonic techniques and contextual practice methods to expand and use new English vocabulary daily...',
      image: 'https://images.unsplash.com/photo-1455849318169-8c96ae04f667?w=500&h=300&fit=crop',
      author: 'English Kafe',
      date: '2/3/2025',
    },
    {
      id: 3,
      title: 'How Should You Prepare for IELTS to Achieve Better Results with Less Stress?',
      excerpt: 'Proven preparation strategies for exam success, stress management, time management, and IELTS building techniques...',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
      author: 'English Kafe',
      date: '8/3/2025',
    },
  ]

  const [blogs, setBlogs] = useState(defaultBlogs)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState(null)

  // Load blogs from localStorage on mount
  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogs')
    if (savedBlogs) {
      const parsedBlogs = JSON.parse(savedBlogs)
      setBlogs([...defaultBlogs, ...parsedBlogs])
    }
  }, [])

  const handleDeleteClick = (id) => {
    setBlogToDelete(id)
    setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete)
      setBlogs(updatedBlogs)
      // Update localStorage
      const newBlogs = updatedBlogs.filter(b => b.id > 3)
      if (newBlogs.length > 0) {
        localStorage.setItem('blogs', JSON.stringify(newBlogs))
      } else {
        localStorage.removeItem('blogs')
      }
    }
    setShowConfirmation(false)
    setBlogToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setBlogToDelete(null)
  }

  const handleEdit = (id) => {
    navigate(`/blog/edit/${id}`)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Manage Blog</h1>
        <button
          onClick={() => navigate('/blog/add')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-pink-400 transition-colors font-medium text-sm sm:text-base"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          Add Blog
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onDelete={handleDeleteClick}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        title="Delete Blog"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDangerous={true}
      />
    </div>
  )
}

export default Blogs
