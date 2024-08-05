/// <reference types="cypress" />
// @ts-check
import "cypress-axe"


describe.skip('Happy Path journey', () => {
  before(() => {    
    cy.visit('http://localhost:8080/admin')
    cy.get('#username').type('forms-user')
    cy.get('#password').type('admin')
    cy.get('#kc-login').click()
  })

  it('Create Form', () => {   
    cy.visit('http://localhost:3000/library')    
    cy.origin('http://localhost:3000', () => {
      cy.contains('Create new form').click()
      let uuid = Math.random().toString(20).substring(2, 9)
      cy.get('#title').type('Cypress Demo ' + uuid)
      cy.contains('Continue').click()

      cy.get('[type="radio"]').check('Natural England')
      cy.contains('Continue').click()
      cy.get('#teamName').type('Team ' + uuid)
      cy.get('#teamEmail').type('test@test.uk')
      cy.contains('Save and contin').click()

      cy.get('h1').should('contain.text', uuid) 
      cy.get('dt[class="govuk-summary-list__key"]').should('contains.text', 'Status')
      cy.get('dd[class="govuk-summary-list__value"]').should('contains.text', 'Natural England')

      //preview the draft form
      cy.get('.govuk-link').invoke('removeAttr', 'target').click()
    })
    cy.origin('http://localhost:3009', () =>{
      cy.get('.govuk-header__content > a').should('contain.text', 'Cypress Demo')     
      cy 
    })


  })

  
})

describe.skip('Accessibilty of a form in runner', () => {

  it('Axe core -  accessiblity test',() => {
  cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/bob-123/page-one')
   cy.injectAxe() // Inject axe-core into the page
   // Run accessibility tests on the page
   cy.checkA11y(null, {
    includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
    })

  })

  it('Axe core -  accessiblity test after error',() => {
    cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/bob-123/page-one')
    cy.get('#submit').click()
    cy.injectAxe();
    cy.checkA11y(null, {
      includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
      })
    })

})

//setup - create  form
//tear down - delete the form
describe('Smoke Test', () =>  {
  it('Preview a draft form',() => {
    cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/jn-june-declaration')
    cy.get('.govuk-header__content').contains('JN JUne Declaration')
    cy.get('#LCSTBT').type('this is my great input')
    cy.get('#submit').click() 
    
    cy.get('.govuk-heading-l').contains('Summary')
    cy.contains('Accept and Send').click() 
    cy.get('.govuk-panel__title').contains('Application complete')
  })
  it('Check Links',() => {
    cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/jn-june-declaration')
    cy.contains('JN JUne Declaration').click()
    // cy.location('pathname').should('eq', '/jn-june-declaration')

  })
  
  it('Find all broken links', () => {
    cy.visit('https://forms-runner.dev.cdp-int.defra.cloud/preview/draft/jn-june-declaration')
    cy.get('a').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),          
          failOnStatusCode: false          
        })
        cy.log( link.prop('href'))

    })

  })
 
})





//create  form - DONE
//update a form * flavours
//preview draft form - DONE
//preview live form -DONE
//make for live
//Submit a live form * flavours
// Page not found page - DONE

