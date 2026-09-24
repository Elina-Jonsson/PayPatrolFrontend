import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import DashboardPage from "./pages/Dashboard"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
