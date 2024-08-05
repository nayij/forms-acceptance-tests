
/// <reference types="cypress" />
// @ts-check
import "cypress-axe"
describe.skip('Accessibilty of a form in runner', () => {

    it('Axe core -  accessiblity test',() => {
    cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/jn-june-declaration')
     cy.injectAxe() // Inject axe-core into the page
     // Run accessibility tests on the page
     cy.checkA11y(null, {
      includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
      })
  
    })
  
    it.only('Axe core -  accessiblity test after error',() => {
      cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/jn-june-declaration')
      cy.get('#submit').click()
      cy.injectAxe();
      cy.checkA11y(null, {
        includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
        })
      })
  
  })
  
  describe('Page not found on the runner', () => {
    it('Page not found should be displayed when trying to reach non existent form', () =>{
      cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/bob-123/non-existant-form', {'failOnStatusCode': false})
      cy.get('.govuk-heading-l').should('contain.text', 'Page not found')      
    })
  })

