import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: 0,
  anotherValue: ""
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    changeAnotherValue: (state,action) => {
      state.anotherValue = action.payload
    }
  },
})

export const { increment, decrement, incrementByAmount,changeAnotherValue } = counterSlice.actions

export default counterSlice.reducer