describe('Country Detail Navigation', () => {

  it('should navigate and display correct country details', () => {

    cy.intercept('GET', '**/countries', {
      statusCode: 200,
      body: [
        { id: 'COL', name: 'Colombia', continent: 'South America' }
      ]
    }).as('getCountries')

    cy.intercept('GET', '**/activities', {
      statusCode: 200,
      body: []
    }).as('getActivities')

    // 👇 intercept detail endpoint (IMPORTANT)
    cy.intercept('GET', '**/countries/country/*', {
      statusCode: 200,
      body: [
        {
          id: 'COL',
          name: 'colombia',
          image: 'https://flagcdn.com/w320/co.png',
          continent: 'south america',
          capital: 'bogotá',
          subregion: 'americas',
          area: 1141748,
          population: 53057212,
          activities: []
        }
      ]
    }).as('getCountryDetail')

    cy.visit('/home')

    cy.wait('@getCountries')
    cy.wait('@getActivities')

    cy.contains('h3', 'Colombia')
      .parents('[class*="card_container"]')
      .within(() => {
        cy.contains(/more/i).click()
      })

    cy.url().should('include', '/countries/')

    // 👇 WAIT for detail API
    cy.wait('@getCountryDetail')

// wait for render
cy.contains('Loading').should('not.exist')

// validate UI
cy.contains('h3', /colombia/i).should('be.visible')
cy.contains(/code:\s*col/i).should('be.visible')
cy.contains(/capital:\s*bogotá/i).should('be.visible')
cy.contains(/population/i).should('be.visible')
  })

})