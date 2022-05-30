import { Provider } from 'react-redux'
import IngredientsPanel from './components/IngredientsPanel'
import RecipesPanel from './components/RecipesPanel'
import RequestPanel from './components/RequestPanel'
import { saveState } from './store/storage'
import store from './store'
import { debounce } from 'debounce'
import Tabs from './components/Tabs'

store.subscribe(debounce(() => saveState(store.getState()), 1000))

function App() {
	return (
		<Provider store={store}>
			<Tabs>
				<RequestPanel />
				<IngredientsPanel />
				<RecipesPanel />
			</Tabs>
		</Provider>
	)
}

export default App
