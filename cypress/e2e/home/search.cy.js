describe('Search Countries', () => {

  it('should search a country by name', () => {

    // Initial load
    cy.intercept('GET', '**/countries', {
      statusCode: 200,
      body: [
        { name: 'Brazil' }
      ]
    }).as('getCountries')

    // Correct search intercept
    cy.intercept('GET', '**/countries/country*', {
      statusCode: 200,
      body: [
        { name: 'Colombia' }
      ]
    }).as('searchCountry')

    cy.intercept('GET', '**/activities', {
      statusCode: 200,
      body: []
    }).as('getActivities')

    cy.visit('/home')

    cy.wait('@getCountries')
    cy.wait('@getActivities')

    cy.get('input[name="name"]').type('Colombia')
    cy.get('button[type="submit"]').click()

    cy.wait('@searchCountry')

    cy.contains('Colombia').should('be.visible')
    cy.contains('Brazil').should('not.exist')
  })

})