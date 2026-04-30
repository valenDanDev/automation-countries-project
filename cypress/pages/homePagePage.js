class HomePagePage {

  visit() {
    cy.visit('/home')
    cy.wait('@getCountries')
    cy.wait('@getActivities')
  }

  selectContinent(continent) {
    cy.get('select').eq(1).select(continent)
  }

  sortByPopulation(option) {
    cy.get('select').eq(2).select(option)
  }

  sortByName(order) {
    cy.get('select').first().select(order)
  }

  countryNames() {
    return cy.get('h3')
  }

  shouldContainCountry(name) {
    cy.contains(name).should('be.visible')
  }

  shouldNotContainCountry(name) {
    cy.contains(name).should('not.exist')
  }

  countriesErrorMessage() {
  return cy.contains('404 COUNTRIES NOT FOUND')
}

networkErrorMessage() {
  return cy.contains('Error fetching countries')
}

shouldContainCountry(name) {
  cy.contains(name).should('be.visible')
}

shouldNotContainCountry(name) {
  cy.contains(name).should('not.exist')
}

goToCountryDetail(name) {
  cy.contains('h3', name)
    .parents('[class*="card_container"]')
    .within(() => {
      cy.contains(/more/i).click()
    })
}

getCountriesCards() {
  return cy.get('h3')
}

paginationLabel() {
  return cy.contains(/page\s*\d+\/\d+/i)
}

goToPage(page) {
  cy.get('[class*="Pagination_page_item"]')
    .contains(new RegExp(`^${page}$`))
    .click()
}

clickNext() {
  cy.get('[aria-label="Next"]').click()
}

clickPrevious() {
  cy.get('[aria-label="Previous"]').click()
}

searchInput() {
  return cy.get('input[name="name"]')
}

searchButton() {
  return cy.get('button[type="submit"]')
}

searchCountry(name) {
  this.searchInput().type(name)
  this.searchButton().click()
}

}

export default new HomePagePage()