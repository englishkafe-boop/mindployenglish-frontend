import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleCard from "./ArticleCard"

function Article() {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e) => {
    setIsDown(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDown(false)
  }

  const handleMouseUp = () => {
    setIsDown(false)
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 1
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 sm:mb-10 md:mb-12">
          <div className="flex-1 mb-4 sm:mb-5 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              English Tips & Learning Articles
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl">
              We share easy-to-follow articles that guide students through speaking, vocabulary, and grammar in a friendly way.
            </p>
          </div>
          <button 
            onClick={() => navigate('/blog')}
            className="text-gray-900 font-bold text-sm sm:text-base md:text-lg underline hover:text-gray-700 transition-colors whitespace-nowrap md:mt-2 cursor-pointer bg-transparent border-none mt-3 sm:mt-4 md:mt-0"
          >
            See More
          </button>
        </div>
        {/* Horizontal Scrollable Section */}
        <div 
          className="overflow-x-auto pb-2 sm:pb-3 md:pb-4 cursor-grab active:cursor-grabbing"
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ userSelect: 'none' }}
        >
          <div className="flex gap-4 sm:gap-5 md:gap-6" style={{ minWidth: 'min-content' }}>
            <div className="shrink-0" style={{ width: '280px', minWidth: '280px' }}>
              <ArticleCard
                image="/src/assets/articles/How Can You Build Confidence When Speaking English in Everyday Situations_.jpg"
                title="How Can You Build Confidence When Speaking English in Everyday Situations?"
                description="Practical techniques that help you communicate more naturally. Learn simple speaking habits, pronunciation tips, and ..."
                authorLogo="/src/assets/EnglishkafeLogo-Transparent.png"
                authorName="English Kafe"
                date="2/3/2025"
              />
            </div>
            <div className="shrink-0" style={{ width: '280px', minWidth: '280px' }}>
              <ArticleCard
                image="/src/assets/articles/Why Do Many Learners Struggle with English Grammar — and How Can You Fix It_.jpg"
                title="Why Do Many Learners Struggle with English Grammar — and How Can You Fix It?"
                description="This guide simplifies common grammar challenges with clear explanations and relatable examples you can apply immediately......"
                authorLogo="/src/assets/EnglishkafeLogo-Transparent.png"
                authorName="English Kafe"
                date="5/3/2025"
              />
            </div>
            <div className="shrink-0" style={{ width: '280px', minWidth: '280px' }}>
              <ArticleCard
                image="/src/assets/articles/Effective Ways to Remember and Use New English Vocabulary Daily.jpg"
                title="What Are Effective Ways to Remember and Use New English Vocabulary Daily?"
                description="Discover memorization techniques and contextual practice methods that make new vocabulary easier to retain and use naturally......"
                authorLogo="/src/assets/EnglishkafeLogo-Transparent.png"
                authorName="English Kafe"
                date="8/3/2025"
              />
            </div>
            <div className="shrink-0" style={{ width: '280px', minWidth: '280px' }}>
              <ArticleCard
                image="/src/assets/articles/How Should You Prepare for IELTS with Less Stress_.jpg"
                title="How Should You Prepare for IELTS to Achieve Better Results with Less Stress?"
                description="Focused preparation strategies for exam success.Understand smart study approaches, time management, and skill-building techniques that boost confidence and ...."
                authorLogo="/src/assets/EnglishkafeLogo-Transparent.png"
                authorName="English Kafe"
                date="10/3/2025"
              />
            </div>
            <div className="shrink-0" style={{ width: '280px', minWidth: '280px' }}>
              <ArticleCard
                image="/src/assets/articles/How Can You Overcome Fear and Speak English More Comfortably_.jpg"
                title="How Can You Overcome Fear and Speak English More Comfortably?"
                description="Build confidence through guided mindset and speaking tips.Learn approachable techniques that reduce hesitation ..."
                authorLogo="/src/assets/EnglishkafeLogo-Transparent.png"
                authorName="English Kafe"
                date="12/3/2025"
              />
            </div>
            <div className="shrink-0" style={{ width: '280px', minWidth: '280px' }}>
              <ArticleCard
                image={`/src/assets/articles/What Daily Habits Help You Improve English Faster_".jpg`}
                title="What Daily Habits Help You Improve English Faster and More Consistently?"
                description="Create routines that support steady language growth.Explore realistic practice ideas that fit into your schedule and turn learning into a sustainable habit....."
                authorLogo="/src/assets/EnglishkafeLogo-Transparent.png"
                authorName="English Kafe"
                date="15/3/2025"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Article
