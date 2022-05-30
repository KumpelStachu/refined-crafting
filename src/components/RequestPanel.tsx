import { useMemo, useState } from 'react'
import useIngredients from '../hooks/useIngredients'
import useRecipes from '../hooks/useRecipes'
import { request } from '../utils'
import PrettyJSON from './PrettyJSON'
import RecipeTree from './RecipeTree'

export default function RequestPanel() {
	const [quantityInput, setQuantityInput] = useState(1)
	const [nameInput, setNameInput] = useState('')
	const [ingredients] = useIngredients()
	const [recipes] = useRecipes()

	const numberError = useMemo(() => isNaN(quantityInput) || quantityInput < 1, [quantityInput])
	const nameError = useMemo(() => !ingredients[nameInput], [ingredients, nameInput])

	const craftables = useMemo(
		() =>
			recipes.reduce<string[]>((acc, recipe) => [...acc, ...recipe.result.map(v => v.ingredient)], []) ?? [],
		[recipes, ingredients]
	)

	const requested = useMemo(
		() =>
			!(numberError || nameError)
				? request(recipes, { ingredient: nameInput, quantity: quantityInput })
				: null,
		[recipes, nameInput, quantityInput]
	)

	return (
		<div className="space-y-3">
			<div className="flex justify-center gap-3">
				<div className="form-control">
					<label
						className={`label -z-10 transition ${
							nameInput ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
						}`}
					>
						<span className="label-text-alt">Recipe</span>
					</label>
					<select
						value={nameInput}
						onChange={e => setNameInput(e.target.value)}
						className="input input-secondary input-bordered w-max"
					>
						<option disabled value=""></option>
						{craftables.map(key => (
							<option key={key} value={key}>
								{ingredients[key].name}
							</option>
						))}
					</select>
					<label
						className={`label -z-10 transition ${
							nameError ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
						}`}
					>
						<span className="label-text text-error">Select recipe</span>
					</label>
				</div>
				<div className="w-28 form-control">
					<label
						className={`label -z-10 transition ${
							quantityInput ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
						}`}
					>
						<span className="label-text-alt">Quantity</span>
					</label>
					<input
						min={1}
						type="number"
						value={quantityInput}
						placeholder="Quantity"
						onChange={e => setQuantityInput(e.target.valueAsNumber)}
						className="input input-secondary input-bordered"
					/>
					<label
						className={`label -z-10 transition ${
							numberError ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
						}`}
					>
						<span className="label-text text-error">Quantity &gt; 1</span>
					</label>
				</div>
			</div>

			<div className="overflow-x-auto">{requested && <RecipeTree recipe={requested as any} />}</div>
			<PrettyJSON value={requested} />
		</div>
	)
}

RequestPanel.title = 'Requester'
