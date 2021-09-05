/// <reference types="Cypress" />
import {
	successMessage,
	unsuccessMessage,
	baseUrl,
} from '../../../src/constants/index'
describe('Welcome Page Test Suite', () => {
	it('My Test case', () => {
		cy.visit(baseUrl + 'my-test/colour-board/1024')

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
