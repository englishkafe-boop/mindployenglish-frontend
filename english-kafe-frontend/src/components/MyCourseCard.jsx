import { useNavigate } from 'react-router-dom'

function MyCourseCard({ id, image, title, description, lessons, buttonText = "Learn Now" }) {
  const navigate = useNavigate()

  const handleLearnNow = () => {
    navigate(`/course-lessons/${id}`)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex gap-6 p-6">
      {/* Image Container - Left */}
      <div className="relative w-64 bg-gray-300 overflow-hidden shrink-0 rounded-xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container - Right */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Title as Badge */}
        <div className="inline-block bg-blue-100 text-gray-900 text-xs font-semibold px-4 py-2 rounded-full mb-4 w-full text-center">
          {title}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Lesson Count */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">📄</span>
          <span className="text-gray-700 font-semibold">
            {lessons} lessons
          </span>
        </div>

        {/* Learn Now Button */}
        <button 
          onClick={handleLearnNow}
          className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-6 rounded-full transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default MyCourseCard
