import useIngredients from '../hooks/useIngredients'
import { RequestResult } from '../utils'

type Props = {
	recipe: Omit<Required<RequestResult>, 'total'>
}

export default function RecipeTree({ recipe }: Props) {
	const [ingredients] = useIngredients()

	return (
		<div className="flex items-center flex-col gap-4 hover:outline outline-1">
			<div className="badge badge-outline badge-primary badge-sm whitespace-nowrap">
				{ingredients[recipe.ingredient] ? (
					ingredients[recipe.ingredient].name
				) : (
					<span className="cursor-help text-error tooltip tooltip-error" data-tip="Unknown item">
						{recipe.ingredient}
					</span>
				)}
				&nbsp;&times; {recipe.quantity}
			</div>
			<div
				className="grid gap-2"
				style={{
					gridTemplateColumns: `repeat(${recipe.materials?.length ?? 1}, minmax(0, 1fr))`,
				}}
			>
				{recipe.materials?.map((mat, index) => mat && <RecipeTree key={index} recipe={mat as any} />)}
			</div>
		</div>
	)
}
