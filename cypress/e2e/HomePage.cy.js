describe('Home Page', () => {

  // 🔴 1. Validate proper error handling (no crash expected)
  it('should display error message when API fails', () => {
    cy.intercept('GET', '**/countries', {
      statusCode: 404
    }).as('getCountries')

    cy.visit('/home')

    cy.wait('@getCountries')

    cy.contains('Error fetching').should('be.visible')
  })


  // 🟢 2. Validate success scenario
it('should display countries when API succeeds', () => {

  // ✅ Mock countries
  cy.intercept('GET', '**/countries', {
    statusCode: 200,
  body: [
    {
      name: 'Colombia' // ✅ simple string
    }]
  }).as('getCountries')

  // ✅ Mock activities (THIS WAS MISSING)
  cy.intercept('GET', '**/activities', {
    statusCode: 200,
    body: []
  }).as('getActivities')

  cy.visit('/home')

  cy.wait('@getCountries')
  cy.wait('@getActivities')

  cy.contains('Colombia').should('be.visible')
})

})