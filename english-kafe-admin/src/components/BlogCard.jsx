import { Trash2, Edit2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function BlogCard({ blog, onDelete, onEdit }) {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/blog/edit/${blog.id}`)
  }

  const handleDelete = () => {
    onDelete(blog.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Blog Image */}
      <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-gray-200">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Blog Content */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Footer with Author, Date and Actions */}
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200 gap-2">
          {/* Author Logo and Date */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="/images/eklogo.png"
              alt="English Kafe"
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            />
            <div className="flex flex-col gap-0 min-w-0">
              <span className="text-xs font-semibold text-gray-900 truncate">{blog.author}</span>
              <span className="text-xs text-gray-500">{blog.date}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handleEdit}
              className="flex items-center justify-center bg-gray-100 text-gray-700 p-1.5 sm:p-2 rounded hover:bg-gray-200 transition-colors"
              title="Edit blog"
            >
              <Edit2 size={13} className="sm:w-[14px] sm:h-[14px]" />
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center bg-gray-200 text-gray-700 p-1.5 sm:p-2 rounded hover:bg-gray-300 transition-colors"
              title="Delete blog"
            >
              <Trash2 size={13} className="sm:w-[14px] sm:h-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
