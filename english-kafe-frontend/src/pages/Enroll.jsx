import { useParams, useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getCourseById } from '../services/courseService'
import { useAuth } from '../contexts/AuthContext'

function Enroll() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const course = getCourseById(courseId)

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      // Redirect directly to login page if not logged in
      navigate('/login')
    } else {
      // Navigate to payment page
      navigate(`/payment/${course.id}`)
    }
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

  return (
    <Fragment>
      <div className="min-h-screen bg-blue-50">
        <Navbar />

        {/* Back to Courses Link */}
        <div className="px-4 md:px-10 pt-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
            >
              <span className="text-2xl">←</span>
              Back To Courses
            </button>
          </div>
        </div>

        {/* Enrollment Section */}
        <div className="px-4 md:px-10 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Complete Your Enrollment
              </h1>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Side - Course Details */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex flex-col">
                    {/* Course Image */}
                    <div className="mb-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-96 object-cover rounded-2xl"
                      />
                    </div>

                    {/* Course Info Below Image */}
                    <div>
                      {/* Badge and Price Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {course.title.split(' ').slice(0, 2).join(' ')}
                        </div>
                        <span className="text-3xl font-bold text-gray-900">
                          {course.price}
                        </span>
                      </div>

                      {/* Lesson Count */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">📄</span>
                        <span className="text-gray-700 font-semibold">
                          {course.lessons} lessons
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-3">
                        {renderStars(course.rating)}
                        <span className="text-gray-600 font-semibold">
                          ({course.rating.toFixed(1)}/5)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Order Summary */}
              <div>
                <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h3>

                  {/* Order Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Course name:</span>
                      <span className="text-gray-900 font-semibold">{course.title}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                      <span className="text-gray-700 font-semibold">Price:</span>
                      <span className="text-gray-900 font-semibold">{course.price}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-lg font-bold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-gray-900">{course.price}</span>
                    </div>
                  </div>

                  {/* Enrollment Instructions */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-gray-900 mb-4">
                      How to Enroll
                    </h4>
                    <ol className="space-y-3 text-sm text-gray-700">
                      <li>
                        <span className="font-semibold">Step 1.</span> Scan the QR code to complete your payment.
                      </li>
                      <li>
                        <span className="font-semibold">Step 2.</span> Upload your payment receipt.
                      </li>
                      <li>
                        <span className="font-semibold">Step 3.</span> Wait for admin verification (you'll be notified once approved).
                      </li>
                    </ol>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/courses/${courseId}`)}
                      className="flex-1 border-2 border-gray-300 text-gray-900 font-bold py-3 px-4 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleEnrollClick}
                      className="flex-1 bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-4 rounded-full transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Fragment>
  )
}

export default Enroll
