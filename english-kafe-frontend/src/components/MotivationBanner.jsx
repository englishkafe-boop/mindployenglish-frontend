const logoMotivation = "/moti/Watermark.JPG"
const openIcon = "/moti/open.svg"
const closeIcon = "/moti/close.svg"

function MotivationBanner() {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-12" style={{backgroundColor: "#F5D4DC"}}>
      <div className=" max-w-6xl mx-auto relative">
        
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-5 md:gap-6 items-center">
          
          {/* Left - Logo */}
          <div className=" flex justify-center md:justify-center">
            <img 
              src={logoMotivation} 
              alt="English Kafé Logo" 
              className="h-8 size-10  object-center  scale-600"
            />
          </div>

          {/* Center - Main Message */}
          <div className=" md:col-span-2 md:pl-6 lg:pl-8 relative">
            {/* Top Left Icon - Open */}
            <div className="absolute -left-25 sm:-left-20 md:-left-15 top-0">
              <img 
                src={openIcon} 
                alt="Open Icon" 
                className="w-8 sm:w-10 md:w-18 lg:w-20 h-8 sm:h-10 md:h-16 lg:h-20"
              />
            </div>
            
            <div>
              {/* Top line */}
              <div className="w-20 sm:w-28 md:w-40 h-0.5 sm:h-1 bg-black mb-3 sm:mb-4"></div>
              
              {/* Message container */}
              <div className="  p-2 sm:p-4 ">
                <h2 className="text-lg sm:text-1xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight max-w-2xl">
                  Every small effort you make in learning English
                  today builds the confidence and fluency you
                  will proudly use tomorrow.
                </h2>
                <p className="text-[#8B6F61] text-xs sm:text-sm md:text-base lg:text-lg max-w-xl">
                  Learn smarter, progress quicker, and speak with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Right Icon - Close */}
          <div className="absolute bottom-0 right-0 md:bottom-0 md:right-4">
            <img 
              src={closeIcon} 
              alt="Close Icon" 
              className="w-8 sm:w-10 md:w-18 lg:w-20 h-8 sm:h-10 md:h-16 lg:h-20"
            />
          </div>

        </div>

      </div>
    </section>
  )
}

export default MotivationBanner
