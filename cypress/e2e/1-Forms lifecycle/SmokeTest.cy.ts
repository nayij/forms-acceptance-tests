/// <reference types="cypress" />
// @ts-check

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

