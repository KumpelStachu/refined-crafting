import { Recipe } from './store/recipesSlice'

export function nameToKey(name: string) {
	return name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
}

export function removeIndex<T>(array: Array<T>, index: number) {
	return [...array.slice(0, index), ...array.slice(index + 1)]
}

class CircleDependencyError extends Error {}

export type RequestResult = Recipe['result'][number] & {
	materials?: Omit<RequestResult, 'total'>[]
	total: Recipe['result'][number][]
}

export function request(recipes: Recipe[], item: Recipe['result'][number]): RequestResult {
	const res = _request(recipes, item)
	return { ...res, total: total(res.materials) }
}

function _request(
	recipes: Recipe[],
	item: Recipe['result'][number],
	craftingList = new Set<string>()
): Omit<ReturnType<typeof request>, 'total'> {
	if (craftingList.has(item.ingredient)) throw new CircleDependencyError(item.ingredient)

	const recipe =
		recipes.find(v => v.type === 'crafting' && v.result.find(v => v.ingredient === item.ingredient)) ||
		recipes.find(v => v.type === 'processing' && v.result.find(v => v.ingredient === item.ingredient))
	if (!recipe) return { ...item }

	craftingList.add(item.ingredient)
	return {
		ingredient: item.ingredient,
		quantity:
			Math.ceil(item.quantity / recipe.result.find(v => v.ingredient === item.ingredient)!.quantity) *
			recipe.result.find(v => v.ingredient === item.ingredient)!.quantity,
		materials: recipe.ingredients.map(v =>
			_request(
				recipes,
				{
					...v,
					quantity:
						Math.ceil(item.quantity / recipe.result.find(v => v.ingredient === item.ingredient)!.quantity) *
						v.quantity,
				},
				new Set(craftingList)
			)
		),
	}
}

function total(materials: Required<RequestResult['materials']>): RequestResult['total'] {
	return materials!
		.map(mat => (mat.materials ? total(mat.materials) : mat))
		.flat()
		.reduce((acc, val) => {
			const item = acc.find(v => v.ingredient === val.ingredient)
			if (item) item.quantity += val.quantity
			return item ? acc : [...acc, val]
		}, [] as RequestResult['total'])
}
