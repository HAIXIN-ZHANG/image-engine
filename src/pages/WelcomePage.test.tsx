import { render } from 'enzyme'
import WelcomePage from './WelcomePage'
import { findByTestAttr } from '../../test/testUtils'
import { BrowserRouter as Router } from 'react-router-dom'
import { expect } from '@jest/globals'

const setup = () => {
	return render(
		<Router>
			<WelcomePage />
		</Router>
	)
}

describe('Welcome Page test', () => {
	const wrapper = setup()

	test('render without errors', () => {
		const minSizeRadio = findByTestAttr(wrapper, 'min-size-radio')

		expect(minSizeRadio.length).toBe(1)

		const midSizeRadio = findByTestAttr(wrapper, 'mid-size-radio')
		expect(midSizeRadio.length).toBe(1)

		const largeSizeRadio = findByTestAttr(wrapper, 'large-size-radio')
		expect(largeSizeRadio.length).toBe(1)

		const confirmButton = findByTestAttr(wrapper, 'confirm-button')
		expect(confirmButton.length).toBe(1)
	})
})
