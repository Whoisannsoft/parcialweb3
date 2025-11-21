
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { removeFromCart, clearCart } from '../features/cart/cartSlice'

export default function Cart() {
  const items = useSelector((s: RootState) => s.cart.items)
  const dispatch = useDispatch()
  const total = items.reduce((sum, p) => sum + Number(p.price), 0)

  return (
    <section>
      <h2>Carrito</h2>
      {items.length === 0 ? <p>Tu carrito está vacío</p> : (
        <>
          <ul>
            {items.map((it, idx) => (
              <li key={idx}>
                {it.title} - ${it.price}
                <button onClick={() => dispatch(removeFromCart(idx))} className="btn">Eliminar</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <button className="btn" onClick={() => dispatch(clearCart())}>Finalizar compra</button>
        </>
      )}
    </section>
  )
}
