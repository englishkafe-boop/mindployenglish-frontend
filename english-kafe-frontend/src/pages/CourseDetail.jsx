import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'
import { getCourseById, coursesData } from '../services/courseService'

function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  const course = getCourseById(courseId)
  
  // Related courses setup
  const relatedCourses = coursesData.filter(c => c.id !== course?.id)
  const coursesPerPage = 4
  const totalPages = Math.ceil(relatedCourses.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const currentRelatedCourses = relatedCourses.slice(startIndex, startIndex + coursesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-gray-600">Course not found</p>
        </div>
      </div>
    )
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    )
  }

  const courseFeatures = [
    'Simple, step-by-step lessons',
    'Real-life examples for practical use',
    'Guided practice in every video',
    'Improve speaking and writing accuracy',
    'Build a strong foundation',
    'No confusing rules or memorization'
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Course Detail Section */}
      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          {/* Header with title */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Explore Our Online Video Courses
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2">
              Browse a curated collection of self-paced English video courses designed to improve your speaking, grammar, and real-world communication skills.
            </p>
          </div>

          {/* Course Detail Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Left - Image */}
              <div className="flex items-center justify-center">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-2xl"
                />
              </div>

              {/* Right - Course Details */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {course.title}
                </h2>

                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                  {course.fullDescription}
                </p>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">What you'll learn:</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {courseFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                        <span className="text-pink-400 mt-1 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course Info Bar */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-semibold uppercase text-xs sm:text-sm">
                      {course.title.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📄</span>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base">{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(course.rating)}
                    <span className="text-gray-700 font-semibold text-sm sm:text-base">({course.rating.toFixed(1)}/5)</span>
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 gap-4 sm:gap-6">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {course.price}
                  </div>
                  <button 
                    onClick={() => navigate(`/enroll/${course.id}`)}
                    className="w-full sm:w-auto bg-pink-300 hover:bg-pink-400 text-gray-900 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full transition-colors text-sm sm:text-base md:text-lg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses Section */}
      <div className="px-4 sm:px-6 md:px-10 py-12 sm:py-14 md:py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Related Courses
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {currentRelatedCourses.map((relatedCourse) => (
              <CourseCard
                key={relatedCourse.id}
                id={relatedCourse.id}
                image={relatedCourse.image}
                title={relatedCourse.title}
                description={relatedCourse.description}
                price={relatedCourse.price}
                rating={relatedCourse.rating}
                reviews={relatedCourse.reviews}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-10 sm:mt-12 flex-wrap">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors ${
                  currentPage === index + 1
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose English Kafé Section */}
      <div className="px-4 sm:px-6 md:px-10 py-12 sm:py-14 md:py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Left Side - Content */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Why Choose English Kafé Online Courses?
                </h2>
                
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                  <span className="font-semibold text-gray-700">English Kafé</span> is designed for learners who want real progress, real confidence, and real communication skills.
                </p>
                
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  We make learning simple, structured, and effective — so you always know what to study and how to improve.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  What Makes Us Different?
                </h3>

                <ul className="space-y-3 sm:space-y-4">
                  {[
                    'Clear, step-by-step lessons that are easy to follow',
                    'Practical speaking and real-life communication focus',
                    'Structured learning paths for steady progress',
                    'Self-paced videos — learn anytime, anywhere',
                    'Simple grammar explanations without confusion',
                    'Confidence-building practice in every lesson',
                    'Designed for beginners to advanced learners'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 bg-black rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side - Logo/Image */}
              <div className="flex items-center justify-center order-first md:order-last mt-6 md:mt-0">
                <img 
                  src="/src/assets/Nav/EnglishkafeLogo-Transparent.png" 
                  alt="English Kafé Logo"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default CourseDetail
