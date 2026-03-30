import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { coursesData } from '../services/courseService'

function OrderStatus() {
  const { orderId } = useParams()
  const navigate = useNavigate()

  // Sample order data with different statuses
  const orders = {
    1: {
      id: 1,
      courseId: 1,
      status: 'Approved', // Success
      enrolledDate: '2025-03-20',
      course: coursesData[0]
    },
    2: {
      id: 2,
      courseId: 5,
      status: 'Rejected', // Payment Not Verified
      enrolledDate: '2025-03-18',
      course: coursesData[4]
    },
    3: {
      id: 3,
      courseId: 4,
      status: 'Pending', // Payment Under Review
      enrolledDate: '2025-03-25',
      course: coursesData[3]
    }
  }

  const order = orders[orderId] || orders[1]
  const course = order.course

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

  // Render Approved Status
  const renderApprovedStatus = () => (
    <div>
      {/* Status Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-green-500 text-3xl">✓</div>
        <h2 className="text-2xl font-bold text-gray-900">Enrollment Confirmed</h2>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✓
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Payment</p>
        </div>
        
        <div className="flex-1 h-1 bg-pink-300 mt-5"></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✓
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Receipt uploaded</p>
        </div>
        
        <div className="flex-1 h-1 bg-green-500 mt-5"></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✓
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Verification</p>
        </div>
      </div>

      {/* Status Message */}
      <p className="text-gray-700 mb-2">
        Your payment has been successfully verified.
      </p>
      <p className="text-gray-600 text-sm mb-6">
        You now have full access to this course.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate(`/course-lessons/${course.id}`)}
        className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-6 rounded-full transition-colors mb-2"
      >
        Go To Course
      </button>
      <p className="text-gray-500 text-xs text-center">Enjoy your learning journey 🎓</p>
    </div>
  )

  // Render Rejected Status
  const renderRejectedStatus = () => (
    <div>
      {/* Status Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-red-500 text-3xl">✕</div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Not Verified</h2>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✓
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Payment</p>
        </div>
        
        <div className="flex-1 h-1 bg-pink-300 mt-5"></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✓
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Receipt uploaded</p>
        </div>
        
        <div className="flex-1 h-1 bg-red-500 mt-5"></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✕
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Verification</p>
        </div>
      </div>

      {/* Status Message */}
      <p className="text-gray-700 mb-2">
        We couldn't verify your payment.
      </p>
      <p className="text-gray-600 text-sm mb-4">
        Please re-upload your receipt or contact support for assistance
      </p>

      {/* Button */}
      <button
        onClick={() => navigate('/payment/' + course.id)}
        className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-6 rounded-full transition-colors mb-4"
      >
        Resubmit Receipt
      </button>

      <p className="text-gray-600 text-xs text-center">
        If you need assistance, please contact our support team via LINE.
      </p>
      <p className="text-gray-600 text-xs text-center mt-2">
        Contact: <a href="#" className="text-blue-600 hover:underline">English Kafé Support</a>
      </p>
    </div>
  )

  // Render Pending Status
  const renderPendingStatus = () => (
    <div>
      {/* Status Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-yellow-500 text-3xl animate-pulse">⏳</div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Under Review</h2>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✓
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Payment</p>
        </div>
        
        <div className="flex-1 h-1 bg-pink-300 mt-5"></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">
            ✓
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Receipt uploaded</p>
        </div>
        
        <div className="flex-1 h-1 bg-yellow-400 mt-5"></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold mb-2 text-sm animate-pulse">
            ⏳
          </div>
          <p className="text-xs font-medium text-gray-600 text-center">Verification</p>
        </div>
      </div>

      {/* Status Message */}
      <p className="text-gray-700 mb-2">
        Your payment has been successfully submitted!
      </p>
      <p className="text-gray-600 text-sm mb-6">
        Our admin team is reviewing your payment receipt. This usually takes 1-2 hours.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate('/my-course-order')}
        className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-6 rounded-full transition-colors mb-4"
      >
        Back to Orders
      </button>

      <p className="text-gray-600 text-xs text-center">
        You can check the status of your order anytime in "My Orders"
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      {/* Back Link */}
      <div className="px-4 md:px-10 pt-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/my-course-order')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
          >
            <span className="text-2xl">←</span>
            Back To My Orders
          </button>
        </div>
      </div>

      {/* Order Status Section */}
      <div className="px-4 md:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Complete Your Enrollment
            </h1>
          </div>

          {/* Main Content - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Course Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex flex-col">
                {/* Course Image */}
                <div className="mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>

                {/* Course Info */}
                <div>
                  {/* Badge and Price Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {course.category}
                    </div>
                    <span className="text-3xl font-bold text-gray-900">
                      ฿{course.price}
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
                      ({course.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Order Status Section */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              {/* Status Header */}
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Order Status
              </h3>

              {/* Render Status Based on Order */}
              {order.status === 'Approved' && renderApprovedStatus()}
              {order.status === 'Rejected' && renderRejectedStatus()}
              {order.status === 'Pending' && renderPendingStatus()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OrderStatus
