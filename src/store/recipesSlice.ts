import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RecipeType = 'crafting' | 'processing'
export type Recipe = {
	type: RecipeType
	ingredients: {
		ingredient: string
		quantity: number
	}[]
	result: {
		ingredient: string
		quantity: number
	}[]
}

export const recipesStore = createSlice({
	name: 'recipes',
	initialState: [] as Recipe[],
	reducers: {
		add(state, action: PayloadAction<Recipe>) {
			state.push(action.payload)
		},
		remove(state, action: PayloadAction<number | Recipe>) {
			const deleteIndex =
				typeof action.payload === 'number' ? action.payload : state.findIndex(v => v === action.payload)

			if (state.length - 1 < deleteIndex || deleteIndex === -1) return
			state.splice(deleteIndex, 1)
		},
	},
})

export const { add, remove } = recipesStore.actions

export default recipesStore.reducer
