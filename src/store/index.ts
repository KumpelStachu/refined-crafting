import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './ingredientsSlice'
import recipesReducer from './recipesSlice'
import { loadState } from './storage'

const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		recipes: recipesReducer,
	},
	preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
