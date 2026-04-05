function SessionExpiredModal({ isOpen, message, onLoginClick }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="relative bg-gradient-to-r from-rose-50 via-pink-50 to-blue-50 px-6 pb-5 pt-6">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8B2C0] text-gray-900 shadow-sm">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0-10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Session Expired
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {message}
          </p>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-amber-800">
              For your security, your session was closed. Please sign in again to continue.
            </p>
          </div>

          <button
            type="button"
            onClick={onLoginClick}
            className="w-full rounded-2xl bg-[#F8B2C0] px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-[#F8C2C0]"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SessionExpiredModal
