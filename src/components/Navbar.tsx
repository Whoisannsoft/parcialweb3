
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = useSelector((s: RootState) => s.auth.name)
  const role = useSelector((s: RootState) => s.auth.role)

  const handleLogout = () => { dispatch(logout()); navigate('/login') }

  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/store" className="brand">TechVault</Link>
        <nav className="nav-links">
          <Link to="/store">Store</Link>
          {role === 'manager' && <Link to="/admin/create">Crear producto</Link>}
          {role === 'customer' && <Link to="/cart">Carrito</Link>}
        </nav>
      </div>
      <div className="nav-right">
        {name ? (
          <>
            <span className="greet">Hola, <strong>{name}</strong> ({role})</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </div>
    </header>
  )
}
