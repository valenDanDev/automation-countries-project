describe('Home Page', () => {

  // 🔴 1. HTTP error (404)
it('should show countries error when there are no countries in the API', () => {

  cy.intercept('GET', '**/countries', {
    statusCode: 404
  }).as('getCountries')

  // keep other API stable
  cy.intercept('GET', '**/activities', {
    statusCode: 200,
    body: []
  }).as('getActivities')

  cy.visit('/home')

  cy.wait('@getCountries')
  cy.wait('@getActivities')

  cy.contains('404 COUNTRIES NOT FOUND').should('be.visible')
})


  // 🌐 2. Network failure
  it('should handle backend failure (network error)', () => {

    cy.intercept('GET', '**/countries', {
      forceNetworkError: true
    }).as('getCountries')

    cy.intercept('GET', '**/activities', {
      statusCode: 200,
      body: []
    }).as('getActivities')

    cy.visit('/home')

    cy.wait('@getCountries')
    cy.wait('@getActivities')

    cy.contains('Error fetching countries').should('be.visible')
    cy.contains('Colombia').should('not.exist')
  })


  // 🟢 3. Success
  it('should display countries when API succeeds', () => {

    cy.intercept('GET', '**/countries', {
      statusCode: 200,
      body: [
        { name: 'Colombia' }
      ]
    }).as('getCountries')

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