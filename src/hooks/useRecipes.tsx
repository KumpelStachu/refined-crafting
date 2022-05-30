import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { Recipe } from '../store/recipesSlice'

export default (): [Recipe[], ReturnType<typeof useAppDispatch>] => [
	useAppSelector<Recipe[]>(state => state.recipes),
	useAppDispatch(),
]
