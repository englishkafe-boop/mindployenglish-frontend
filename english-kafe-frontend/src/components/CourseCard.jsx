import { useNavigate } from 'react-router-dom'

function CourseCard({ id, image, title, description, price, rating }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/courses/${id}`)
  }

  const resolvedImage = image && image.startsWith('/src/assets')
    ? new URL(image.replace('/src/assets/', '../assets/'), import.meta.url).href
    : image

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3">
      {/* Image Container - Left */}
      <div className=" relative w-full sm:w-48 md:w-56 lg:w-64 h-54  bg-gray-300 overflow-hidden shrink-0 rounded-lg">
        {resolvedImage ? (
          <img 
            src={resolvedImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-gray-500">
            No image
          </div>
        )}
      </div>

      {/* Content Container - Right */}
      <div className=" flex-1 flex flex-col justify-between min-w-0">
        {/* Title as Badge */}
        <div className=" inline-block bg-[#CDEAFA] text-black-700 text-xs font-semibold px-2 py-1 rounded-full mb-1 w-full text-center flex-shrink-0">
          {title}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xm mb-2 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className=" text-lg sm:text-xl font-bold text-gray-900 mb-1">
          {price}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? "text-yellow-400 text-xs sm:text-sm" : "text-gray-300 text-xs sm:text-sm"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-600 text-xs">({rating}/5)</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <button 
            onClick={handleViewDetails}
            className="flex-1 px-2 sm:px-4 py-3 border-2 border-[#F8B2C0] text-gray-700 font-semibold text-xs sm:text-sm rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            View details
          </button>
          <button 
            onClick={() => navigate(`/enroll/${id}`)}
            className="flex-1 px-2 sm:px-4 py-3 bg-[#F8B2C0] text-gray-900 font-semibold text-xs sm:text-sm rounded-lg hover:bg-[#F8C2C0] transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
