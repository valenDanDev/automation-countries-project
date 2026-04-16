describe('Landing Page', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should display landing page correctly', () => {
    cy.contains('Welcome to countries project').should('be.visible')
    cy.contains('ENTER').should('be.visible')
  })

  it('should navigate to home when clicking ENTER', () => {
    cy.contains('ENTER').click()
    cy.url().should('include', '/home')
  })

})