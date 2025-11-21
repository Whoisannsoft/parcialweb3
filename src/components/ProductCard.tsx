
import type { Product } from '../features/products/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { removeProduct } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'
import './ProductCard.css'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch()
  const role = useSelector((s: RootState) => s.auth.role)

  return (
    <article className="card">
      <img src={product.image} alt={product.title} className="thumb" />
      <div className="card-body">
        <h4>{product.title}</h4>
        <p className="muted">{product.category} • ${product.price}</p>
        <p className="desc">{product.description.slice(0,100)}...</p>
        <div className="actions">
          {role === 'manager' ? (
            <button className="btn" onClick={() => dispatch(removeProduct(product.id))}>Eliminar</button>
          ) : (
            <button className="btn" onClick={() => dispatch(addToCart(product))}>Agregar al carrito</button>
          )}
        </div>
      </div>
    </article>
  )
}
