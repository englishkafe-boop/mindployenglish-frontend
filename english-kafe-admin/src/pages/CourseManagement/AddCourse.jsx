import { ArrowLeft, Upload, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function AddCourse() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    rating: 4,
    learnings: [''],
    image: null,
  })

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
    if (!formData.title || !formData.price || !formData.image) {
      alert('Please fill in all required fields (title, price, and image)')
      return
    }

    // Get existing courses from localStorage
    const existingCourses = JSON.parse(localStorage.getItem('courses')) || []
    
    // Create new course object
    const newCourse = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      price: formData.price + ' บาท',
      rating: parseFloat(formData.rating),
      reviews: 0,
      category: 'NEW COURSE',
      image: formData.image,
      learnings: formData.learnings.filter(l => l.trim())
    }

    // Add new course to the list
    const updatedCourses = [...existingCourses, newCourse]
    
    // Save to localStorage
    localStorage.setItem('courses', JSON.stringify(updatedCourses))
    
    // Navigate back to courses
    navigate('/courses')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex-1 text-center">Add Course</h1>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-300 text-gray-800 px-4 sm:px-6 py-2 rounded-lg hover:bg-pink-400 transition-colors font-medium text-sm sm:text-base"
          >
            Create
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Image Upload */}
          <div className="col-span-1">
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-3">
              Upload course image:
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center min-h-64 sm:min-h-80 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Course preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 sm:gap-3 text-gray-500">
                  <Upload size={28} className="sm:w-8 sm:h-8" />
                  <span className="text-xs sm:text-sm font-medium">Upload</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Course Title */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Add short course title"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              />
            </div>

            {/* Course Description */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                Course description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your course"
                rows="4"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
              />
            </div>

            {/* Price and Rating Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Set Price */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Set price
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="4500"
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  />
                  <span className="text-gray-700 font-medium">฿</span>
                </div>
              </div>

              {/* Set Rating */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
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
                    className="w-12 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  />
                  <span className="text-gray-700 font-medium">/5</span>
                  <div className="flex gap-1 ml-1 sm:ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`sm:w-[18px] sm:h-[18px] ${i < Math.floor(formData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
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
                      className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                    />
                    {formData.learnings.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLearning(index)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base shrink-0"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLearning}
                  className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm font-medium mt-2"
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

export default AddCourse
