function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Copyright */}
          <div className="text-gray-700 text-sm md:text-base">
            Copyright 2026 © <span className="font-bold">English Kafé</span>. All rights reserved.
          </div>

          {/* Right - Links */}
          <div className="flex items-center gap-6 text-gray-700 text-sm md:text-base">
            <a 
              href="#privacy" 
              className="hover:text-gray-900 transition-colors font-medium"
            >
              Privacy Policy
            </a>
            <span className="text-gray-400">|</span>
            <a 
              href="#cookies" 
              className="hover:text-gray-900 transition-colors font-medium"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
