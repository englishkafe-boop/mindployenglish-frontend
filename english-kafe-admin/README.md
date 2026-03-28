# English Kafé Admin Dashboard

Admin dashboard for English Kafé learning platform built with React, Vite, and Tailwind CSS.

## Features

- 📊 Dashboard with statistics
- 📚 Course Management (Create, Read, Update, Delete)
- 👥 User Management
- 🛒 Order Management
- 👨‍🏫 Instructor Management
- 📈 Analytics & Reports
- ⚙️ Settings Management
- 👤 Admin Profile Management

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The admin dashboard will run on `http://localhost:5174`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── CourseManagement/
│   ├── UserManagement/
│   ├── OrderManagement/
│   ├── InstructorManagement/
│   ├── Reports/
│   ├── Settings/
│   └── Dashboard.jsx
├── services/           # API services (to be implemented)
├── hooks/             # Custom React hooks
├── context/           # React context
├── utils/             # Utility functions
├── styles/            # Global styles
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Login Credentials (Demo)

- **Email**: admin@example.com
- **Password**: (any value)

## Technologies Used

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Lucide Icons
- Recharts (for charts)
- Axios (for API calls)

## Next Steps

1. Implement course management features
2. Add data tables and filtering
3. Integrate with backend API
4. Add analytics charts
5. Implement user management
6. Add export/report generation
