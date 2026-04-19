describe('Adding Filters', () => {

it('should filter countries by continent', () => {

  cy.intercept('GET', '**/countries', {
    statusCode: 200,
    body: [
      { name: 'colombia', continent: 'south america' },
      { name: 'brazil', continent: 'south america' },
      { name: 'germany', continent: 'europe' }
    ]
  }).as('getCountries')

  cy.intercept('GET', '**/activities', {
    statusCode: 200,
    body: []
  }).as('getActivities')

  cy.visit('/home')

  cy.wait('@getCountries')
  cy.wait('@getActivities')

  cy.get('select').eq(1).select('South America')

  cy.contains('colombia').should('be.visible')
  cy.contains('brazil').should('be.visible')
  cy.contains('germany').should('not.exist')
})


it('should sort countries by population (descending)', () => {

  cy.intercept('GET', '**/countries', {
    statusCode: 200,
    body: [
      { name: 'Colombia', population: 100, continent: 'south america' },
      { name: 'Brazil', population: 300, continent: 'south america' },
      { name: 'Argentina', population: 200, continent: 'south america' }
    ]
  }).as('getCountries')

  cy.intercept('GET', '**/activities', {
    statusCode: 200,
    body: []
  }).as('getActivities')

  cy.visit('/home')

  cy.wait('@getCountries')
  cy.wait('@getActivities')

  // ✅ FIX HERE
  cy.get('select').eq(2).select('higher population')

  cy.get('h3').then(elements => {
    const names = [...elements].map(el => el.innerText.trim())

    expect(names[0]).to.eq('Brazil')     // 300
    expect(names[1]).to.eq('Argentina')  // 200
    expect(names[2]).to.eq('Colombia')   // 100
  })
})


it('should sort countries by name (ascending)', () => {

  cy.intercept('GET', '**/countries', {
    statusCode: 200,
    body: [
      { name: 'Brazil', population: 100 },
      { name: 'Argentina', population: 200 },
      { name: 'Colombia', population: 300 }
    ]
  }).as('getCountries')

  cy.intercept('GET', '**/activities', {
    statusCode: 200,
    body: []
  }).as('getActivities')

  cy.visit('/home')

  cy.wait('@getCountries')
  cy.wait('@getActivities')

  cy.get('select').first().select('asc')

  cy.get('h3').then(elements => {
    const names = [...elements].map(el => el.innerText.trim())

    expect(names[0]).to.eq('Argentina')
    expect(names[1]).to.eq('Brazil')
    expect(names[2]).to.eq('Colombia')
  })
})

})