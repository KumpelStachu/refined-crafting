export function nameToKey(name: string) {
	return name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
}

export function removeIndex<T>(array: Array<T>, index: number) {
	return [...array.slice(0, index), ...array.slice(index + 1)]
}
