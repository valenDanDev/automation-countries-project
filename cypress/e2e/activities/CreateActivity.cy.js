describe('Activities creations', () => {
it('should create activity successfully', () => {

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


const goToDetail = () => {
  cy.contains('Create activities').click()
}

      cy.visit('/home')

    cy.wait('@getCountries')
    cy.wait('@getActivities')

    goToDetail()

  // mock countries (needed for select)
  cy.intercept('GET', '**/countries*', {
    statusCode: 200,
    body: [
      { id: 'BRA', name: 'Brazil', continent: 'South America' }
    ]
  }).as('getCountries')

  // mock POST
  cy.intercept('POST', '**/activities/create', {
    statusCode: 200,
    body: 'activity created successfully'
  }).as('createActivity')

  cy.visit('/activitiesCreate')

  cy.wait('@getCountries')

  // fill form
  cy.get('input[name="name"]').type('testing activity')
  cy.get('input[name="duration"]').type('5 minutes')
  cy.get('select[name="dificulty"]').select("4")

  cy.contains('label', 'Season')
  .parent()
  .find('select')
  .select('Autumn')

// select country
cy.contains('label', 'Countries')
  .parent()
  .find('select')
  .select('Brazil')
  .trigger('change')

// assert country is added (IMPORTANT)
cy.contains('BRA').should('be.visible')

cy.contains('label', 'Season')
  .parent()
  .find('select')
  .should('have.value', 'Autumn')

cy.get('input[name="name"]').should('have.value', 'testing activity')




  // submit
  cy.contains(/add activity/i).click()

  // wait for API
  cy.wait('@createActivity')

  // validate success UI
  cy.contains(/success/i).should('be.visible')
  cy.contains('activity created succesfully').should('be.visible')
})

it('should not allow create activity due to missing fields', () => {

  // mock countries (needed for select)
  cy.intercept('GET', '**/countries*', {
    statusCode: 200,
    body: [
      { id: 'BRA', name: 'Brazil', continent: 'South America' }
    ]
  }).as('getCountries')

  // mock POST
  cy.intercept('POST', '**/activities/create', {
    statusCode: 200,
    body: 'activity created successfully'
  }).as('createActivity')

  cy.visit('/activitiesCreate')

  cy.wait('@getCountries')

  // fill form
  cy.get('input[name="name"]').type('testing activity 2')
  cy.get('select[name="dificulty"]').select("4")

  cy.contains('label', 'Season')
  .parent()
  .find('select')
  .select('Autumn')

// select country
cy.contains('label', 'Countries')
  .parent()
  .find('select')
  .select('Brazil')
  .trigger('change')

// assert country is added (IMPORTANT)
cy.contains('BRA').should('be.visible')

cy.contains('label', 'Season')
  .parent()
  .find('select')
  .should('have.value', 'Autumn')

cy.get('input[name="name"]').should('have.value', 'testing activity 2')




  // submit
  cy.contains(/add activity/i).click()

  // assert NO request was made
cy.get('@createActivity.all').should('have.length', 0)

  // validate  UI
  cy.contains(/Ohhh!/i).should('be.visible')
  cy.contains('Please check and complete all the fields').should('be.visible')
})


it('should remove a country when selecting X', () => {

  // mock countries (needed for select)
  cy.intercept('GET', '**/countries*', {
    statusCode: 200,
    body: [
      { id: 'BRA', name: 'Brazil', continent: 'South America' }
    ]
  }).as('getCountries')

  // mock POST
  cy.intercept('POST', '**/activities/create', {
    statusCode: 200,
    body: 'activity created successfully'
  }).as('createActivity')

  cy.visit('/activitiesCreate')

  cy.wait('@getCountries')

  // fill form
  cy.get('input[name="name"]').type('testing activity 2')
  cy.get('select[name="dificulty"]').select("4")

  cy.contains('label', 'Season')
  .parent()
  .find('select')
  .select('Autumn')

// select country
cy.contains('label', 'Countries')
  .parent()
  .find('select')
  .select('Brazil')
  .trigger('change')

// assert country is added (IMPORTANT)
cy.contains('BRA').should('be.visible')

cy.contains('BRA')
  .parent()
  .find('input[value="X"]')
  .click()


  // assert country is removed (IMPORTANT)
cy.contains('BRA').should('not.exist')

})

})