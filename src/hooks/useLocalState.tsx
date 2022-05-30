import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function useLocalState<S, N = S>(
	key: string,
	initialValue: N | null = null
): [S, Dispatch<SetStateAction<S>>] {
	const [state, setState] = useState<S>(JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)))
	const [firstRender, setFirstRender] = useState(true)

	useEffect(() => {
		if (firstRender) return setFirstRender(false)

		localStorage.setItem(key, JSON.stringify(state))
	}, [state])

	return [state, setState]
}
