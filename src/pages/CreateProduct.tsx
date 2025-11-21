import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../features/products/productsSlice'
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {
  const [title,setTitle] = useState('')
  const [price,setPrice] = useState(0)
  const [category,setCategory] = useState('')
  const [image,setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return alert('Título requerido')
    dispatch(addProduct({ title, price, category, description: title, image }))
    navigate('/store')
  }

  return (
    <form onSubmit={handle} style={{display:'grid', gap:8, maxWidth:520}}>
      <h2>Crear producto</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" />
      <input type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} placeholder="Precio" />
      <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Categoría" />
      <input value={image} onChange={e=>setImage(e.target.value)} placeholder="URL imagen" />
      <button className="btn" type="submit">Crear</button>
    </form>
  )
}
