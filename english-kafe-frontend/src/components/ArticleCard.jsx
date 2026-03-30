import { useNavigate } from 'react-router-dom'

function ArticleCard({ id, image, title, description, authorLogo, authorName, date }) {
  const navigate = useNavigate()

  const handleReadMore = () => {
    navigate('/blog')
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md px-2 py-2 w-80 h-110 gap-5 hover:shadow-lg transition-shadow ">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-300 overflow-hidden rounded-xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="p-5 -mx-5">
        {/* Title */}
        <h3 className=" text-lg font-bold text-gray-900 mb-2 line-clamp-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#8B6F61] text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Footer - Author and Date */}
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <img 
              src="/src/assets/Nav/EnglishkafeLogo-Transparent.png" 
              alt={authorName} 
              className="w-12 h-12 rounded-full border-2 border-[#F5C6D8] object-cover"
            />
            <div>
              <p className="text-xs font-semibold text-gray-900">{authorName}</p>
              <p className="text-xs text-gray-600">{date}</p>
            </div>
          </div>

          {/* Arrow Button */}
          <button 
            onClick={handleReadMore}
            className="w-15 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" 
            style={{backgroundColor: "#F8B2C0"}}
          >
            <span className="text-lg text-gray-1200">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
