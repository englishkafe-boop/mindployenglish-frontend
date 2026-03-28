function MotivationBanner() {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-12" style={{backgroundColor: "#F5D4DC"}}>
      <div className="max-w-6xl mx-auto relative">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 items-center">
          
          {/* Left - Logo */}
          <div className="flex justify-center md:justify-start">
            <img 
              src="/src/assets/moti/EnglishkafeLogo-Transparent.png" 
              alt="English Kafé Logo" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
            />
          </div>

          {/* Center - Main Message */}
          <div className="md:col-span-2 md:pl-6 lg:pl-8 relative">
            {/* Top Left Icon - Open */}
            <div className="absolute -left-12 sm:-left-14 md:-left-16 top-0">
              <img 
                src="/src/assets/moti/open.svg" 
                alt="Open Icon" 
                className="w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14"
              />
            </div>
            
            <div>
              {/* Top line */}
              <div className="w-20 sm:w-28 md:w-32 h-0.5 sm:h-1 bg-black mb-3 sm:mb-4"></div>
              
              {/* Message container */}
              <div>
                <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight max-w-2xl">
                  Every small effort you make in learning English<br className="hidden sm:block" />
                  today builds the confidence and fluency you<br className="hidden sm:block" />
                  will proudly use tomorrow.
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl">
                  Learn smarter, progress quicker, and speak with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Right Icon - Close */}
          <div className="absolute bottom-0 right-0 md:bottom-4 md:right-4">
            <img 
              src="/src/assets/moti/close.svg" 
              alt="Close Icon" 
              className="w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14"
            />
          </div>

        </div>

      </div>
    </section>
  )
}

export default MotivationBanner
