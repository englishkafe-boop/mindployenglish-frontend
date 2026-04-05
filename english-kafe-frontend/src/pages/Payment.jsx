import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchCourseById } from "../services/courseService";
import { createPayment } from "../services/paymentService";

const paymentSteps = ["Payment", "Upload Receipt", "Verification"];

function Payment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptName, setReceiptName] = useState("");

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true);
        setError("");
        setCourse(await fetchCourseById(courseId));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);

  const handleReceiptChange = (e) => {
    const file = e.target.files?.[0];
    setReceiptFile(file || null);
    setReceiptName(file?.name || "");
  };

  const handleUploadReceipt = async () => {
    if (!receiptFile) {
      setError("Please upload your payment receipt first.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await createPayment(courseId, receiptFile);
      setCurrentStep(3);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-gray-600">
            {error || "Course not found"}
          </p>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      {/* Back Button */}
      <div className="px-4 sm:px-6 md:px-10 pt-6 sm:pt-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(`/enroll/${courseId}`)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors text-sm sm:text-base"
          >
            <span className="text-xl sm:text-2xl">←</span>
            Back To Order Summary
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Complete Your Enrollment
            </h1>
          </div>

          {/* Error */}
          {error ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
            {/* Left — Course Details */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-lg">
              {/* Course Image */}
              <div className="mb-4 sm:mb-6">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-44 sm:h-56 md:h-72 lg:h-80 object-cover rounded-2xl"
                  />
                ) : (
                  <div className="flex w-full h-44 sm:h-56 md:h-72 lg:h-80 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                    No image
                  </div>
                )}
              </div>

              {/* Badge */}
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {course.title}
                </span>
              </div>

              {/* Info */}
              <div className="mb-4">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  Course Title — {course.title}
                </h1>
                <h2 className="mt-2 font-semibold text-gray-700 text-sm sm:text-base">
                  Price — {course.price}
                </h2>
                <h2 className="text-gray-700 font-semibold text-sm sm:text-base">
                  Total lessons — {course.lessons} lessons
                </h2>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                {renderStars(course.rating)}
                <span className="text-gray-600 font-semibold text-sm sm:text-base">
                  ({course.rating.toFixed(1)}/5)
                </span>
              </div>
            </div>

            {/* Right — Payment Section */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6 md:mb-8">
                Payment Section
              </h3>

              {/* Step Indicator */}
              <div className="mb-4 sm:mb-6 flex justify-center rounded-2xl border border-[#F3D6DF] bg-[#FFF8FA] px-3 py-3 sm:px-6 sm:py-6 shadow-sm">
                <div className="inline-flex items-start justify-center gap-1 sm:gap-3">
                  {paymentSteps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = currentStep > stepNumber;
                    const isActive = currentStep === stepNumber;

                    return (
                      <div
                        key={label}
                        className="flex items-center justify-center"
                      >
                        <div className="flex w-16 sm:w-24 flex-col items-center text-center">
                          <div
                            className={`mb-2 sm:mb-3 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-bold transition-all ${
                              isActive
                                ? "border-[#F8B2C0] bg-[#F8B2C0] text-gray-900 shadow-md shadow-pink-100"
                                : isCompleted
                                  ? "border-[#CDEAFA] bg-[#CDEAFA] text-gray-900"
                                  : "border-gray-300 bg-white text-gray-500"
                            }`}
                          >
                            {isCompleted ? "✓" : stepNumber}
                          </div>
                          <p
                            className={`text-[10px] sm:text-xs font-semibold leading-tight ${isActive || isCompleted ? "text-gray-900" : "text-gray-500"}`}
                          >
                            {label}
                          </p>
                          <p className="mt-0.5 text-[9px] sm:text-[11px] text-gray-400">
                            Step {stepNumber}
                          </p>
                        </div>

                        {index < paymentSteps.length - 1 ? (
                          <div className="mb-5 w-5 sm:w-10 mx-0.5 sm:mx-1">
                            <div className="h-1 w-full rounded-full bg-gray-200">
                              <div
                                className={`h-full rounded-full transition-all ${currentStep > stepNumber ? "w-full bg-[#F8B2C0]" : "w-0"}`}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 — QR Code */}
              {currentStep === 1 ? (
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <p className="text-gray-700 font-semibold text-sm sm:text-base mb-2">
                      Step 1. Scan the QR code to complete your payment.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Next step: Upload your payment receipt.
                    </p>
                  </div>

                  <div className="bg-gray-100 p-6 sm:p-8 rounded-xl flex items-center justify-center">
                    <div className="border-4 border-gray-300 p-3 sm:p-4 bg-white rounded-lg">
                      <svg
                        className="w-24 sm:w-32 h-24 sm:h-32 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 3h8v8H3V3zm10 10h8v8h-8v-8zM7 7h4v4H7V7zm8-4h4v4h-4V3zm4 12h4v4h-4v-4zM3 13h4v4H3v-4z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate(`/courses/${courseId}`)}
                      className="flex-1 border-2 border-gray-300 text-gray-900 font-bold py-2.5 sm:py-3 px-4 rounded-full hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Go Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-2.5 sm:py-3 px-4 rounded-full transition-colors text-sm sm:text-base"
                    >
                      Upload Receipt
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Step 2 — Upload Receipt */}
              {currentStep === 2 ? (
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <p className="text-gray-700 font-semibold text-sm sm:text-base mb-2">
                      Step 2. Upload your payment receipt.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Please upload a clear image or screenshot of your payment
                      confirmation.
                    </p>
                  </div>

                  <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-pink-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptChange}
                      className="hidden"
                    />
                    <div className="text-3xl sm:text-4xl mb-2">📄</div>
                    <p className="text-gray-700 font-semibold text-sm sm:text-base mb-1">
                      {receiptName || "Click to upload receipt"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      PNG or JPG
                    </p>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-900 font-bold py-2.5 sm:py-3 px-4 rounded-full hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleUploadReceipt}
                      disabled={submitting}
                      className="flex-1 bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-2.5 sm:py-3 px-4 rounded-full transition-colors text-sm sm:text-base disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : "Submit Payment"}
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Step 3 — Confirmation */}
              {currentStep === 3 ? (
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                      ⏳ Payment Under Review
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Your payment has been submitted successfully. You will be
                      notified once your enrollment is approved.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/my-course-order")}
                    className="w-full bg-[#F8B2C0] hover:bg-[#F8C2C0] text-gray-900 font-bold py-2.5 sm:py-3 px-4 rounded-full transition-colors text-sm sm:text-base"
                  >
                    View My Course Orders
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Payment;
