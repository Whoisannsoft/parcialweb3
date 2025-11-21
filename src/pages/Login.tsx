import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [name, setName] = useState('')
  const [role, setRole] = useState<'manager'|'customer'>('customer')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return alert('Escribe tu nombre')
    dispatch(login({ name, role }))
    navigate('/store')
  }

  return (
    <form onSubmit={handle} style={{display:'grid', gap:8, maxWidth:420}}>
      <h2>Iniciar sesión</h2>
      <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value as any)}>
        <option value="customer">Customer</option>
        <option value="manager">Manager</option>
      </select>
      <button className="btn" type="submit">Entrar</button>
    </form>
  )
}