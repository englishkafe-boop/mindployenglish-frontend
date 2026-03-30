import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import Courses from "./pages/Courses"
import CourseDetail from "./pages/CourseDetail"
import Enroll from "./pages/Enroll"
import Payment from "./pages/Payment"
import MyCourses from "./pages/MyCourses"
import MyCourseOrder from "./pages/MyCourseOrder"
import MyProfile from "./pages/MyProfile"
import CourseLessons from "./pages/CourseLessons"
import OrderStatus from "./pages/OrderStatus"
import Blog from "./pages/Blog"
import Service from "./pages/Service"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/enroll/:courseId" element={<Enroll />} />
        <Route path="/payment/:courseId" element={<Payment />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-course-order" element={<MyCourseOrder />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/order-status/:orderId" element={<OrderStatus />} />
        <Route path="/course-lessons/:courseId" element={<CourseLessons />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  )
}

export default App