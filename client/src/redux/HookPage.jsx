import { createSlice } from '@reduxjs/toolkit'

export const HookPage = createSlice({
    name: 'hook',
    initialState: {
        value: null,
    },
    reducers: {
        setHook: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setHook } = HookPage.actions

export default HookPage.reducer
