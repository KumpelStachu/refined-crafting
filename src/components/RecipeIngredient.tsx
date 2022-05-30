import { useMemo, useState } from 'react'
import useIngredients from '../hooks/useIngredients'
import { nameToKey } from '../utils'

type Props = {
	onAdd(e: { ingredient: string; quantity: number }): void
}

export default function RecipeIngredient({ onAdd }: Props) {
	const [quantityInput, setQuantityInput] = useState(1)
	const [nameInput, setNameInput] = useState('')
	const [ingredients] = useIngredients()

	const nameError = useMemo(() => !ingredients[nameToKey(nameInput)], [ingredients, nameInput])

	function handleClick() {
		if (nameError || quantityInput < 1) return

		onAdd({
			ingredient: nameInput,
			quantity: quantityInput,
		})

		setNameInput('')
		setQuantityInput(1)
	}

	return (
		<>
			<div className="form-control">
				<label
					className={`label -z-10 transition ${
						nameInput ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
					}`}
				>
					<span className="label-text-alt">Ingredient name</span>
				</label>
				<select
					value={nameInput}
					placeholder="Ingredient name"
					onChange={e => setNameInput(e.target.value)}
					className="input input-secondary input-bordered"
				>
					<option disabled value=""></option>
					{Object.values(ingredients).map(ingredient => (
						<option key={ingredient.key} value={ingredient.key}>
							{ingredient.name}
						</option>
					))}
				</select>
				<label
					className={`label -z-10 transition ${
						nameError ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
					}`}
				>
					<span className="label-text text-error">Select ingredient</span>
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
					max={64}
					type="number"
					value={quantityInput}
					placeholder="Quantity"
					onChange={e => setQuantityInput(e.target.valueAsNumber)}
					className="input input-secondary input-bordered"
				/>
				<label
					className={`label -z-10 transition ${
						quantityInput < 1 ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
					}`}
				>
					<span className="label-text text-error">Quantity &gt; 1</span>
				</label>
			</div>
			<button className="btn btn-secondary" disabled={nameError || quantityInput < 1} onClick={handleClick}>
				Add
			</button>
		</>
	)
}
