import { ArrowLeft, Plus, Trash2, Edit2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ConfirmationModal from '../../components/ConfirmationModal'

function CourseDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState(null)
  const [learnings, setLearnings] = useState([])

  // Default courses
  const defaultCourses = [
    {
      id: 1,
      title: 'IELTS SPEAKING',
      description: 'Build confidence with guided speaking practice and real exam-style questions',
      price: '3000 บาท',
      rating: 4.5,
      reviews: 141,
      image: new URL('../../assets/images/IELTS speaking.jpg', import.meta.url).href,
      learnings: [
        'Master the format of the IELTS Speaking exam',
        'Deliver structured, confident responses in all 3parts',
        'Use linking phrases for natural flow',
        'Expand topic-specific vocabulary',
        'Practice with realistic mock questions',
        'Learn examiner expectations and scoring criteria'
      ]
    },
    {
      id: 2,
      title: 'IELTS WRITING',
      description: 'Clear structure, grammar guidance, and scarring strategies for stronger essays',
      price: '3000 บาท',
      rating: 4.5,
      reviews: 141,
      image: new URL('../../assets/images/ielts writing.jpg', import.meta.url).href,
      learnings: [
        'Master essay structure and organization',
        'Develop strong grammatical accuracy',
        'Learn scoring strategies',
        'Practice with real exam questions',
        'Get feedback on your writing',
        'Improve time management'
      ]
    },
    {
      id: 3,
      title: 'GRAMMAR ESSENTIAL',
      description: 'Understand grammar simply and apply it confidently in speaking and writing',
      price: '2500 บาท',
      rating: 4.5,
      reviews: 141,
      image: new URL('../../assets/images/grammer.jpg', import.meta.url).href,
      learnings: [
        'Master fundamental grammar rules',
        'Apply grammar in real conversations',
        'Understand complex sentence structures',
        'Improve writing accuracy',
        'Build confidence in speaking',
        'Practice with interactive exercises'
      ]
    },
    {
      id: 4,
      title: 'DAILY ENGLISH',
      description: 'Improve your daily English communication skills with practical lessons',
      price: '2000 บาท',
      rating: 4.5,
      reviews: 125,
      image: new URL('../../assets/images/daily english.jpg', import.meta.url).href,
      learnings: [
        'Learn everyday conversation phrases',
        'Master common expressions',
        'Improve listening skills',
        'Practice speaking naturally',
        'Build practical vocabulary',
        'Gain confidence in social situations'
      ]
    },
    {
      id: 5,
      title: 'MASTER COMMUNICATION',
      description: 'Master communication techniques and become a confident speaker',
      price: '2800 บาท',
      rating: 4.5,
      reviews: 156,
      image: new URL('../../assets/images/master communation.jpg', import.meta.url).href,
      learnings: [
        'Master advanced communication techniques',
        'Build presentation skills',
        'Learn persuasive speaking',
        'Understand non-verbal communication',
        'Practice business English',
        'Become a confident public speaker'
      ]
    },
  ]

  // Load course and lessons on mount
  useEffect(() => {
    const courseId = parseInt(id)
    
    // Try to find in default courses
    let foundCourse = defaultCourses.find(c => c.id === courseId)
    
    // If not found, try in custom courses from localStorage
    if (!foundCourse) {
      const customCourses = JSON.parse(localStorage.getItem('courses')) || []
      foundCourse = customCourses.find(c => c.id === courseId)
    }
    
    if (foundCourse) {
      setCourse(foundCourse)
      setLearnings(foundCourse.learnings || [])
      
      // Load lessons from localStorage
      const allLessons = JSON.parse(localStorage.getItem('lessons')) || []
      const courseLessons = allLessons.filter(lesson => lesson.courseId === courseId)
      setLessons(courseLessons)
    }
  }, [id])

  const handleAddLesson = () => {
    navigate(`/courses/${id}/add-lesson`)
  }

  const handleEditLesson = (lessonId) => {
    navigate(`/courses/${id}/edit-lesson/${lessonId}`)
  }

  const handleDeleteClick = (lessonId) => {
    setLessonToDelete(lessonId)
    setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (lessonToDelete) {
      const updatedLessons = lessons.filter(lesson => lesson.id !== lessonToDelete)
      setLessons(updatedLessons)
      
      // Update localStorage
      const allLessons = JSON.parse(localStorage.getItem('lessons')) || []
      const filteredLessons = allLessons.filter(lesson => lesson.id !== lessonToDelete)
      if (filteredLessons.length > 0) {
        localStorage.setItem('lessons', JSON.stringify(filteredLessons))
      } else {
        localStorage.removeItem('lessons')
      }
    }
    setShowConfirmation(false)
    setLessonToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setLessonToDelete(null)
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Course not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex-1 text-center">Course Lessons</h1>
          <button
            onClick={handleAddLesson}
            className="flex items-center gap-2 bg-pink-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-pink-400 transition-colors font-medium"
          >
            <Plus size={20} />
            add lesson
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Course Image and Info */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md sticky top-8">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                <p className="text-lg font-bold text-gray-900 mb-6">{course.price}</p>

                {/* What you'll learn section */}
                {learnings.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">What you'll learn:</h3>
                    <ul className="space-y-2">
                      {learnings.map((learning, index) => (
                        <li key={index} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-gray-500">•</span>
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Lessons List */}
          <div className="col-span-2">
            {lessons.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 mb-2">No lessons in the course ,</p>
                <p className="text-gray-500">click add to create a new lesson</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="bg-white rounded-lg shadow-md p-6 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-gray-900">Lesson {index + 1}</span>
                        <span className="text-sm font-medium bg-blue-200 text-blue-900 px-3 py-1 rounded-full">
                          {lesson.title}
                        </span>
                      </div>
                      {lesson.videoUrl && (
                        <p className="text-sm text-gray-600">
                          <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {lesson.videoUrl}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                      <button
                        onClick={() => handleEditLesson(lesson.id)}
                        className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Edit lesson"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(lesson.id)}
                        className="flex items-center justify-center bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                        title="Delete lesson"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        title="Delete Lesson"
        message="Are you sure you want to delete this lesson? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDangerous={true}
      />
    </div>
  )
}

export default CourseDetail
