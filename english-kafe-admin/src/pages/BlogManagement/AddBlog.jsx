import { ArrowLeft, Bold, Italic, Link2, Type, Quote } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

function AddBlog() {
  const navigate = useNavigate()
  const contentRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  })
  
  const [isEditorEmpty, setIsEditorEmpty] = useState(true)
  
  const [toolbar, setToolbar] = useState({
    visible: false,
    top: 0,
    left: 0,
  })
  
  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
    range: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditorChange = (e) => {
    // For contenteditable, get innerHTML instead
    const content = contentRef.current?.innerHTML || ''
    const plainText = contentRef.current?.textContent || ''
    
    setFormData(prev => ({
      ...prev,
      content: content
    }))
    
    // Update empty state
    setIsEditorEmpty(plainText.trim() === '')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTextSelection = () => {
    const editor = contentRef.current
    if (!editor) return
    
    const selection = window.getSelection()
    const selectedText = selection.toString()
    
    console.log('Text selected:', selectedText)
    
    if (selectedText.length > 0) {
      const rect = selection.getRangeAt(0).getBoundingClientRect()
      // Store selection range for later use
      setSelection({
        start: 0,
        end: 0,
        range: selection.getRangeAt(0),
      })
      setToolbar({
        visible: true,
        top: rect.top - 60,
        left: rect.left + 50,
      })
    } else {
      setToolbar({ ...toolbar, visible: false })
    }
  }

  const applyFormat = (format) => {
    const editor = contentRef.current
    if (!editor) return
    
    // Make sure the editor has focus
    editor.focus()
    
    switch (format) {
      case 'bold':
        document.execCommand('bold', false, null)
        break
      case 'italic':
        document.execCommand('italic', false, null)
        break
      case 'heading':
        // Get current selection and wrap in heading
        const heading = document.queryCommandState('formatBlock') ? 'p' : 'h3'
        document.execCommand('formatBlock', false, heading === 'h3' ? 'h3' : 'div')
        break
      case 'quote':
        document.execCommand('formatBlock', false, 'blockquote')
        break
      case 'link':
        const selection = window.getSelection()
        if (selection.toString()) {
          const url = prompt('Enter URL:', 'https://')
          if (url) {
            document.execCommand('createLink', false, url)
          }
        } else {
          alert('Please select text first')
        }
        break
      default:
        break
    }
    
    setToolbar(prev => ({ ...prev, visible: false }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Get plain text for excerpt
    const editor = contentRef.current
    const plainText = editor?.textContent || formData.content
    
    // Validate form
    if (!formData.title || !plainText.trim() || !formData.image) {
      alert('Please fill in all required fields (title, content, and image)')
      return
    }

    // Get existing blogs from localStorage
    const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    
    // Create new blog object
    const newBlog = {
      id: Date.now(),
      title: formData.title,
      excerpt: plainText.substring(0, 150) + '...',
      content: formData.content, // Store HTML content
      image: formData.image,
      author: 'English Kafe',
      date: new Date().toLocaleDateString('en-GB'),
    }

    // Add new blog to the list
    const updatedBlogs = [...existingBlogs, newBlog]
    
    // Save to localStorage
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
    
    // Navigate back to blogs
    navigate('/blog')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex-1 text-center">Add Blog</h1>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-300 text-gray-800 px-4 sm:px-6 py-2 rounded-lg hover:bg-pink-400 transition-colors font-medium text-sm sm:text-base"
          >
            publish
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Image Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-3 md:mb-4">
              Upload course image :
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center min-h-64 sm:min-h-80 md:min-h-96 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Blog preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 sm:gap-3 text-gray-500">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">Upload</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Text Editor */}
          <div className="space-y-4">
            {/* Title */}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 placeholder-gray-400 outline-none border-none focus:ring-0"
            />

            {/* Content - Rich Text Editor */}
            <div
              ref={contentRef}
              contentEditable
              suppressContentEditableWarning
              onMouseUp={handleTextSelection}
              onKeyUp={handleTextSelection}
              onInput={handleEditorChange}
              onFocus={(e) => {
                if (e.currentTarget.textContent.trim() === 'Start writing...') {
                  e.currentTarget.textContent = ''
                  setIsEditorEmpty(true)
                }
              }}
              onBlur={(e) => {
                if (e.currentTarget.textContent.trim() === '') {
                  e.currentTarget.textContent = 'Start writing...'
                  setIsEditorEmpty(true)
                }
              }}
              className="w-full h-64 sm:h-80 px-0 py-4 text-sm sm:text-base text-gray-700 outline-none border-none focus:ring-0 resize-none whitespace-pre-wrap wrap-break-word overflow-y-auto"
              style={{
                outline: 'none',
                minHeight: '256px',
                color: isEditorEmpty ? '#d1d5db' : '#374151',
              }}
            >
              Start writing...
            </div>
          </div>
        </div>
      </div>

      {/* Floating Formatting Toolbar */}
      {toolbar.visible && (
        <div
          className="fixed bg-gray-900 text-white rounded-lg shadow-lg flex items-center gap-2 p-2 z-50 animate-fadeIn"
          style={{
            top: `${toolbar.top}px`,
            left: `${toolbar.left}px`,
          }}
        >
          <button
            onClick={() => applyFormat('bold')}
            className="p-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
            title="Bold"
          >
            <Bold size={18} />
          </button>
          
          <button
            onClick={() => applyFormat('italic')}
            className="p-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
            title="Italic"
          >
            <Italic size={18} />
          </button>
          
          <div className="h-6 w-px bg-gray-700"></div>
          
          <button
            onClick={() => applyFormat('heading')}
            className="p-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
            title="Heading"
          >
            <Type size={18} />
          </button>
          
          <button
            onClick={() => applyFormat('quote')}
            className="p-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
            title="Quote"
          >
            <Quote size={18} />
          </button>
          
          <button
            onClick={() => applyFormat('link')}
            className="p-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
            title="Link"
          >
            <Link2 size={18} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        /* Rich text editor styles */
        [contenteditable] h3 {
          font-size: 1.875rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.25;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #f472b6;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #6b7280;
          font-style: italic;
        }
        
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }
        
        [contenteditable] a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  )
}

export default AddBlog
