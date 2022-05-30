import { CubeIcon, TrashIcon } from '@heroicons/react/outline'
import useIngredients from '../hooks/useIngredients'
import useRecipes from '../hooks/useRecipes'
import { remove } from '../store/recipesSlice'
import AddRecipe from './AddRecipe'

export default function RecipesPanel() {
	const [recipes, dispatch] = useRecipes()
	const [ingredients] = useIngredients()

	return (
		<div className="container mx-auto">
			<AddRecipe />

			<h1 className="mb-3 text-3xl font-bold">Recipes list ({recipes.length})</h1>

			{!!recipes.length && (
				<table className="table w-full table-compact">
					<thead>
						<tr>
							<th></th>
							<th className="w-12">type</th>
							<th>result</th>
							<th>ingredients</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{recipes.map((recipe, index) => (
							<tr key={index} className="hover">
								<th>{index + 1}</th>
								<td>
									<div className="capitalize tooltip tooltip-right" data-tip={recipe.type}>
										{recipe.type === 'crafting' ? (
											<CubeIcon className="w-8 text-warning" />
										) : (
											<CubeIcon className="w-8 text-neutral-content" />
										)}
									</div>
								</td>
								<td>
									{recipe.result.map(({ ingredient, quantity }, index) => (
										<span key={index}>
											{ingredients[ingredient].name} &times; {quantity}
										</span>
									))}
								</td>
								<td>
									{recipe.ingredients.map(({ ingredient, quantity }) => (
										<div key={ingredient}>
											{ingredients[ingredient].name} &times; {quantity}
										</div>
									))}
								</td>
								<td>
									<button
										className="btn btn-sm btn-square btn-outline btn-error"
										onClick={() => dispatch(remove(index))}
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

RecipesPanel.title = 'Recipes'
