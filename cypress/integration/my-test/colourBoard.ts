/// <reference types="Cypress" />

describe('Welcome Page Test Suite', () => {
	it('My Test case', () => {
		const successMessage = 'Successfully Generated Image'
		const unsuccessMessage = 'Successfully Generated Image'
		cy.visit('http://localhost:3000/my-test/colour-board/1024')

		cy.get('[data-test="canvas-board"]').should('have.css', 'width', '1024px')
		cy.get('[data-test="canvas-board"]').should('have.css', 'height', '512px')

		// Reset Image button
		cy.get('[data-test="button-group"] > :nth-child(1)').click()
		cy.get('[data-test="success-alert"]').contains(successMessage)

		// 	Generate Image Without an ApiCall
		cy.get('[data-test="button-group"] > :nth-child(2)').click()
		cy.get('[data-test="success-alert"]').contains(successMessage)

		// 	Successfully Generate Image
		cy.get('[data-test="button-group"] > :nth-child(3)').click()
		cy.get('[data-test="success-alert"]').contains(successMessage)

		// Unsuccessfully Generate Image button
		cy.get('[data-test="button-group"] > :nth-child(4)').click()
		cy.get('[data-test="success-alert"]').contains(unsuccessMessage)
	})
})
