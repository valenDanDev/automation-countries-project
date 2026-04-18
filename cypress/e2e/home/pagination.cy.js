describe('Pagination', () => {

  it('should navigate to next page', () => {

    cy.visit('/home')

    cy.contains('2').click()

    cy.contains('PAGE 2').should('be.visible')
  })

})