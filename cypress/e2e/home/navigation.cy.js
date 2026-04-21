describe('Country Detail Navigation', () => {

  // 🔹 helper to navigate
  const goToDetail = () => {
    cy.contains('h3', 'Colombia')
      .parents('[class*="card_container"]')
      .within(() => {
        cy.contains(/more/i).click()
      })
  }

  beforeEach(() => {

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

  })


  it('should navigate and display correct country details', () => {

    cy.intercept('GET', '**/countries/country/*', {
      statusCode: 200,
      body: [
        {
          id: 'COL',
          name: 'colombia',
          capital: 'bogotá',
          population: 53057212,
          activities: []
        }
      ]
    }).as('getCountryDetail')

    cy.visit('/home')

    cy.wait('@getCountries')
    cy.wait('@getActivities')

    goToDetail()

    cy.url().should('include', '/countries/country/COL')

    cy.wait('@getCountryDetail')

    cy.contains(/loading/i).should('not.exist')

    cy.contains('h3', /colombia/i).should('be.visible')
    cy.contains(/code:\s*col/i).should('be.visible')
    cy.contains(/capital:\s*bogotá/i).should('be.visible')
    cy.contains(/population/i).should('be.visible')
  })


  it('should show message when there are no activities', () => {

    cy.intercept('GET', '**/countries/country/*', {
      statusCode: 200,
      body: [
        {
          id: 'COL',
          name: 'colombia',
          activities: []
        }
      ]
    }).as('getCountryDetail')

    cy.visit('/home')

    cy.wait('@getCountries')
    cy.wait('@getActivities')

    goToDetail()

    cy.wait('@getCountryDetail')

    cy.contains(/there are no activities/i).should('be.visible')
  })


  it('should show activities when they exist', () => {

    cy.intercept('GET', '**/countries/country/*', {
      statusCode: 200,
      body: [
        {
          id: 'COL',
          name: 'colombia',
          activities: [
            { id: 1, name: 'Soccer' } ,{ id: 1, name: 'Music' }
          ]
        }
      ]
    }).as('getCountryDetail')

    cy.visit('/home')

    cy.wait('@getCountries')
    cy.wait('@getActivities')

    goToDetail()

    cy.wait('@getCountryDetail')

    cy.contains(/there are no activities/i).should('not.exist')
    cy.contains(/soccer/i).should('be.visible')
  })

})