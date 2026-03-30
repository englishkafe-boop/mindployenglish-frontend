import Navbar from '../components/Navbar'
import RecentArticle from '../components/RecentArticle'
import ArticleCard from '../components/ArticleCard'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import logo from '../assets/Nav/EnglishkafeLogo-Transparent.png'
import article1 from '../assets/articles/Why Do Many Learners Struggle with English Grammar — and How Can You Fix It_.jpg'
import article2 from '../assets/articles/Effective Ways to Remember and Use New English Vocabulary Daily.jpg'
import article3 from '../assets/articles/How Should You Prepare for IELTS with Less Stress_.jpg'
import { useState } from 'react'

function Blog() {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Featured Blog Article Section */}
      <div className="px-4 md:px-10 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Main Article - Left Side (2 cols) */}
            <div className="md:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How to Build Real English Confidence Without Memorizing Grammar Rules
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Many learners believe fluency comes from memorizing grammar charts — but real confidence develops when grammar becomes a practical tool, not a rigid rulebook. When learners shift their focus from perfection to communication, English starts to feel natural instead of stressful.
              </p>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mb-8 space-y-4">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Real progress happens when grammar is practiced inside real situations — conversations, storytelling, and repeated exercises. Confidence grows when learners practice in context — hearing it, using it, and correcting mistakes — the brain builds patterns naturally instead of being forced.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    Why Memorization Alone Doesn't Build Confidence
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Memorizing rules can help with awareness, but it often creates hesitation. Learners pause mid-sentence trying to recall formulas instead of expressing ideas. This overthinking interrupts flow and creates speaking hesitation.
                  </p>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    When grammar is learned through context — hearing it, using it, and correcting mistakes — the brain builds patterns naturally. Over time, correct structures become instinctive instead of forced.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    Learning Grammar Through Real Communication
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Confidence improves fastest when learners use English actively. Speaking in guided conversations, repeating useful sentence patterns, and receiving supportive feedback helps you develop natural, automatic responses. This active practice builds confidence much faster than theory alone.
                  </p>
                </div>
              )}

              {/* Author Info and Read More Button */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <img 
                    src={logo}
                    alt="English Kafe" 
                    className="h-10 w-auto"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">English Kafe</p>
                    <p className="text-gray-600 text-sm">2/3/2025</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="bg-[#F8B2C0] text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-[#F8C2C0] transition-colors flex items-center gap-2"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                  <span>{isExpanded ? '↑' : '↓'}</span>
                </button>
              </div>

              {/* Featured Image */}
              <div className="mt-8">
                <img 
                  src="/src/assets/courses/daily english.jpg" 
                  alt="Featured article"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Recent Articles Sidebar - Right Side (1 col) */}
            <div className="md:col-span-1">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Recents</h2>
              
              <div className="space-y-6">
                <RecentArticle 
                  title="Why Most English Learners Plateau — And How to Break Through"
                  description="Progress often slows when learners repeat the same study habits. Discover smarter practice techniques that help you move beyond the intermediate stage with"
                  date="2/3/2025"
                />
                
                <RecentArticle 
                  title="Speaking English Smoothly: Training Your Brain, Not Just Your Vocabulary"
                  description="Fluency is about processing speed and comfort. Learn exercises that retrain your thinking patterns for more natural speech."
                  date="2/3/2025"
                />
                
                <RecentArticle 
                  title="Common Grammar Mistakes That Quietly Hurt Your Communication"
                  description="Small grammar errors can change meaning and clarity. Here are the most important fixes that instantly improve your English."
                  date="2/3/2025"
                />
                
                <RecentArticle 
                  title="Study Smarter: How Short Daily Practice Beats Long Study Sessions"
                  description="Consistency builds stronger language memory than occasional long sessions. This guide shows how to structure smarter daily learning."
                  date="2/3/2025"
                />
                
                <RecentArticle 
                  title="What Are Effective Ways to Remember and Use New English Vocabulary Daily?"
                  date="2/3/2025"
                  showReadMore={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* English Learning Insights Section */}
      <div className="px-4 md:px-10 py-12 bg-blue-50">
        <div className=" max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              English Learning Insights
            </h2>
            <div className="h-2 w-52 bg-black mx-auto"></div>
          </div>

          {/* Articles Grid */}
          <div className=" justify-items-center grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
            <ArticleCard 
              image={article1}
              title="Why Do Many Learners Struggle with English Grammar — and How Can You Fix It?"
              description="This guide simplifies common grammar challenges with clear explanations and relatable examples you can apply immediately."
              authorName="English Kafe"
              date="2/3/2025"
            />
            
            <ArticleCard 
              image={article2}
              title="What Are Effective Ways to Remember and Use New English Vocabulary Daily?"
              description="Discover memorization techniques and contextual practice methods that make new vocabulary easier to retain and use naturally."
              authorName="English Kafe"
              date="2/3/2025"
            />
            
            <ArticleCard 
              image={article3}
              title="How Should You Prepare for IELTS to Achieve Better Results with Less Stress?"
              description="Focused preparation strategies for exam success. Understand smart study approaches, time management, and skill-building techniques that boost confidence and..."
              authorName="English Kafe"
              date="2/3/2025"
            />
          </div>

          {/* View More Button */}
          <div className="flex justify-center">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              View More
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Blog

