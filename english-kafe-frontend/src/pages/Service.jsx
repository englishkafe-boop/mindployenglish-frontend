import Navbar from "../components/Navbar"
import ContactSection from "../components/ContactSection"
import Footer from "../components/Footer"
import ServiceComponent from "../components/Service"
import lineIcon from "../assets/logo/Line.svg"
import coachImage from "../assets/service/medium-shot-smiley-teacher-with-whiteboard.jpg"

function Service() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Personal English Coaching — Learn With Real Guidance, Not Guesswork
            </h1>
            
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              Get one-on-one support to improve speaking, grammar, and confidence with practical, guided practice you can use in daily life, exams, or work.
            </p>

            {/* Contact via LINE Button */}
            <div className="pt-2 sm:pt-3 md:pt-4">
              <button className="flex items-center gap-2 sm:gap-3 bg-pink-300 hover:bg-pink-400 transition-colors px-6 sm:px-7 md:px-8 py-2 sm:py-3 md:py-4 rounded-2xl font-semibold text-sm sm:text-base md:text-lg">
                <img src={lineIcon} alt="LINE" className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8" />
                Contact vai LINE
              </button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="flex justify-center mt-6 md:mt-0">
            <img 
              src={coachImage} 
              alt="Personal English Coaching" 
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Service Component */}
      <ServiceComponent />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Service
