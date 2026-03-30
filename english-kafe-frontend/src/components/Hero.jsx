const lineIcon = "/logo/Line.svg"
const facebookIcon = "/logo/facebook.svg"
const instagramIcon = "/logo/instagram.svg"
const landing0 = "/hero/Landing0.png"
const landing = "/hero/landing.jpg"

function Hero() {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-20 bg-white overflow-hidden">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center max-w-6xl mx-auto relative">

        {/* Decorative Pink Shape on Left */}
        <div className="absolute -left-100 -bottom-40 w-full md:w-165 h-full md:h-160 rounded-full pointer-events-none z-0 hidden md:block" style={{backgroundColor: "#FCDCE2"}}></div>

        {/* Left Content */}
        <div className="relative z-40 ">
          <h1 className="leading-15 w-196 text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold  text-gray-900">
            Speak English with Confidence<br />
            Master Grammar at English Kafé
          </h1>

          <p className="text-[#8B6F61] mt-2 sm:mt-4 md:mt-6  sm:text-base lg:text-2xl leading-7">
            Where English learning feels relaxed, practical,<br /> and enjoyable.
          </p>

          <button className="mt-6 md:mt-8 bg-black text-white px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2 text-xs sm:text-sm md:text-base w-40 sm:w-48 md:w-56 h-15 justify-center">
            Explore Courses →
          </button>

          <div className="w-full sm:w-28 md:w-100 h-0.1 sm:h-0.5 bg-black mt-12 sm:mb-0"></div>
          
          <div className=" mt-6 sm:mt-8 md:mt-10 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm md:text-base">What we offer:</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                <li>• One-on-One English Coaching</li>
                <li>• IELTS Preparation Guidance</li>
                <li>• Conversational English Training</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <p className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm md:text-base">Contact us via:</p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img src={lineIcon} alt="LINE" className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img src={facebookIcon} alt="Facebook" className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img src={instagramIcon} alt="Instagram" className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Images Section */}
        <div className=" relative h-60 sm:h-80 md:h-full flex items-center justify-center mt-8 md:mt-0">
          
          {/* Center Image - Girl with Book */}
          <div className=" relative top-40  z-20 md:-ml-110 w-full md:w-auto">
            <img
              src={landing0}
              alt="student learning"
              className="rounded-2xl scale-100 md:rounded-4xl w-full h-full object-cover"
            />
          </div>

          {/* Top Right Image - Girl with Headphones (Blue Background) */}
          <div className="border-4 border-indigo-500 absolute  left-50 top-0 right-10  z-10  ">
              <img
                src={landing}
                alt="girl with headphones"
                className="rounded-xl scale-130 w-130 h-80 object-cover"
              />
          </div>

          {/*  Right Course Card - Grammar */}
          <div className="md:block absolute lg:-top-10 lg:left-20 top-10 left-4 z-30 rounded-xl shadow-lg p-2 md:p-3 w-56 md:w-64 lg:w-75" style={{backgroundColor: "#FCDCE2"}}>
            <div className="flex items-start gap-2">
              <span className="text-lg md:text-xl">✏️</span>
              <div>
                <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">Grammar Foundations for Writing</h4>
                <p className="text-xs text-gray-500 mt-1">12 LESSONS • 60 MINUTES</p>
              </div>
            </div>
          </div>

          {/* Bottom Right Course Card - Communication */}
          <div className="hidden md:block absolute bottom-54 lg:bottom-47 right-4 lg:right-10 z-20 rounded-xl shadow-lg p-2 md:p-3 w-56 md:w-64 lg:w-70" style={{backgroundColor: "#DDF1FC"}}>
            <div className="flex items-start gap-2">
              <span className="text-lg md:text-xl">✏️</span>
              <div>
                <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">Master English Communication</h4>
                <p className="text-xs text-gray-500 mt-1">15 LESSONS • 50 MINUTES</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero