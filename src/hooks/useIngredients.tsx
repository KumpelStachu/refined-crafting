import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { IngredientsList } from '../store/ingredientsSlice'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

export default (): [IngredientsList, ReturnType<typeof useAppDispatch>] => [
	useAppSelector<IngredientsList>(state => state.ingredients),
	useAppDispatch(),
]
