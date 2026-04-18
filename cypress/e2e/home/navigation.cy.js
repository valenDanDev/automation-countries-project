describe('Country Detail Navigation', () => {

  it('should go to country detail page', () => {

    cy.visit('/home')

    cy.contains('Colombia')
      .parent()
      .contains('MORE..')
      .click()

    cy.url().should('include', '/countries/')
  })

})