import { configureStore } from '@reduxjs/toolkit'

import HookPage from './HookPage'

export default configureStore({
  reducer: {
    hook: HookPage,
  },
})
