import { useNavigate } from 'react-router-dom'

function MyCourseCard({ id, image, title, description, lessons, buttonText = "Learn Now" }) {
  const navigate = useNavigate()

  const handleLearnNow = () => {
    navigate(`/course-lessons/${id}`)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3">
      <div className="relative w-full sm:w-48 md:w-56 lg:w-64 h-40 sm:h-auto bg-gray-300 overflow-hidden shrink-0 rounded-lg">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-gray-500">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="inline-block bg-[#CDEAFA] text-black-700 text-xs font-semibold px-2 py-1 rounded-full mb-2 w-full text-center flex-shrink-0">
          {title}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-3 whitespace-pre-wrap break-words">
          {description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-base sm:text-lg">📄</span>
          <span className="text-gray-700 font-semibold text-sm sm:text-base">
            {lessons} lessons
          </span>
        </div>

        <button 
          onClick={handleLearnNow}
          className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default MyCourseCard
