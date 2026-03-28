import { ArrowLeft, Upload, Star, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function EditCourse() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    rating: 4,
    learnings: [''],
    image: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load course data from localStorage or default courses
    const allCourses = getAllCourses()
    const course = allCourses.find(c => c.id === parseInt(id))
    
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price.replace(' บาท', ''),
        rating: course.rating,
        learnings: course.learnings || [''],
        image: course.image,
      })
    }
    setLoading(false)
  }, [id])

  const getAllCourses = () => {
    const defaultCourses = [
      {
        id: 1,
        title: 'IELTS SPEAKING',
        description: 'Build confidence with guided speaking practice and real exam-style questions',
        price: '3000 บาท',
        rating: 4.5,
        reviews: 141,
      },
      {
        id: 2,
        title: 'IELTS WRITING',
        description: 'Clear structure, grammar guidance, and scarring strategies for stronger essays',
        price: '3000 บาท',
        rating: 4.5,
        reviews: 141,
      },
      {
        id: 3,
        title: 'GRAMMAR ESSENTIAL',
        description: 'Understand grammar simply and apply it confidently in speaking and writing',
        price: '2500 บาท',
        rating: 4.5,
        reviews: 141,
      },
      {
        id: 4,
        title: 'DAILY ENGLISH',
        description: 'Improve your daily English communication skills with practical lessons',
        price: '2000 บาท',
        rating: 4.5,
        reviews: 125,
      },
      {
        id: 5,
        title: 'MASTER COMMUNICATION',
        description: 'Master communication techniques and become a confident speaker',
        price: '2800 บาท',
        rating: 4.5,
        reviews: 156,
      },
    ]

    const savedCourses = localStorage.getItem('courses')
    const parsedCourses = savedCourses ? JSON.parse(savedCourses) : []
    return [...defaultCourses, ...parsedCourses]
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLearningChange = (index, value) => {
    const newLearnings = [...formData.learnings]
    newLearnings[index] = value
    setFormData(prev => ({
      ...prev,
      learnings: newLearnings
    }))
  }

  const addLearning = () => {
    setFormData(prev => ({
      ...prev,
      learnings: [...prev.learnings, '']
    }))
  }

  const removeLearning = (index) => {
    setFormData(prev => ({
      ...prev,
      learnings: prev.learnings.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.title || !formData.price) {
      alert('Please fill in all required fields')
      return
    }

    // Get all courses
    let allCourses = getAllCourses()
    const courseIndex = allCourses.findIndex(c => c.id === parseInt(id))

    if (courseIndex !== -1) {
      // Update the course
      allCourses[courseIndex] = {
        ...allCourses[courseIndex],
        title: formData.title,
        description: formData.description,
        price: formData.price + ' บาท',
        rating: parseFloat(formData.rating),
        image: formData.image,
        learnings: formData.learnings.filter(l => l.trim())
      }

      // Save to localStorage (only non-default courses)
      const savedCourses = allCourses.filter(c => c.id > 5)
      if (savedCourses.length > 0) {
        localStorage.setItem('courses', JSON.stringify(savedCourses))
      }

      navigate('/courses')
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex-1 text-center">Edit Course</h1>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-pink-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-pink-400 transition-colors font-medium"
          >
            Update
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
          {/* Left Column - Image Upload */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Upload course image:
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-80 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.image ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={formData.image}
                    alt="Course preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute flex items-center gap-2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-lg mt-2">
                    <Upload size={16} />
                    <span className="text-xs font-medium">Update</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-500">
                  <Upload size={32} />
                  <span className="text-sm font-medium">Upload</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="col-span-2 space-y-6">
            {/* Course Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Add short course title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* Course Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Course description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your course"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* Price and Rating Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Set Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Set price
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="4500"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <span className="text-gray-700 font-medium">฿</span>
                </div>
              </div>

              {/* Set Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Set rating
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.5"
                    className="w-12 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <span className="text-gray-700 font-medium">/5</span>
                  <div className="flex gap-1 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(formData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                What you'll learn
              </label>
              <div className="space-y-2">
                {formData.learnings.map((learning, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={learning}
                      onChange={(e) => handleLearningChange(index, e.target.value)}
                      placeholder="what students will get from this course"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeLearning(index)}
                      className="flex items-center justify-center bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                      title="Remove"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLearning}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2"
                >
                  + Add another
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCourse
