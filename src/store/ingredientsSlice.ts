import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nameToKey } from '../utils'

export type Ingredient = {
	key: string
	name: string
}

export type IngredientsList = { [name: Ingredient['name']]: Ingredient }

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: {} as IngredientsList,
	reducers: {
		add(state, action: PayloadAction<string>) {
			const key = nameToKey(action.payload)
			if (state[key]) return

			state[key] = {
				key,
				name: action.payload,
			}
		},
		remove(state, action: PayloadAction<string>) {
			if (!state[action.payload]) return
			delete state[action.payload]
		},
	},
})

export const { add, remove } = ingredientsSlice.actions

export default ingredientsSlice.reducer
