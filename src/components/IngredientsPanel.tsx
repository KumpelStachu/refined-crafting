import useIngredients from '../hooks/useIngredients'
import AddIngredient from './AddIngredient'
import { CubeIcon, CubeTransparentIcon, TrashIcon } from '@heroicons/react/outline'
import { remove } from '../store/ingredientsSlice'
import { useMemo } from 'react'
import useRecipes from '../hooks/useRecipes'

export default function IngredientsPanel() {
	const [recipes, dispatch] = useRecipes()
	const [ingredients] = useIngredients()

	const ingredientsCount = useMemo(() => Object.keys(ingredients).length, [ingredients])
	const craftables = useMemo(
		() =>
			recipes.reduce<string[]>((acc, recipe) => [...acc, ...recipe.result.map(v => v.ingredient)], []) ?? [],
		[recipes, ingredients]
	)

	return (
		<div className="container mx-auto">
			<AddIngredient />

			<h1 className="mb-3 text-3xl font-bold">Ingredients list ({ingredientsCount})</h1>
			{!!ingredientsCount && (
				<table className="table w-full table-compact">
					<thead>
						<tr>
							<th></th>
							<th className="w-16">craftable</th>
							<th>name</th>
							<th>key</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{Object.values(ingredients).map((ingredient, index) => (
							<tr key={ingredient.key} className="hover">
								<th>{index + 1}</th>
								<td className="w-16">
									{craftables.includes(ingredient.key) ? (
										<CubeIcon className="mx-auto w-7 text-success" />
									) : (
										<CubeTransparentIcon className="mx-auto w-7 text-error" />
									)}
								</td>
								<td>{ingredient.name}</td>
								<td>{ingredient.key}</td>
								<td
									className={craftables.includes(ingredient.key) ? 'tooltip tooltip-left' : ''}
									data-tip="Delete recipe first"
								>
									<button
										className="btn btn-sm btn-square btn-outline btn-error"
										onClick={() => dispatch(remove(ingredient.key))}
										disabled={craftables.includes(ingredient.key)}
									>
										<TrashIcon className="w-5" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

IngredientsPanel.title = 'Ingredients'
