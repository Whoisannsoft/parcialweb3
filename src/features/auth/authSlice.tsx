import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  role: 'manager' | 'customer' | null
  name: string | null
}

const initialState: AuthState = {
  role: null,
  name: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ role: 'manager' | 'customer', name: string }>) => {
      state.role = action.payload.role
      state.name = action.payload.name
    },
    logout: (state) => {
      state.role = null
      state.name = null
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
