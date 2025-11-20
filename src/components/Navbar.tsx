// src/components/Navbar.tsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import './Navbar.css' // opcional: crea un CSS simple si quieres

export default function Navbar(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const name = useSelector((state: RootState) => state.auth.name)
  const role = useSelector((state: RootState) => state.auth.role)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav style={navStyle}>
      <div style={leftStyle}>
        <Link to="/store" style={brandStyle}>TechVault</Link>
        <div style={linksStyle}>
          <Link to="/store" style={linkStyle}>Store</Link>
          {role === 'manager' && <Link to="/admin/create" style={linkStyle}>Crear producto</Link>}
          {role === 'customer' && <Link to="/cart" style={linkStyle}>Carrito</Link>}
        </div>
      </div>

      <div style={rightStyle}>
        {name ? (
          <>
            <span style={{ marginRight: 12 }}>Hola, <strong>{name}</strong> ({role})</span>
            <button onClick={handleLogout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>Iniciar sesión</Link>
        )}
      </div>
    </nav>
  )
}

