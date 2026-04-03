import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchMyPayments } from '../services/paymentService'

const orderSteps = ['Payment', 'Receipt uploaded', 'Verification']

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

  const renderStatusStepper = (steps) => (
    <div className="mb-8 flex justify-center rounded-2xl border border-[#F3D6DF] bg-[#FFF8FA] px-4 py-3 shadow-sm sm:px-6 sm:py-7">
      <div className="inline-flex items-start justify-center gap-2 sm:gap-3">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center justify-center">
            <div className="flex w-20 flex-col items-center text-center sm:w-28">
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all sm:h-12 sm:w-12 sm:text-base ${step.circleClass}`}
              >
                {step.icon}
              </div>

              <p className={`text-xs font-semibold sm:text-sm ${step.labelClass || 'text-gray-900'}`}>
                {step.label}
              </p>
              <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                Step {index + 1}
              </p>
            </div>

            {index < steps.length - 1 ? (
              <div className="mt-[-2.25rem] w-8 sm:mt-[-2.5rem] sm:w-14">
                <div className="h-1 w-full rounded-full bg-gray-200">
                  <div className={`h-full w-full rounded-full ${step.lineClass}`} />
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )

  const renderApprovedStatus = () => (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="text-green-500 text-3xl">✓</div>
        <h2 className="text-2xl font-bold text-gray-900">Enrollment Confirmed</h2>
      </div>

      {renderStatusStepper([
        {
          label: orderSteps[0],
          icon: '✓',
          circleClass: 'border-[#F8B2C0] bg-[#F8B2C0] text-gray-900',
          lineClass: 'bg-[#F8B2C0]',
        },
        {
          label: orderSteps[1],
          icon: '✓',
          circleClass: 'border-[#F8B2C0] bg-[#F8B2C0] text-gray-900',
          lineClass: 'bg-green-500',
        },
        {
          label: orderSteps[2],
          icon: '✓',
          circleClass: 'border-green-500 bg-green-500 text-white',
        },
      ])}

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

      {renderStatusStepper([
        {
          label: orderSteps[0],
          icon: '✓',
          circleClass: 'border-[#F8B2C0] bg-[#F8B2C0] text-gray-900',
          lineClass: 'bg-[#F8B2C0]',
        },
        {
          label: orderSteps[1],
          icon: '✓',
          circleClass: 'border-[#F8B2C0] bg-[#F8B2C0] text-gray-900',
          lineClass: 'bg-red-500',
        },
        {
          label: orderSteps[2],
          icon: '✕',
          circleClass: 'border-red-500 bg-red-500 text-white',
        },
      ])}

      <p className="text-gray-700 mb-2">
        We couldn't verify your payment.
      </p>
      <p className="text-gray-600 text-sm mb-4">Reject Reason : 
        <span className="font-semibold px-2">{payment.rejectReason || 'Please re-upload your receipt or contact support for assistance.'}</span>
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

      {renderStatusStepper([
        {
          label: orderSteps[0],
          icon: '✓',
          circleClass: 'border-[#F8B2C0] bg-[#F8B2C0] text-gray-900',
          lineClass: 'bg-[#F8B2C0]',
        },
        {
          label: orderSteps[1],
          icon: '✓',
          circleClass: 'border-[#F8B2C0] bg-[#F8B2C0] text-gray-900',
          lineClass: 'bg-yellow-400',
        },
        {
          label: orderSteps[2],
          icon: '⏳',
          circleClass: 'border-yellow-400 bg-yellow-400 text-white animate-pulse',
        },
      ])}

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
                      className="w-full h-84 object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                      No image
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-2">
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {course.title}
                    </div>
                    
                  </div>

                  <div className="mb-2">
                    <h1 className="text-lg font-semibold">Ordering Course -
                      {course.title}
                    </h1>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Price - {course.price}
                    </h2>
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
