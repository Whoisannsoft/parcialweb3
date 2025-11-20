import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  title: string
  price: number
  category: string
  description: string
  image: string
  local?: boolean
}

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading'
}

const initialState: ProductsState = {
  items: [],
  status: 'idle'
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products?limit=20')
    const data = await res.json()
    return data as Product[]
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        ...action.payload,
        local: true
      }
      state.items.unshift(newProduct)
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(p => p.id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {

        const apiProducts = action.payload.map(p => ({
          ...p,
          id: String(p.id),
          local: false
        }))
        state.items = [...apiProducts, ...state.items]
        state.status = 'idle'
      })
  }
})

export const { addProduct, removeProduct } = productsSlice.actions
export default productsSlice.reducer
