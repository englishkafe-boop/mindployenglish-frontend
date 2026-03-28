import { ArrowLeft, Upload } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AddLesson() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [course, setCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
  })

  // Default courses
  const defaultCourses = [
    {
      id: 1,
      title: 'IELTS SPEAKING',
      description: 'Build confidence with guided speaking practice and real exam-style questions',
      price: '3000 บาท',
      rating: 4.5,
      reviews: 141,
      image: new URL('../../assets/images/IELTS speaking.jpg', import.meta.url).href,
    },
    {
      id: 2,
      title: 'IELTS WRITING',
      description: 'Clear structure, grammar guidance, and scarring strategies for stronger essays',
      price: '3000 บาท',
      rating: 4.5,
      reviews: 141,
      image: new URL('../../assets/images/ielts writing.jpg', import.meta.url).href,
    },
    {
      id: 3,
      title: 'GRAMMAR ESSENTIAL',
      description: 'Understand grammar simply and apply it confidently in speaking and writing',
      price: '2500 บาท',
      rating: 4.5,
      reviews: 141,
      image: new URL('../../assets/images/grammer.jpg', import.meta.url).href,
    },
    {
      id: 4,
      title: 'DAILY ENGLISH',
      description: 'Improve your daily English communication skills with practical lessons',
      price: '2000 บาท',
      rating: 4.5,
      reviews: 125,
      image: new URL('../../assets/images/daily english.jpg', import.meta.url).href,
    },
    {
      id: 5,
      title: 'MASTER COMMUNICATION',
      description: 'Master communication techniques and become a confident speaker',
      price: '2800 บาท',
      rating: 4.5,
      reviews: 156,
      image: new URL('../../assets/images/master communation.jpg', import.meta.url).href,
    },
  ]

  useEffect(() => {
    const courseId = parseInt(id)
    
    // Try to find in default courses
    let foundCourse = defaultCourses.find(c => c.id === courseId)
    
    // If not found, try in custom courses from localStorage
    if (!foundCourse) {
      const customCourses = JSON.parse(localStorage.getItem('courses')) || []
      foundCourse = customCourses.find(c => c.id === courseId)
    }
    
    if (foundCourse) {
      setCourse(foundCourse)
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.videoUrl) {
      alert('Please fill in all required fields')
      return
    }

    // Get existing lessons from localStorage
    const existingLessons = JSON.parse(localStorage.getItem('lessons')) || []

    // Create new lesson object
    const newLesson = {
      id: Date.now(),
      courseId: parseInt(id),
      title: formData.title,
      videoUrl: formData.videoUrl,
      createdAt: new Date().toISOString()
    }

    // Add new lesson to the list
    const updatedLessons = [...existingLessons, newLesson]

    // Save to localStorage
    localStorage.setItem('lessons', JSON.stringify(updatedLessons))

    // Navigate back to course detail
    navigate(`/courses/${id}`)
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Course not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/courses/${id}`)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex-1 text-center">Add Lesson</h1>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-pink-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-pink-400 transition-colors font-medium"
          >
            Create
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
          {/* Left Column - Course Info */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md sticky top-8">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-xs text-gray-600">{course.description}</p>
                <p className="text-sm font-bold text-gray-900 mt-3">{course.price}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="col-span-2 space-y-6">
            {/* Lesson Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Lesson Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter lesson title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLesson
