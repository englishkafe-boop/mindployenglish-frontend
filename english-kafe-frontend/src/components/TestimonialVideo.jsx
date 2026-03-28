function TestimonialVideo({ image, backgroundColor }) {
  return (
    <div className={`${backgroundColor} rounded-3xl overflow-hidden relative h-80 flex items-center justify-center group cursor-pointer`}>
      {/* Background Image */}
      <img 
        src={image} 
        alt="Student testimonial"
        className="w-full h-full object-cover"
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
        <button className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg">
          <svg 
            className="w-8 h-8 text-white ml-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </button>
      </div>

      {/* YouTube Badge */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.957a1 1 0 00.95.69h4.161c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.049 9.384c-.783-.57-.381-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.287-3.957z" />
        </svg>
        <span className="text-white font-semibold text-sm">WATCH IT ON</span>
      </div>
    </div>
  )
}

export default TestimonialVideo
