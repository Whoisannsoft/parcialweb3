
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Store from './pages/Store'
import CreateProduct from './pages/CreateProduct'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

export default function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/store" element={<Store />} />
          <Route
            path="/admin/create"
            element={
              <ProtectedRoute requiredRole="manager">
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="customer">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
