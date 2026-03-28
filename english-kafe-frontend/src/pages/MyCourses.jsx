import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyCourseCard from '../components/MyCourseCard'
import { coursesData } from '../services/courseService'

function MyCourses() {
  const navigate = useNavigate()

  // For now, show all courses as "enrolled" 
  // Later, this will show only user's purchased courses from backend
  const enrolledCourses = coursesData.slice(0, 5)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="px-4 md:px-10 py-12 text-center bg-blue-50">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          My Courses
        </h1>
      </div>

      {/* Courses Grid */}
      <div className="px-4 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <MyCourseCard
                key={course.id}
                id={course.id}
                image={course.image}
                title={course.title}
                description={course.description}
                lessons={course.lessons}
                buttonText="Learn Now"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MyCourses
