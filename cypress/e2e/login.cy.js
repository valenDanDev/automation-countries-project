describe('Login Test', () => {

  it('should login successfully', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Login')
  })

})