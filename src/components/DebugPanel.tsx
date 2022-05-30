import { FormEvent, useState } from 'react'
import { loadState, STORAGE_KEY } from '../store/storage'
import PrettyJSON from './PrettyJSON'

export default function DebugPanel() {
	const [storage, setStorage] = useState(loadState())
	const [debugInput, setDebugInput] = useState('')

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		localStorage.setItem(STORAGE_KEY, JSON.stringify(JSON.parse(debugInput)))
		location.reload()
	}

	return (
		<div className="space-y-3">
			<form className="flex gap-3" onSubmit={handleSubmit}>
				<input
					onChange={e => setDebugInput(e.target.value)}
					className="flex-1 input input-bordered input-error"
					placeholder="localStorage"
					value={debugInput}
					required
				/>
				<button className="btn btn-error" onClick={() => setStorage(loadState())}>
					update
				</button>
			</form>

			<input className="w-full input input-bordered" value={JSON.stringify(storage.ingredients)} readOnly />
			<input className="w-full input input-bordered" value={JSON.stringify(storage.recipes)} readOnly />

			<PrettyJSON value={storage}>
				<div className="absolute space-x-3 top-3 right-3">
					<button className="btn btn-outline" onClick={() => setStorage(loadState())}>
						Refresh
					</button>
				</div>
			</PrettyJSON>
		</div>
	)
}

DebugPanel.title = 'Debug'
