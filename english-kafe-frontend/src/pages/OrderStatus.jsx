import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchMyPayments } from '../services/paymentService'

function OrderStatus() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPayment() {
      try {
        setLoading(true)
        setError('')
        const payments = await fetchMyPayments()
        const matchedPayment = payments.find((item) => item.id === orderId)

        if (!matchedPayment) {
          throw new Error('Order not found')
        }

        setPayment(matchedPayment)
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadPayment()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-gray-600">Loading order...</p>
        </div>
      </div>
    )
  }

  if (!payment || !payment.course) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-gray-600">{error || 'Order not found'}</p>
        </div>
      </div>
    )
  }

  const course = payment.course

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )

  const renderApprovedStatus = () => (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="text-green-500 text-3xl">✓</div>
        <h2 className="text-2xl font-bold text-gray-900">Enrollment Confirmed</h2>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        {['✓', '✓', '✓'].map((icon, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full ${index === 2 ? 'bg-green-500' : 'bg-pink-300'} flex items-center justify-center text-white font-bold mb-2 text-sm`}>
                {icon}
              </div>
              <p className="text-xs font-medium text-gray-600 text-center">
                {index === 0 ? 'Payment' : index === 1 ? 'Receipt uploaded' : 'Verification'}
              </p>
            </div>
            {index < 2 ? <div className={`flex-1 h-1 ${index === 1 ? 'bg-green-500' : 'bg-pink-300'} mt-5`}></div> : null}
          </div>
        ))}
      </div>

      <p className="text-gray-700 mb-2">
        Your payment has been successfully verified.
      </p>
      <p className="text-gray-600 text-sm mb-6">
        You now have full access to this course.
      </p>

      <button
        onClick={() => navigate(`/course-lessons/${course.id}`)}
        className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-6 rounded-full transition-colors mb-2"
      >
        Go To Course
      </button>
    </div>
  )

  const renderRejectedStatus = () => (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="text-red-500 text-3xl">✕</div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Not Verified</h2>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">✓</div>
            <p className="text-xs font-medium text-gray-600 text-center">Payment</p>
          </div>
          <div className="flex-1 h-1 bg-pink-300 mt-5"></div>
        </div>
        <div className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">✓</div>
            <p className="text-xs font-medium text-gray-600 text-center">Receipt uploaded</p>
          </div>
          <div className="flex-1 h-1 bg-red-500 mt-5"></div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mb-2 text-sm">✕</div>
          <p className="text-xs font-medium text-gray-600 text-center">Verification</p>
        </div>
      </div>

      <p className="text-gray-700 mb-2">
        We couldn't verify your payment.
      </p>
      <p className="text-gray-600 text-sm mb-4">
        {payment.rejectReason || 'Please re-upload your receipt or contact support for assistance.'}
      </p>

      <button
        onClick={() => navigate(`/payment/${course.id}`)}
        className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-6 rounded-full transition-colors mb-4"
      >
        Resubmit Receipt
      </button>
    </div>
  )

  const renderPendingStatus = () => (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="text-yellow-500 text-3xl animate-pulse">⏳</div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Under Review</h2>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">✓</div>
            <p className="text-xs font-medium text-gray-600 text-center">Payment</p>
          </div>
          <div className="flex-1 h-1 bg-pink-300 mt-5"></div>
        </div>
        <div className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mb-2 text-sm">✓</div>
            <p className="text-xs font-medium text-gray-600 text-center">Receipt uploaded</p>
          </div>
          <div className="flex-1 h-1 bg-yellow-400 mt-5"></div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold mb-2 text-sm animate-pulse">⏳</div>
          <p className="text-xs font-medium text-gray-600 text-center">Verification</p>
        </div>
      </div>

      <p className="text-gray-700 mb-2">
        Your payment has been successfully submitted!
      </p>
      <p className="text-gray-600 text-sm mb-6">
        Our admin team is reviewing your payment receipt.
      </p>

      <button
        onClick={() => navigate('/my-course-order')}
        className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-3 px-6 rounded-full transition-colors mb-4"
      >
        Back to Orders
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

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

      <div className="px-4 md:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Complete Your Enrollment
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex flex-col">
                <div className="mb-6">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                      No image
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {course.title.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <span className="text-3xl font-bold text-gray-900">
                      {course.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">📄</span>
                    <span className="text-gray-700 font-semibold">
                      Course order
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {renderStars(4.5)}
                    <span className="text-gray-600 font-semibold">
                      ({new Date(payment.createdAt).toLocaleDateString()})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Order Status
              </h3>

              {payment.status === 'approved' ? renderApprovedStatus() : null}
              {payment.status === 'rejected' ? renderRejectedStatus() : null}
              {payment.status === 'pending' ? renderPendingStatus() : null}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OrderStatus
