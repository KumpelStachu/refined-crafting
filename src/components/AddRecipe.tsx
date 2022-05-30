import { TrashIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import useIngredients from '../hooks/useIngredients'
import { add, RecipeType } from '../store/recipesSlice'
import { removeIndex } from '../utils'
import RecipeIngredient from './RecipeIngredient'

type Item = {
	ingredient: string
	quantity: number
}

export default function AddRecipe() {
	const [ingredients, dispatch] = useIngredients()

	const [ingredientsList, setIngredientsList] = useState<Item[]>([])
	const [resultsList, setResultsList] = useState<Item[]>([])
	const [typeInput, setTypeInput] = useState<RecipeType>('crafting')

	useEffect(() => {
		setTypeInput(typeInput === 'processing' || resultsList.length > 1 ? 'processing' : 'crafting')
	}, [typeInput, resultsList])

	function handleClick() {
		dispatch(add({ type: typeInput, ingredients: ingredientsList, result: resultsList }))

		setTypeInput('crafting')
		setIngredientsList([])
		setResultsList([])
	}

	return (
		<div className="grid grid-cols-2 gap-3">
			<div className="flex items-center justify-start gap-3">
				<RecipeIngredient onAdd={e => setIngredientsList([...ingredientsList, e])} />
			</div>
			<div className="flex items-center justify-end gap-3">
				<RecipeIngredient onAdd={e => setResultsList([...resultsList, e])} />
			</div>

			<table className="table w-full mb-auto table-compact">
				<thead>
					<tr>
						<th></th>
						<th>ingredient</th>
						<th>quantity</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ingredientsList.map(({ ingredient, quantity }, index) => (
						<tr key={index} className="hover">
							<th>{index + 1}</th>
							<td>{ingredients[ingredient].name}</td>
							<td>{quantity}</td>
							<td>
								<button
									className="btn btn-sm btn-square btn-outline btn-error"
									onClick={() => setIngredientsList(removeIndex(ingredientsList, index))}
								>
									<TrashIcon className="w-5" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<table className="table w-full mb-auto table-compact">
				<thead>
					<tr>
						<th></th>
						<th>result</th>
						<th>quantity</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{resultsList.map(({ ingredient, quantity }, index) => (
						<tr key={index} className="hover">
							<th>{index + 1}</th>
							<td>{ingredients[ingredient].name}</td>
							<td>{quantity}</td>
							<td>
								<button
									className="btn btn-sm btn-square btn-outline btn-error"
									onClick={() => setResultsList(removeIndex(resultsList, index))}
								>
									<TrashIcon className="w-5" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex flex-col items-center col-span-full">
				<label className={`gap-2 label ${resultsList.length > 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
					<span className="label-text">Crafting</span>
					<input
						type="checkbox"
						className={`toggle toggle-secondary ${
							resultsList.length > 1 ? 'cursor-not-allowed' : 'cursor-pointer'
						}`}
						checked={typeInput === 'processing'}
						onChange={e => setTypeInput(e.target.checked ? 'processing' : 'crafting')}
					/>
					<span className="label-text">Processing</span>
				</label>
				<button
					className="btn btn-wide"
					disabled={!(ingredientsList.length && resultsList.length)}
					onClick={handleClick}
				>
					Add Recipe
				</button>
			</div>
		</div>
	)
}
