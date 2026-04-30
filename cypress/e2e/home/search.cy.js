import homePage from '../../pages/homePagePage'

// mocks
import {
  mockCountries,
  mockSearchCountries
} from '../../support/mocks/countriesMocks'

import { mockActivitiesEmpty } from '../../support/mocks/activitiesMocks'

describe('Search Countries', () => {

  beforeEach(() => {
    mockActivitiesEmpty()
  })

  it('should search a country by name', () => {

    // initial load
    mockCountries([
      { name: 'Brazil' }
    ])

    // search result
    mockSearchCountries([
      { name: 'Colombia' }
    ])

    homePage.visit()

    homePage.searchCountry('Colombia')

    cy.wait('@searchCountry')

    homePage.shouldContainCountry('Colombia')
    homePage.shouldNotContainCountry('Brazil')
  })

})