import { useNavigate } from 'react-router-dom'

function ArticleCard({ id, image, title, description, authorLogo, authorName, date }) {
  const navigate = useNavigate()

  const handleReadMore = () => {
    navigate('/blog')
  }

  return (
    <div className="border-2 border-gray-300 bg-white rounded-2xl overflow-hidden shadow-md px-2 py-2 w-80 h-110 gap-5 hover:shadow-lg transition-shadow ">
      {/* Image Container */}
      <div className="border-2 border-gray-300 relative w-full h-48 bg-gray-300 overflow-hidden rounded-xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="border-2 border-gray-300 p-5 -mx-5">
        {/* Title */}
        <h3 className="border-2 border-gray-300 text-lg font-bold text-gray-900 mb-2 line-clamp-3">
          {title}
        </h3>

        {/* Description */}
        <p className="border-2 border-gray-300 text-[#8B6F61] text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Footer - Author and Date */}
        <div className="border-2 border-gray-300 flex items-center justify-between">
          {/* Author Info */}
          <div className="border-2 border-gray-300 flex items-center gap-2">
            <img 
              src="/src/assets/Nav/EnglishkafeLogo-Transparent.png" 
              alt={authorName} 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-semibold text-gray-900">{authorName}</p>
              <p className="text-xs text-gray-600">{date}</p>
            </div>
          </div>

          {/* Arrow Button */}
          <button 
            onClick={handleReadMore}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" 
            style={{backgroundColor: "#F5C6D8"}}
          >
            <span className="text-lg text-gray-900">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
