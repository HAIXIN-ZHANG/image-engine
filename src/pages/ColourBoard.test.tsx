import { render } from 'enzyme'
import ColourBoard from './ColourBoard'
import { findByTestAttr } from '../../test/testUtils'
import { BrowserRouter as Router } from 'react-router-dom'
import { expect } from '@jest/globals'

const setup = () => {
	return render(
		<Router>
			<ColourBoard />
		</Router>
	)
}

describe('ColourBoard page test', () => {
	const wrapper: any = setup()

	test('render without errors', () => {
		const button = findByTestAttr(wrapper, 'clickable-button')
		expect(button.length).toBe(4)

		const canvas = findByTestAttr(wrapper, 'canvas-board')
		expect(canvas.length).toBe(1)
	})
})
