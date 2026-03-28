import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getCourseById } from '../services/courseService'

function CourseLessons() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const course = getCourseById(courseId)

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

  // Sample lessons data - in real app, this would come from backend
  const lessons = [
    { id: 1, title: 'Introduction to IELTS Speaking' },
    { id: 2, title: 'Speaking Part 1 - Personal & Familiar Topics' },
    { id: 3, title: 'Expanding Your Answers (Part 1 Techniques)' },
    { id: 4, title: 'Speaking Part 2 - The Cue Card' },
    { id: 5, title: 'Organizing Ideas for Part 2' },
    { id: 6, title: 'Speaking Part 3 - Discussion Questions' },
    { id: 7, title: 'Fluency & Coherence' },
    { id: 8, title: 'Vocabulary for Common IELTS Topics' },
    { id: 9, title: 'Pronunciation & Intonation' },
    { id: 10, title: 'Avoiding Common Mistakes' },
    { id: 11, title: 'Full Practice Test & Model Answers' },
  ]

  const courseFeatures = [
    'Master the format of the IELTS Speaking exam',
    'Deliver structured, confident responses in all 3parts',
    'Use linking phrases for natural flow',
    'Expand topic-specific vocabulary',
    'Practice with realistic mock questions',
    'Learn examiner expectations and scoring criteria'
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      {/* Back Link */}
      <div className="px-4 md:px-10 pt-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/my-courses')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
          >
            <span className="text-2xl">←</span>
            Back To My Course
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Course's Lessons
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side - Course Info */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg p-6 sticky top-20">
                {/* Course Image */}
                <div className="mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>

                {/* Course Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* What you'll learn */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">What you'll learn:</h3>
                  <ul className="space-y-2">
                    {courseFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 text-xs">
                        <span className="text-pink-400 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Lessons List */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        // Later: navigate to lesson detail page
                        alert(`Playing: ${lesson.title}`)
                      }}
                      className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-pink-300 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4 text-left flex-1">
                        <span className="text-gray-500 font-semibold text-sm w-8">
                          {index + 1}.
                        </span>
                        <span className="text-gray-900 font-semibold group-hover:text-pink-400 transition-colors">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-gray-400 group-hover:text-pink-400 transition-colors text-xl">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default CourseLessons
