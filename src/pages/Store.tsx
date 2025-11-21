import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../features/products/productsSlice'
import type { RootState, AppDispatch } from '../app/store'
import ProductCard from '../components/ProductCard'

export default function Store() {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((s: RootState) => s.products.items)
  const status = useSelector((s: RootState) => s.products.status)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <section>
      <h2>Tienda</h2>
      {status === 'loading' && <p>Cargando productos...</p>}
      <div>
        {items?.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
