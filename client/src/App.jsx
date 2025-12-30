import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentForm from './pages/StudentForm';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/form" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/form" />} />
      <Route path="/form" element={user ? <StudentForm /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/course/:id" element={user ? <CourseDetails /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
