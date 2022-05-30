import { useMemo, useState } from 'react'
import useIngredients from '../hooks/useIngredients'
import { add } from '../store/ingredientsSlice'
import { nameToKey } from '../utils'

export default function AddIngredient() {
	const [ingredients, dispatch] = useIngredients()
	const [input, setInput] = useState('')

	const error = useMemo(() => !!ingredients[nameToKey(input)], [ingredients, input])

	function handleClick() {
		if (!input) return
		dispatch(add(input))
		setInput('')
	}

	return (
		<div className="flex items-center justify-center gap-3">
			<div className="form-control">
				<label
					className={`label -z-10 transition ${
						input ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
					}`}
				>
					<span className="label-text-alt">Ingredient name</span>
				</label>
				<input
					type="text"
					value={input}
					placeholder="Ingredient name"
					onChange={e => setInput(e.target.value)}
					className="input input-secondary input-bordered"
				/>
				<label
					className={`label -z-10 transition ${
						error ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
					}`}
				>
					<span className="label-text text-error">Ingredient already exists</span>
				</label>
			</div>
			<button className="btn btn-secondary" disabled={error || !input} onClick={handleClick}>
				Add
			</button>
		</div>
	)
}
