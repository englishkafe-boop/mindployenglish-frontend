import lineIcon from "../assets/logo/Line.svg"
import facebookIcon from "../assets/logo/facebook.svg"
import instagramIcon from "../assets/logo/instagram.svg"

function ContactSection() {
  return (
    <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-16 bg-pink-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Side - Contact Information */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              Contact Us
            </h2>

            {/* Phone */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-gray-900 mt-0.5 shrink-0">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l2.482 5.265a1 1 0 00.578.578l5.265 2.482a1 1 0 00.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-gray-900">089 191 5555</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-gray-900 mt-0.5 shrink-0">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-gray-900">english.kafe@gmail.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="text-gray-900 mt-0.5 shrink-0">
                <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-sm sm:text-base">
                  355 สินโดงหลวง ซอย 6 Tambon Rop Wiang,<br />
                  Mueang Chiang Rai District, Chiang Rai 57000, Thailand
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="LINE"
              >
                <img src={lineIcon} alt="LINE" className="w-10 sm:w-12 h-10 sm:h-12" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Facebook"
              >
                <img src={facebookIcon} alt="Facebook" className="w-10 sm:w-12 h-10 sm:h-12" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Instagram"
              >
                <img src={instagramIcon} alt="Instagram" className="w-10 sm:w-12 h-10 sm:h-12" />
              </a>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="rounded-2xl overflow-hidden border-4 border-blue-300 shadow-lg h-64 sm:h-80 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.7299999999997!2d100.78!3d19.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d0f8f8f8f8f8f9%3A0x0!2sEnglish%20Kafe!5e0!3m2!1sen!2sth!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
