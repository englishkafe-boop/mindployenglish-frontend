import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { coursesData } from '../services/courseService'

function MyCourseOrder() {
  const navigate = useNavigate()

  // Sample order data - in real app, this would come from backend
  const orders = [
    {
      id: 1,
      courseId: 1,
      status: 'Approved', // or 'Pending', 'Rejected'
      enrolledDate: '2025-03-20',
      course: coursesData[0]
    },
    {
      id: 2,
      courseId: 5,
      status: 'Approved',
      enrolledDate: '2025-03-18',
      course: coursesData[4]
    },
    {
      id: 3,
      courseId: 4,
      status: 'Pending',
      enrolledDate: '2025-03-25',
      course: coursesData[3]
    }
  ]

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      {/* Header */}
      <div className="px-4 md:px-10 py-12 text-center bg-white border-b-4 border-pink-400">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          My Course Order
        </h1>
      </div>

      {/* Orders Grid */}
      <div className="px-4 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => {
              const course = order.course
              return (
                <div key={order.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex gap-6 p-6">
                  {/* Image Container - Left */}
                  <div className="relative w-56 bg-gray-300 overflow-hidden shrink-0 rounded-xl">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Container - Right */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Badge */}
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-3 w-fit">
                      {course.title.split(' ').slice(0, 2).join(' ')}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {course.description}
                    </p>

                    {/* Price */}
                    <div className="text-lg font-bold text-gray-900 mb-2">
                      {course.price}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      {renderStars(course.rating)}
                      <span className="text-gray-600 text-xs">({course.rating.toFixed(1)})</span>
                    </div>

                    {/* Check Status Button */}
                    <button
                      onClick={() => navigate(`/order-status/${order.id}`)}
                      className="w-full bg-pink-300 hover:bg-pink-400 text-gray-900 font-bold py-2 px-4 rounded-full transition-colors text-sm"
                    >
                      Check Status
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination Indicator */}
          <div className="flex justify-center mt-12">
            <div className="h-2 w-8 bg-pink-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MyCourseOrder
