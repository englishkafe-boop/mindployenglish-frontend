import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchMyPayments } from '../services/paymentService'

function MyCourseOrder() {
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPayments() {
      try {
        setLoading(true)
        setError('')
        setPayments(await fetchMyPayments())
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadPayments()
  }, [])

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}>
          ★
        </span>
      ))}
    </div>
  )

  const getStatusLabel = (status) => {
    if (status === 'approved') return 'Approved'
    if (status === 'rejected') return 'Rejected'
    return 'Pending'
  }

  const getStatusClasses = (status) => {
    if (status === 'approved') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'rejected') {
      return 'bg-red-100 text-red-700'
    }

    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="px-4 md:px-10 py-12 text-center bg-white ">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          My Course Order
        </h1>
      </div>

      <div className="px-4 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-sm">
              Loading payments...
            </div>
          ) : payments.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-sm">
              You have not submitted any course payments yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {payments.map((payment) => {
                const course = payment.course
                return (
                  <div key={payment.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex gap-6 p-6">
                    <div className="relative w-56 bg-gray-300 h-54 overflow-hidden shrink-0 rounded-xl">
                      {course?.image ? (
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-semibold text-gray-500">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className={`inline-block text-xs font-semibold px-4 py-2 rounded-full mb-3 w-full text-center ${getStatusClasses(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </div>

                      <p className="text-gray-900 font-semibold text-lg mb-2">
                        {course?.title}
                      </p>

                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {course?.description}
                      </p>

                      <div className="text-lg font-bold text-gray-900 mb-2">
                        {course?.price}
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        {renderStars(4.5)}
                        <span className="text-gray-600 text-xs">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate(`/order-status/${payment.id}`)}
                        className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-2 px-4 rounded-full transition-colors text-sm"
                      >
                        Check Status
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MyCourseOrder
