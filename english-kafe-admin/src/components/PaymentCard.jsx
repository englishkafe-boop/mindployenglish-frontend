import { Check, X, Maximize2 } from 'lucide-react'
import { useState } from 'react'

function PaymentCard({ payment, onApprove, onDeny, status = 'review' }) {
  const [showSlipModal, setShowSlipModal] = useState(false)

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-5 md:p-6 relative lg:items-start">
          {/* Left Side - Payment Slip */}
          <button
            onClick={() => setShowSlipModal(true)}
            className="w-full lg:w-44 lg:shrink-0 relative group hover:opacity-80 transition-opacity"
            title="Click to view slip"
          >
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200 group-hover:border-pink-300">
              {/* Transaction Status */}
              <div className="flex items-center justify-center gap-1 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600 text-center">Transaction<br/>successful</span>
              </div>

              {/* Amount */}
              <div className="text-center mb-4 pb-4 border-b border-gray-300">
                <div className="text-xs text-gray-500 mb-1">From</div>
                <div className="font-bold text-gray-900 text-sm md:text-base">{payment.amount}</div>
              </div>

              {/* Payment Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></div>
                  <span className="text-gray-700">{payment.paymentMethod}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></div>
                  <span className="text-gray-700">{payment.cardInfo}</span>
                </div>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-pink-500 text-white p-1.5 rounded-lg">
                  <Maximize2 size={12} />
                </div>
              </div>
            </div>
          </button>

          {/* Right Side - User & Course Info */}
          <div className="flex-1 flex flex-col">
            {/* User Info - Improved Layout */}
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5 pb-3 md:pb-4 border-b border-gray-200">
              <img
                src={payment.userAvatar}
                alt={payment.userName}
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg truncate">{payment.userName}</div>
                <div className="text-xs md:text-sm text-gray-500 truncate">{payment.userDate}</div>
              </div>
            </div>

            {/* Course Info */}
            <div className="mb-4 md:mb-5 lg:mb-6">
              <div className="text-gray-700 text-xs md:text-sm mb-1 truncate">{payment.courseName}</div>
              <div className="text-base md:text-lg lg:text-2xl font-bold text-gray-900">{payment.coursePrice}</div>
            </div>

            {/* Denial Reason - Show for Denied Status */}
            {status === 'denied' && payment.denialReason && (
              <div className="mb-4 md:mb-5 p-2 md:p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="text-xs font-semibold text-red-700 mb-1">Reason: Incorrect Transfer slip</div>
                <div className="text-xs md:text-sm text-gray-700">{payment.denialReason}</div>
              </div>
            )}

            {/* Action Buttons */}
            {status === 'review' && (
              <div className="flex gap-2 md:gap-3 mt-auto">
                <button
                  onClick={() => onDeny(payment.id)}
                  className="flex-1 px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-semibold text-white text-xs md:text-sm bg-pink-500 hover:bg-pink-600 transition-colors"
                >
                  Deny
                </button>
                <button
                  onClick={() => onApprove(payment.id)}
                  className="flex-1 px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-semibold text-white text-xs md:text-sm bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              </div>
            )}

            {/* Status Badges - Bottom Right */}
            {status === 'approved' && (
              <div className="lg:absolute lg:bottom-4 lg:right-6 bg-green-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold mt-3 lg:mt-0 w-fit">
                Approved
              </div>
            )}
            {status === 'denied' && (
              <div className="lg:absolute lg:bottom-4 lg:right-6 bg-red-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold mt-3 lg:mt-0 w-fit">
                Denied
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slip Viewing Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Payment Slip</h2>
              <button
                onClick={() => setShowSlipModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - Enlarged Slip */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                {/* Transaction Status */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 font-semibold">Transaction successful</span>
                </div>

                {/* Amount */}
                <div className="text-center mb-8 pb-6 border-b border-gray-300">
                  <div className="text-sm text-gray-500 mb-2">From</div>
                  <div className="text-3xl font-bold text-gray-900">{payment.amount}</div>
                </div>

                {/* Payment Details */}
                <div className="mb-8 pb-6 border-b border-gray-300">
                  <div className="text-sm font-semibold text-gray-900 mb-4">Payment Method</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                      <span className="text-gray-700">{payment.paymentMethod}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                      <span className="text-gray-700">{payment.cardInfo}</span>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="text-center text-sm text-gray-500">
                  {payment.date}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setShowSlipModal(false)}
                className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentCard
