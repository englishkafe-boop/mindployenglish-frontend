import { useState } from 'react'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'
import TestimonialVideo from '../components/TestimonialVideo'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import { getAllCourses, getCoursesByPage, getTotalPages } from '../services/courseService'

function Courses() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const allCourses = getAllCourses()
  const coursesPerPage = 6
  const totalPages = getTotalPages(coursesPerPage)
  const currentCourses = getCoursesByPage(currentPage, coursesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 text-center bg-gray-50">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
          Explore Our Online Video Courses
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
          Browse a curated collection of self-paced English video courses designed to improve your speaking, grammar, and real-world communication skills.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                image={course.image}
                title={course.title}
                description={course.description}
                price={course.price}
                rating={course.rating}
                reviews={course.reviews}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 sm:mt-10 md:mt-12 flex-wrap">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
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

      {/* Featured Section */}
      <div className="px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-16 text-center bg-pink-100">
        <div className="flex justify-center">
          <div>
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              Master English faster with expert-guided video courses designed for<br className="hidden sm:block" />practical speaking, grammar, and everyday communication.
            </h2>
            <div className="h-1 w-20 sm:w-28 md:w-32 bg-black mx-auto"></div>
          </div>
        </div>
        <p className="text-[#4B5563] text-xs sm:text-sm md:text-base lg:text-lg mt-4 sm:mt-5 md:mt-6 max-w-3xl mx-auto">
          Learn smarter, progress quicker, and speak with confidence.
        </p>
      </div>

      {/* Free Course Preview Videos Section */}
      <div className="px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
              Free Course Preview Videos
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
              Explore sample lessons that show how our courses teach step by step.<br className="hidden sm:block" />
              Learn practical tips, clear explanations, and real examples
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
            {/* Video 1 */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                <span className="font-bold">Speak English with Confidence</span>
                <span className="text-gray-600 font-normal text-sm sm:text-base"> (Free to learn)</span>
              </h3>
              <TestimonialVideo 
                image="/src/assets/courses/IELTS speaking.jpg"
                backgroundColor="bg-green-500"
              />
            </div>

            {/* Video 2 */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                <span className="font-bold">English Basics – Free Starter Course</span>
                <span className="text-gray-600 font-normal text-sm sm:text-base"> (Free to learn)</span>
              </h3>
              <TestimonialVideo 
                image="/src/assets/courses/daily english.jpg"
                backgroundColor="bg-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Courses
