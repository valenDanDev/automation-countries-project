export const mockCountries = (countries) => {
  cy.intercept('GET', '**/countries*', {
    statusCode: 200,
    body: countries
  }).as('getCountries')
}

export const mockCountriesError = (statusCode = 404) => {
  cy.intercept('GET', '**/countries', {
    statusCode
  }).as('getCountries')
}

export const mockCountriesNetworkError = () => {
  cy.intercept('GET', '**/countries', {
    forceNetworkError: true
  }).as('getCountries')
}

export const mockCountryDetail = (body) => {
  cy.intercept('GET', '**/countries/country/*', {
    statusCode: 200,
    body
  }).as('getCountryDetail')
}

export const mockCountriesList = (total) => {
  const countries = Array.from({ length: total }, (_, i) => ({
    id: `C${i}`,
    name: `Country ${i}`,
    continent: 'Test'
  }))

  cy.intercept('GET', '**/countries*', {
    statusCode: 200,
    body: countries
  }).as('getCountries')
}

export const mockSearchCountries = (result) => {
  cy.intercept('GET', '**/countries/country*', {
    statusCode: 200,
    body: result
  }).as('searchCountry')
}
