import ColourBoard from './pages/ColourBoard'
import WelcomePage from './pages/WelcomePage'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<BrowserRouter basename={'/my-test'}>
				<Switch>
					<Route exact path={'/'} render={() => <WelcomePage />} />
					<Route
						exact
						path={'/colour-board/:size'}
						render={() => <ColourBoard />}
					/>
					<Redirect to={'/'} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
