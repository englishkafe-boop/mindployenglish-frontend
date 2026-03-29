import CourseCard from "./CourseCard"
import { useNavigate } from "react-router-dom"

function Courses() {
  const navigate = useNavigate()

  return (
    <section className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 bg-[#FEF7F9] overflow-hidden">
     
      <div className="relative max-w-6xl mx-auto">
         {/* Decorative blue shap on Left */}
        <div className="absolute -left-10 -top-30 w-30 md:w-30 h-30 md:h-30 rounded-full pointer-events-none z-10  " style={{ backgroundColor: "#B5E0F8" }}></div>

        <div className="absolute -left-55 -top-25 w-60 md:w-60 h-30 md:h-30 rounded-xl pointer-events-none z-10  " style={{ backgroundColor: "#B5E0F8" }}></div>

        {/* Decorative blue shap on right */}
        <div className="absolute -right-10 -bottom-30 w-30 md:w-30 h-30 md:h-30 rounded-full pointer-events-none z-10  " style={{ backgroundColor: "#B5E0F8" }}></div>

        <div className="absolute -right-55 -bottom-25 w-60 md:w-60 h-30 md:h-30 rounded-xl pointer-events-none z-10  " style={{ backgroundColor: "#B5E0F8" }}></div>
        
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 pb-2 sm:pb-3 border-b-9 border-black">
            Courses
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <CourseCard
            id={2}
            image="/src/assets/courses/ielts speaking.jpg"
            title="IELTS Speaking"
            description="Build confidence with guided speaking practice and real exam-style questions."
            price="3000 บาท "
            rating={4.5}
            reviews="4.5"
          />
          <CourseCard
            id={3}
            image="/src/assets/courses/ielts writing.jpg"
            title="IELTS WRITING"
            description="Clear structure, grammar guidance, and scoring strategies for stronger essays."
            price="4500 บาท "
            rating={4.5}
            reviews="4.5"
          />
          <CourseCard
            id={4}
            image="/src/assets/courses/daily english.jpg"
            title="Everyday English"
            description="Practice real-life conversations and vocabulary for daily communication."
            price="3500 บาท "
            rating={5}
            reviews="5.0"
          />
          <CourseCard
            id={1}
            image="/src/assets/courses/grammer.jpg"
            title="Grammar Essentials"
            description="Understand grammar simply and apply it confidently in speaking and writing."
            price="2500 บาท "
            rating={4.5}
            reviews="4.5"
          />
        </div>

        {/* View All Courses Button */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <button 
            onClick={() => navigate('/courses')}
            className="font-semibold px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2 text-sm sm:text-base" 
            style={{backgroundColor: "#B5E0F8"}}
          >
            View All Courses
            <span className="text-lg text-black">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Courses
