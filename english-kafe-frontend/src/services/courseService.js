// Course data - shared across all pages
export const coursesData = [
  {
    id: 1,
    image: '/src/assets/courses/IELTS speaking.jpg',
    title: 'IELTS SPEAKING',
    description: 'Build confidence with guided speaking practice and real exam-style questions.',
    price: '3000 ฿ผน',
    rating: 4.5,
    reviews: 1500,
    lessons: 23,
    fullDescription: 'Understand grammar simply and apply it confidently in speaking and writing. This course breaks down core grammar rules into practical lessons you can use in everyday communication.'
  },
  {
    id: 2,
    image: '/src/assets/courses/ielts writing.jpg',
    title: 'IELTS WRITING',
    description: 'Clear structure, grammar guidance, and scoring strategies for stronger essays.',
    price: '4500 ฿ผน',
    rating: 4.5,
    reviews: 1500,
    lessons: 20,
    fullDescription: 'Master IELTS writing with comprehensive guidance on essay structure, grammar, and scoring strategies.'
  },
  {
    id: 3,
    image: '/src/assets/courses/daily english.jpg',
    title: 'EVERYDAY ENGLISH',
    description: 'Practice real-life conversations and vocabulary for daily communication.',
    price: '3500 ฿ผน',
    rating: 4.5,
    reviews: 1500,
    lessons: 25,
    fullDescription: 'Learn practical English for everyday situations with real-world conversation practice and vocabulary.'
  },
  {
    id: 4,
    image: '/src/assets/courses/grammer.jpg',
    title: 'GRAMMAR ESSENTIALS',
    description: 'Understand grammar simply and apply it confidently in speaking and writing.',
    price: '2500 ฿ผน',
    rating: 4.5,
    reviews: 1500,
    lessons: 23,
    fullDescription: 'Understand grammar simply and apply it confidently in speaking and writing. This course breaks down core grammar rules into practical lessons you can use in everyday communication.'
  },
  {
    id: 5,
    image: '/src/assets/courses/master communation.jpg',
    title: 'MASTER ENGLISH COMMUNICATION',
    description: 'Build confidence in real-life conversations through guided video lessons focused on...',
    price: '5500 ฿ผน',
    rating: 4.5,
    reviews: 1500,
    lessons: 30,
    fullDescription: 'Build confidence in real-life conversations through guided video lessons focused on practical communication skills.'
  },
  {
    id: 6,
    image: '/src/assets/courses/IELTS speaking.jpg',
    title: 'TOEFL PREPARATION',
    description: 'Comprehensive TOEFL exam preparation with practice tests and expert guidance.',
    price: '5000 ฿ผน',
    rating: 4.5,
    reviews: 1600,
    lessons: 28,
    fullDescription: 'Comprehensive TOEFL exam preparation with practice tests and expert guidance for success.'
  },
  {
    id: 7,
    image: '/src/assets/courses/ielts writing.jpg',
    title: 'CONVERSATION FLUENCY',
    description: 'Develop natural conversational English through interactive role-play scenarios.',
    price: '3600 ฿ผน',
    rating: 4.5,
    reviews: 1350,
    lessons: 22,
    fullDescription: 'Develop natural conversational English through interactive role-play scenarios and real-world practice.'
  },
  {
    id: 8,
    image: '/src/assets/courses/daily english.jpg',
    title: 'ADVANCED LISTENING',
    description: 'Improve your listening skills with real-world English from movies and podcasts.',
    price: '3800 ฿ผน',
    rating: 4.5,
    reviews: 1300,
    lessons: 24,
    fullDescription: 'Improve your listening skills with real-world English from movies, podcasts, and authentic sources.'
  },
  {
    id: 9,
    image: '/src/assets/courses/grammer.jpg',
    title: 'PRONUNCIATION MASTER',
    description: 'Perfect your English pronunciation with detailed audio and video explanations.',
    price: '3200 ฿ผน',
    rating: 4.5,
    reviews: 1100,
    lessons: 20,
    fullDescription: 'Perfect your English pronunciation with detailed audio and video explanations and practice exercises.'
  },
  {
    id: 10,
    image: '/src/assets/courses/master communation.jpg',
    title: 'VOCABULARY BUILDER',
    description: 'Expand your English vocabulary with context-based learning and memory techniques.',
    price: '2800 ฿ผน',
    rating: 4.5,
    reviews: 1200,
    lessons: 26,
    fullDescription: 'Expand your English vocabulary with context-based learning and effective memory techniques.'
  },
  {
    id: 11,
    image: '/src/assets/courses/IELTS speaking.jpg',
    title: 'BUSINESS ENGLISH',
    description: 'Master professional communication for workplace success and international business.',
    price: '4000 ฿ผน',
    rating: 4.5,
    reviews: 1200,
    lessons: 27,
    fullDescription: 'Master professional communication for workplace success and international business environments.'
  },
  {
    id: 12,
    image: '/src/assets/courses/ielts writing.jpg',
    title: 'ADVANCED CONVERSATION',
    description: 'Develop natural conversational English through interactive role-play scenarios.',
    price: '3600 ฿ผน',
    rating: 4.5,
    reviews: 1350,
    lessons: 21,
    fullDescription: 'Develop advanced conversational English through interactive role-play scenarios and authentic practice.'
  }
]

// Service methods
export const getAllCourses = () => {
  return coursesData
}

export const getCourseById = (id) => {
  return coursesData.find(course => course.id === parseInt(id))
}

export const getCoursesByPage = (page, itemsPerPage = 6) => {
  const startIndex = (page - 1) * itemsPerPage
  return coursesData.slice(startIndex, startIndex + itemsPerPage)
}

export const getTotalPages = (itemsPerPage = 6) => {
  return Math.ceil(coursesData.length / itemsPerPage)
}
