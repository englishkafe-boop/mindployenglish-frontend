function Instructors() {
  return (
    <section className=" relative px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-20 bg-[#F8FCFE]">
      <div className=" max-w-6xl mx-auto ">
        
        {/* Title Section */}
        <div className=" text-center mb-0 sm:mb-2 md:mb-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
            Learn English with supportive instructors<br />
            who guide you step by step.
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-4xl mx-auto px-2" style={{color: "#8B6F61"}}>
            Friendly teaching, real conversations, and confidence-building lessons — all designed to help you grow.
          </p>
        </div>

        {/* Our Instructors Label */}
        <div className=" text-center  sm:mb-8">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Our Instructors :</h3>
        </div>

        {/* Instructors Cards */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 ">
          
          {/* Instructor 1 - Pink Card */}
          <div className=" relative group w-1/2 left-60 rounded-3xl overflow-hidden">
            <div className="h-48 sm:h-64 md:h-80 lg:h-96" style={{backgroundColor: "#D4899B"}}>
              <img 
                src="/src/assets/instructors/instructor1.jpg" 
                alt="Ms.Patiln Jintanawong" 
                className="w-full h-full object-cover"
              />
              {/* Name and Credential */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end items-center p-4 sm:p-5 md:p-6">
                <h4 className="text-white font-semibold text-sm sm:text-base md:text-lg text-center">Ms.Patiln Jintanawong</h4>
                <p className="text-white/90 text-xs sm:text-sm text-center mt-1">MA.ENGLISH</p>
              </div>
            </div>
          </div>

          {/* Instructor 2 - Gray Card */}
          <div className="relative group w-1/2 rounded-3xl overflow-hidden">
            <div className="h-48 sm:h-64 md:h-80 lg:h-96" style={{backgroundColor: "#C0C0C0"}}>
              <img 
                src="/src/assets/instructors/instructor2.jpg" 
                alt="Ms.Panida Mounjoy" 
                className="w-full h-full object-cover"
              />
              {/* Name and Credential */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end items-center p-4 sm:p-5 md:p-6">
                <h4 className="text-white font-semibold text-sm sm:text-base md:text-lg text-center">Ms.Panida Mounjoy</h4>
                <p className="text-white/90 text-xs sm:text-sm text-center mt-1">MA:ENGLISH</p>
              </div>
            </div>
          </div>

        </div>

        {/* What Will You Get Section */}
        <div className=" rounded-2xl p-2 sm:p-6 md:p-8 lg:p-4 max-w-5xl mx-auto">
          <h3 className=" text-center text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            What will you get:
          </h3>

          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            
            {/* Feature 1 */}
            <div className=" flex items-start justify-self-end gap-3 sm:gap-4">
              <div className="border-2 border-gray-300 w-5 sm:w-6 h-5 sm:h-6 rounded-xs flex items-start justify-center shrink-0 mt-0.5" style={{backgroundColor: "#FCDCE2"}}>
                <svg className="w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"/>
                  <polyline points="12 5 19 5 19 12"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  Clear grammar explained in a simple way
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className=" flex items-start gap-3 sm:gap-4">
              <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-xs flex items-center justify-center shrink-0 mt-0.5" style={{backgroundColor: "#FCDCE2"}}>
                <svg className="w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"/>
                  <polyline points="12 5 19 5 19 12"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  Ask questions and grow your confidence
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start justify-self-end gap-3 sm:gap-4">
              <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-xs flex items-center justify-center shrink-0 mt-0.5" style={{backgroundColor: "#FCDCE2"}}>
                <svg className="w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"/>
                  <polyline points="12 5 19 5 19 12"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  Step-by-step guidance from supportive instructors
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-xs flex items-center justify-center shrink-0 mt-0.5" style={{backgroundColor: "#FCDCE2"}}>
                <svg className="w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"/>
                  <polyline points="12 5 19 5 19 12"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  Learn in a friendly, pressure-free environment
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Instructors
